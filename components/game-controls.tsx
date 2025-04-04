"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCw, MoveVertical } from "lucide-react"
import type { GameControlsProps } from "@/types/tetris-types"

export default function GameControls({
  gameStarted,
  gameOver,
  onStart,
  onMove,
  onRotate,
  onDrop,
  onDropToBottom,
  isSmallScreen = false,
}: GameControlsProps) {
  // Touch-Steuerung für Desktop-Touchscreens und Tablets
  const renderTouchControls = () => (
    <div className="grid grid-cols-3 gap-2 text-xs text-center">
      <button className="flex flex-col items-center touch-manipulation" onClick={() => onMove && onMove(-1)}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center">
          <ArrowLeft size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-slate-400 text-[10px] sm:text-xs">Links</span>
      </button>

      <button className="flex flex-col items-center touch-manipulation" onClick={() => onMove && onMove(1)}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center">
          <ArrowRight size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-slate-400 text-[10px] sm:text-xs">Rechts</span>
      </button>

      <button className="flex flex-col items-center touch-manipulation" onClick={() => onDrop && onDrop()}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center">
          <ArrowDown size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-slate-400 text-[10px] sm:text-xs">Runter</span>
      </button>

      <button className="flex flex-col items-center touch-manipulation" onClick={() => onRotate && onRotate()}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center">
          <RotateCw size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-slate-400 text-[10px] sm:text-xs">Drehen</span>
      </button>

      <button
        className="flex flex-col items-center touch-manipulation"
        onClick={() => onDropToBottom && onDropToBottom()}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center">
          <MoveVertical size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-slate-400 text-[10px] sm:text-xs">Fallen</span>
      </button>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-slate-800 flex items-center justify-center opacity-0">
          <ArrowUp size={isSmallScreen ? 16 : 18} />
        </div>
        <span className="mt-1 text-transparent text-[10px] sm:text-xs">Drehen</span>
      </div>
    </div>
  )

  return (
    <div
      className={`
      bg-slate-900 p-3 sm:p-4 rounded-md border border-slate-700 shadow-md
      ${isSmallScreen ? "w-[140px] sm:w-[160px]" : "w-full max-w-[200px]"}
    `}
    >
      {!gameStarted || gameOver ? (
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{gameOver ? "Game Over" : "Tetris"}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-4">
            {gameOver ? "Versuche es erneut!" : "Drücke Leertaste oder klicke unten"}
          </p>
          <Button
            onClick={onStart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm py-1 sm:py-2"
          >
            {gameOver ? "Neu starten" : "Spiel starten"}
          </Button>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-xs sm:text-sm font-medium text-slate-400">Steuerung</h3>
          {renderTouchControls()}
        </div>
      )}
    </div>
  )
}

