#!/usr/bin/env python3
import os
import shutil

BASE = "/tmp/mnemosyne-docs/docs-site"
APP = f"{BASE}/src/app/docs"
CONTENT = f"{BASE}/content"

# Clean existing generated pages (except page.tsx)
for item in os.listdir(APP):
    path = os.path.join(APP, item)
    if os.path.isdir(path):
        shutil.rmtree(path)

# Walk content directory and generate page.mdx files
for root, dirs, files in os.walk(CONTENT):
    for file in files:
        if not file.endswith(".mdx"):
            continue
        
        rel_path = os.path.relpath(os.path.join(root, file), CONTENT)
        slug_path = rel_path.replace(".mdx", "")
        segments = slug_path.split(os.sep)
        
        # Create directory structure in app/docs/
        target_dir = os.path.join(APP, *segments)
        os.makedirs(target_dir, exist_ok=True)
        
        # Copy MDX file
        src_mdx = os.path.join(CONTENT, rel_path)
        dst_mdx = os.path.join(target_dir, "page.mdx")
        shutil.copy2(src_mdx, dst_mdx)
        
        print(f"Generated: docs/{'/'.join(segments)}")

print("\nDone! All MDX pages generated.")
