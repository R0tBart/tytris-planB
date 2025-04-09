// Typen für das Tetris-Spiel
export interface BoardCell {
  color: string
  merged: boolean
}

export type Board = (BoardCell | null)[][]

export interface Position {
  x: number
  y: number
}

export interface TetrominoShape {
  shape: number[][][]
  color: string
}

export interface Tetrominos {
  [key: string]: TetrominoShape
}

// Props für die Komponenten
export interface GameBoardProps {
  board: Board
  currentPiece: string | null
  position: Position
  rotation: number
  width?: number
  height?: number
}

export interface GameStatsProps {
  score: number
  rows: number
  level: number
  nextPiece: string | null
  isSmallScreen?: boolean
}

export interface GameControlsProps {
  gameStarted: boolean
  gameOver: boolean
  onStart: () => void
  onMove?: (dir: number) => void
  onRotate?: () => void
  onDrop?: () => void
  onDropToBottom?: () => void
  isSmallScreen?: boolean
  score?: number
}

// Sound-Manager Typen
export interface SoundEffect {
  name: string
  path: string
}
