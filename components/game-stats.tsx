import { TETROMINOS } from "@/lib/tetris-utils"
import type { GameStatsProps } from "@/types/tetris-types"

export default function GameStats({ score, rows, level, nextPiece, isSmallScreen = false }: GameStatsProps) {
  // Render the next piece preview
  const renderNextPiece = () => {
    if (!nextPiece) return null

    const shape = TETROMINOS[nextPiece].shape[0]
    const color = TETROMINOS[nextPiece].color

    // Calculate dimensions for centering
    const width = shape[0].length
    const height = shape.length

    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-900 border border-slate-700 rounded-md">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: `${width * (isSmallScreen ? 16 : 20)}px`,
              height: `${height * (isSmallScreen ? 16 : 20)}px`,
            }}
          >
            {shape.map((row, y) =>
              row.map((cell, x) =>
                cell !== 0 ? (
                  <div
                    key={`next-${y}-${x}`}
                    className="absolute rounded-sm border border-white/20"
                    style={{
                      backgroundColor: color,
                      width: isSmallScreen ? "16px" : "20px",
                      height: isSmallScreen ? "16px" : "20px",
                      left: `${x * (isSmallScreen ? 16 : 20)}px`,
                      top: `${y * (isSmallScreen ? 16 : 20)}px`,
                    }}
                  />
                ) : null,
              ),
            )}
          </div>
        </div>
      </div>
    )
  }

  // Verwende konsistente Klassennamen für Server- und Client-Rendering
  const containerClassName = `bg-slate-900 p-3 sm:p-4 rounded-md border border-slate-700 shadow-md ${isSmallScreen ? "w-[140px] sm:w-[160px]" : "w-full max-w-[200px]"}`
  const contentClassName = isSmallScreen ? "space-y-2" : "space-y-4"

  return (
    <div className={containerClassName}>
      <div className={contentClassName}>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-400">Next Piece</h3>
          <div className="mt-1 sm:mt-2 flex justify-center">{renderNextPiece()}</div>
        </div>

        <div className="pt-1 sm:pt-2 border-t border-slate-800">
          <h3 className="text-xs sm:text-sm font-medium text-slate-400">Score</h3>
          <p className="text-xl sm:text-2xl font-bold text-emerald-500">{score.toString().padStart(5, "0")}</p>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-400">Rows</h3>
          <p className="text-lg sm:text-xl font-bold text-blue-500">{rows}</p>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-400">Level</h3>
          <p className="text-lg sm:text-xl font-bold text-purple-500">{level}</p>
        </div>
      </div>
    </div>
  )
}

