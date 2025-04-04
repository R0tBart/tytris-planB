import { TETROMINOS } from "@/lib/tetris-utils"
import type { GameBoardProps } from "@/types/tetris-types"

export default function GameBoard({
  board,
  currentPiece,
  position,
  rotation,
  width = 300,
  height = 600,
}: GameBoardProps) {
  // Render the current piece on top of the board
  const renderCurrentPiece = () => {
    if (!currentPiece) return null

    const shape = TETROMINOS[currentPiece].shape[rotation]
    const color = TETROMINOS[currentPiece].color

    return shape.map((row, y) =>
      row.map((cell, x) => {
        if (cell !== 0) {
          const boardX = x + position.x
          const boardY = y + position.y

          // Only render if within board boundaries and cell is visible (y >= 0)
          if (boardX >= 0 && boardX < 10 && boardY >= 0 && boardY < 20) {
            return (
              <div
                key={`current-${boardY}-${boardX}`}
                className="absolute rounded-sm border border-white/20"
                style={{
                  backgroundColor: color,
                  width: "calc(100% / 10)",
                  height: "calc(100% / 20)",
                  left: `${boardX * 10}%`,
                  top: `${boardY * 5}%`,
                }}
              />
            )
          }
          return null
        }
        return null
      }),
    )
  }

  // Stelle sicher, dass die Stile als Objekt und nicht als String übergeben werden
  const boardStyle = {
    width: `${width}px`,
    height: `${height}px`,
    maxWidth: "100%",
    maxHeight: "80vh",
  }

  return (
    <div
      className="relative bg-slate-950 border-2 border-slate-700 rounded-md overflow-hidden shadow-lg"
      style={boardStyle}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-20 opacity-10">
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={`grid-${i}`} className="border border-white/10" />
        ))}
      </div>

      {/* Merged blocks */}
      {board.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <div
              key={`${y}-${x}`}
              className="absolute rounded-sm border border-white/20"
              style={{
                backgroundColor: cell.color,
                width: "calc(100% / 10)",
                height: "calc(100% / 20)",
                left: `${x * 10}%`,
                top: `${y * 5}%`,
              }}
            />
          ) : null,
        ),
      )}

      {/* Current piece */}
      {renderCurrentPiece()}
    </div>
  )
}

