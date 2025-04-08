"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { soundManager } from "@/lib/sound-manager"

export default function SoundControl() {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Initialisiere den Sound Manager
    soundManager.initialize()

    // Setze den initialen Zustand
    setIsMuted(soundManager.isMutedState())
  }, [])

  const toggleMute = () => {
    const newMutedState = soundManager.toggleMute()
    setIsMuted(newMutedState)
  }

  return (
    <button
      onClick={toggleMute}
      className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
      aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
    >
      {isMuted ? <VolumeX size={20} className="text-slate-400" /> : <Volume2 size={20} className="text-white" />}
    </button>
  )
}
