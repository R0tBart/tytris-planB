"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface GameOverOverlayProps {
  score: number
  level: number
  rows: number
  onRestart: () => void
}

export default function GameOverOverlay({ score, level, rows, onRestart }: GameOverOverlayProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Kurze Verzögerung, um die Animation zu starten
    const timer = setTimeout(() => {
      setVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-slate-900 border-2 border-red-500 rounded-lg p-6 max-w-md w-full text-center shadow-lg"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <motion.h2
              className="text-3xl font-bold text-red-500 mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              GAME OVER
            </motion.h2>

            <motion.div
              className="space-y-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl font-bold text-white">Endstand</p>
              <div className="grid grid-cols-2 gap-2 text-left">
                <p className="text-slate-400">Punkte:</p>
                <p className="text-emerald-500 font-bold text-right">{score}</p>
                <p className="text-slate-400">Level:</p>
                <p className="text-purple-500 font-bold text-right">{level}</p>
                <p className="text-slate-400">Reihen:</p>
                <p className="text-blue-500 font-bold text-right">{rows}</p>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <Button
                onClick={onRestart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              >
                Wenn du möchtest, kannst du hier ein Neues Spiel starten! 💀
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

