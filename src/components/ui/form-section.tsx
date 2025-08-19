"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  variant?: 'default' | 'card' | 'bordered'
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ 
    className, 
    title, 
    description, 
    icon, 
    variant = 'default',
    collapsible = false,
    defaultCollapsed = false,
    children, 
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    const toggleCollapse = () => {
      if (collapsible) {
        setIsCollapsed(!isCollapsed)
      }
    }

    const headerContent = (title || description) && (
      <div 
        className={cn(
          "flex items-center gap-2 pb-2",
          collapsible && "cursor-pointer hover:opacity-80",
          variant === 'default' && "border-b"
        )}
        onClick={toggleCollapse}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <div className="flex-1">
          {title && (
            <h3 className={cn(
              "font-semibold",
              variant === 'card' ? "text-lg" : "text-base"
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn(
              "text-muted-foreground",
              variant === 'card' ? "text-sm" : "text-xs",
              title && "mt-1"
            )}>
              {description}
            </p>
          )}
        </div>
        {collapsible && (
          <div className={cn(
            "transform transition-transform duration-200",
            isCollapsed ? "rotate-180" : "rotate-0"
          )}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    )

    const contentSection = (
      <div 
        className={cn(
          "transition-all duration-200 ease-in-out",
          isCollapsed ? "max-h-0 overflow-hidden opacity-0" : "max-h-none opacity-100",
          (title || description) && !isCollapsed && "pt-4"
        )}
      >
        {children}
      </div>
    )

    if (variant === 'card') {
      return (
        <Card ref={ref} className={cn(className)} {...props}>
          {(title || description) && (
            <CardHeader className="pb-2">
              <div className={cn(
                "flex items-center gap-2",
                collapsible && "cursor-pointer hover:opacity-80"
              )} onClick={toggleCollapse}>
                {icon && <span className="text-muted-foreground">{icon}</span>}
                <div className="flex-1">
                  {title && <CardTitle className="text-lg">{title}</CardTitle>}
                  {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {collapsible && (
                  <div className={cn(
                    "transform transition-transform duration-200",
                    isCollapsed ? "rotate-180" : "rotate-0"
                  )}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-muted-foreground"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </CardHeader>
          )}
          <CardContent className={cn(
            "transition-all duration-200 ease-in-out",
            isCollapsed ? "max-h-0 overflow-hidden opacity-0 py-0" : "max-h-none opacity-100"
          )}>
            {children}
          </CardContent>
        </Card>
      )
    }

    if (variant === 'bordered') {
      return (
        <div 
          ref={ref} 
          className={cn(
            "border rounded-lg p-4 space-y-4",
            className
          )} 
          {...props}
        >
          {headerContent}
          {contentSection}
        </div>
      )
    }

    // Default variant
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {headerContent}
        {contentSection}
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

export { FormSection }