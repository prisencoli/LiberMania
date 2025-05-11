import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary-500 transition-all"
          style={{ width: `${Math.min(Math.max(value, 0), max) / max * 100}%` }}
        />
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress }
