"use client"

import { useState, useEffect } from "react"

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  // Standardwerte für Server-Rendering
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1024, // Standardwert für Desktop
    height: 768,
  })

  // useEffect wird nur auf dem Client ausgeführt
  useEffect(() => {
    // Handler zum Aktualisieren der Fenstergröße
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Fenstergröße initial setzen
    handleResize()

    // Event-Listener hinzufügen
    window.addEventListener("resize", handleResize)

    // Event-Listener beim Cleanup entfernen
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

