import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircle, InfoCircle, WarningTriangle, XmarkCircle, Refresh } from "iconoir-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircle width={16} height={16} strokeWidth={2} className="size-4" />
        ),
        info: (
          <InfoCircle width={16} height={16} strokeWidth={2} className="size-4" />
        ),
        warning: (
          <WarningTriangle width={16} height={16} strokeWidth={2} className="size-4" />
        ),
        error: (
          <XmarkCircle width={16} height={16} strokeWidth={2} className="size-4" />
        ),
        loading: (
          <Refresh width={16} height={16} strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
