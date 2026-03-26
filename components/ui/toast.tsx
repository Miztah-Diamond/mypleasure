"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#1E1218",
          color: "#FAF6F2",
          border: "1px solid #3D2232",
        },
      }}
    />
  )
}
