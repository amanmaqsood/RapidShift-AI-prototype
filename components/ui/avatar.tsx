import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export function Avatar({
  name,
  color = "#47664a",
  size = 36,
  className,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold text-white shrink-0",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: Math.floor(size * 0.38),
      }}
    >
      {initials(name)}
    </div>
  );
}
