"use client"

import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  type?: "error" | "warning" | "info"
  title?: string
  message: string
  className?: string
  showIcon?: boolean
}

export function ErrorMessage({
  type = "error",
  title,
  message,
  className,
  showIcon = true,
}: ErrorMessageProps) {
  const IconComponent = {
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[type]

  const styles = {
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  }[type]

  return (
    <div
      className={cn(
        "flex gap-3 rounded-md border p-4",
        styles,
        className
      )}
      role="alert"
    >
      {showIcon && (
        <IconComponent className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      )}
      <div>
        {title && (
          <h3 className="text-sm font-medium mb-1">{title}</h3>
        )}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}