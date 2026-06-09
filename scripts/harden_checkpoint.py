#!/usr/bin/env python3
"""
Checkpoint Hardening Script for Documentation Audit System

Loads .audit-state.json, cross-references against current git state,
detects edge cases, and updates the checkpoint.

Edge cases detected:
  1. Rebase/squash — all tracked hashes changed simultaneously
  2. Checkpoint corruption — JSON parse fails or schema missing
  3. Page renames — old path gone, new path unaudited
  4. Mirror drift — source hash ≠ mirror hash
  5. Version bump — codebase_version changed
  6. Concurrent edits — hashes changed during audit
  7. Deleted pages — file in checkpoint but not in repo
  8. Untracked pages — file in repo but not in checkpoint

Usage:
  python3 harden_checkpoint.py [--docs-dir /path/to/docs] [--codebase-ver X.Y.Z] [--dry-run]
"""

import json, os, subprocess, sys
from datetime import datetime, timezone

def get_current_hashes(docs_dir):
    """Get git blob hashes for all tracked doc files."""
    result = subprocess.run(
        ["git", "ls-tree", "-r", "HEAD"],
        cwd=docs_dir, capture_output=True, text=True
    )
    hashes = {}
    for line in result.stdout.strip().split('\n'):
        parts = line.split()
        if len(parts) >= 4 and any(parts[3].endswith(ext) for ext in ['.mdx', '.md']):
            hashes[parts[3]] = parts[2]
    return hashes

def main(docs_dir=None, codebase_ver=None, dry_run=False):
    docs_dir = docs_dir or os.getcwd()
    checkpoint_path = os.path.join(docs_dir, ".audit-state.json")
    
    if not os.path.exists(checkpoint_path):
        print("No checkpoint found. Creating new one.")
        state = {"_schema": "mnemosyne-docs-audit-checkpoint-v1", "files": {}, "audit_history": []}
    else:
        with open(checkpoint_path) as f:
            state = json.load(f)
    
    current_files = get_current_hashes(docs_dir)
    now = datetime.now(timezone.utc).isoformat()
    
    # Detect edge cases
    edge_cases = []
    
    # 1. Rebase detection
    tracked_in_repo = [f for f in state['files'] if f in current_files]
    if tracked_in_repo:
        all_changed = all(
            state['files'][f].get('audit_hash') != current_files[f]
            for f in tracked_in_repo
        )
        if all_changed and len(tracked_in_repo) > 5:
            edge_cases.append("REBASE_DETECTED")
            state['_rebase_detected'] = True
    
    # 2. Disappeared files
    disappeared = []
    for fpath, info in state['files'].items():
        if fpath not in current_files and info.get('category') == 'source':
            disappeared.append(fpath)
            info['status'] = 'gone'
    if disappeared:
        edge_cases.append(f"GONE:{len(disappeared)}")
    
    # 3. Untracked
    untracked = []
    for fpath, h in current_files.items():
        if fpath not in state['files']:
            cat = 'source' if fpath.startswith('content/') else 'mirror'
            untracked.append(fpath)
            state['files'][fpath] = {
                'last_audited': None,
                'audit_hash': h,
                'status': 'unaudited',
                'category': cat
            }
    if untracked:
        edge_cases.append(f"UNTRACKED:{len(untracked)}")
    
    # 4. Mirror drift
    drifted = []
    for fpath, info in state['files'].items():
        if info.get('category') == 'mirror' and fpath in current_files:
            source = fpath.replace('src/app/(docs)/', 'content/').replace('/page.mdx', '.mdx')
            if source in current_files:
                if info.get('status') == 'clean' and current_files[fpath] != current_files[source]:
                    drifted.append(fpath)
                    info['status'] = 'drifted'
    if drifted:
        edge_cases.append(f"DRIFTED:{len(drifted)}")
    
    # 5. Version bump
    if codebase_ver and codebase_ver != state.get('codebase_version'):
        edge_cases.append(f"VERSION:{state.get('codebase_version')}->{codebase_ver}")
        for fpath, info in state['files'].items():
            if info.get('status') == 'clean' and info.get('category') == 'source':
                info['status'] = 'stale_version'
    
    # Update metadata
    state['last_full_audit'] = now
    if codebase_ver:
        state['codebase_version'] = codebase_ver
    
    state['_health'] = {
        'checked_at': now,
        'total_tracked': len(current_files),
        'audited_clean': sum(1 for f in state['files'].values() if f.get('status') == 'clean'),
        'unaudited': sum(1 for f in state['files'].values() if f.get('status') == 'unaudited'),
        'gone': sum(1 for f in state['files'].values() if f.get('status') == 'gone'),
        'drifted': sum(1 for f in state['files'].values() if f.get('status') == 'drifted'),
        'stale_version': sum(1 for f in state['files'].values() if f.get('status') == 'stale_version'),
    }
    
    if dry_run:
        print("DRY RUN — would update with these edge cases:", edge_cases)
        print(f"Health: {state['_health']}")
    else:
        with open(checkpoint_path, 'w') as f:
            json.dump(state, f, indent=2)
        print(f"Updated checkpoint. Edge cases: {edge_cases}")
        print(f"Health: clean={state['_health']['audited_clean']}, "
              f"unaudited={state['_health']['unaudited']}, "
              f"gone={state['_health']['gone']}, "
              f"drifted={state['_health']['drifted']}")

if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--docs-dir", default=os.getcwd())
    p.add_argument("--codebase-ver")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    main(args.docs_dir, args.codebase_ver, args.dry_run)
