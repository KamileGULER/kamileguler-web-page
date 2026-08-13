import type { AnchorHTMLAttributes, CSSProperties, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  variant?: "primary" | "secondary";
  trailingArrow?: boolean;
};

export function MagneticButton({
  label,
  variant = "primary",
  trailingArrow = true,
  className = "",
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: MagneticButtonProps) {
  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--mx", `${x}px`);
    event.currentTarget.style.setProperty("--my", `${y}px`);
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--mx", "50%");
    event.currentTarget.style.setProperty("--my", "50%");
    onMouseLeave?.(event);
  };

  const variantClass =
    variant === "primary"
      ? "border-cyan/30 bg-cyan/10 text-ink hover:border-cyan/60"
      : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-ink";

  return (
    <a
      {...props}
      className={`magnetic-button group inline-flex items-center gap-3 rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.34em] transition duration-300 ${variantClass} ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          ...style,
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span>{label}</span>
      {trailingArrow ? (
        <ArrowUpRight size={14} className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      ) : null}
    </a>
  );
}
