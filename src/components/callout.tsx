import { ReactNode } from "react";
import { Info, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "danger" | "success";
  title?: string;
  children: ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  success: CheckCircle,
};

const titles = {
  info: "Info",
  warning: "Warning",
  danger: "Important",
  success: "Tip",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];
  return (
    <div className={`callout callout-${type}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className="shrink-0 mt-0.5" />
        <div>
          {title !== undefined && (
            <strong className="block mb-1">{title || titles[type]}</strong>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
