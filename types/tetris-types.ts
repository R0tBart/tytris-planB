export interface Cell {
  color: string
  merged: boolean
}

export type Board = (Cell | null)[][]

export interface Position {
  x: number
  y: number
}

export interface TetrominoData {
  shape: number[][][]
  color: string
}

export interface Tetrominos {
  [key: string]: TetrominoData
}

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
  onToggleMute?: () => void
  isMuted?: boolean
  isSmallScreen?: boolean
}

