"use client"

import TetrisGame from "@/components/tetris-game"
import { useEffect, useState } from "react"

export default function Home() {
  // Verwende einen State, um zu prüfen, ob wir auf dem Client sind
  const [isMounted, setIsMounted] = useState(false)

  // Setze isMounted auf true, wenn die Komponente auf dem Client gemountet wird
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Zeige einen Ladeindikator, bis die Komponente auf dem Client gemountet ist
  if (!isMounted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-8">Modern Tetris</h1>
        <div className="w-[300px] h-[600px] bg-slate-950 border-2 border-slate-700 rounded-md flex items-center justify-center">
          <p className="text-white">Lädt...</p>
        </div>
      </main>
    )
  }

  // Rendere das Spiel, wenn wir auf dem Client sind
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-8">Modern Tetris</h1>
      <TetrisGame />
    </main>
  )
}

