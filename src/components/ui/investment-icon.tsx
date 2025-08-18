"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InvestmentIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const InvestmentIcon = React.forwardRef<SVGSVGElement, InvestmentIconProps>(
  ({ className, size = 32, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("inline-block", className)}
        {...props}
      >
        <rect width="32" height="32" rx="6" fill="#2563eb"/>
        <rect x="4" y="4" width="24" height="24" rx="3" fill="#ffffff"/>
        <rect x="6" y="6" width="20" height="6" rx="1" fill="#1e40af"/>
        <circle cx="9" cy="17" r="1.5" fill="#2563eb"/>
        <circle cx="16" cy="17" r="1.5" fill="#2563eb"/>
        <circle cx="23" cy="17" r="1.5" fill="#2563eb"/>
        <circle cx="9" cy="22" r="1.5" fill="#2563eb"/>
        <circle cx="16" cy="22" r="1.5" fill="#2563eb"/>
        <rect x="21" y="20" width="4" height="4" rx="1" fill="#10b981"/>
      </svg>
    )
  }
)
InvestmentIcon.displayName = "InvestmentIcon"

export { InvestmentIcon }