import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-white hover:bg-gold/90 shadow-sm",
        destructive: "bg-error text-white hover:bg-error/90",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-white",
        secondary: "bg-plum text-white hover:bg-plum/90",
        ghost: "hover:bg-beige/50 text-chocolate",
        link: "text-gold underline-offset-4 hover:underline",
        wine: "bg-wine text-white hover:bg-wine/90",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-xl",
        sm: "h-9 px-4 rounded-lg text-xs",
        lg: "h-12 px-8 rounded-2xl text-base",
        xl: "h-14 px-10 rounded-full text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
