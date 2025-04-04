"use client"

import { useState, useEffect, useCallback } from "react"
import { useInterval } from "@/hooks/use-interval"
import { useWindowSize } from "@/hooks/use-window-size"
import GameBoard from "./game-board"
import GameStats from "./game-stats"
import GameControls from "./game-controls"
import { createEmptyBoard, checkCollision, getRandomPiece, TETROMINOS } from "@/lib/tetris-utils"
import type { Board, Position } from "@/types/tetris-types"

export default function TetrisGame() {
  const { width, height } = useWindowSize()
  const isSmallScreen = width < 640
  const isMediumScreen = width >= 640 && width < 1024
  const isLargeScreen = width >= 1024

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)
  const [level, setLevel] = useState<number>(0)
  const [dropTime, setDropTime] = useState<number | null>(null)
  const [board, setBoard] = useState<Board>(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState<string | null>(null)
  const [nextPiece, setNextPiece] = useState<string | null>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number>(0)

  // Berechne die optimale Spielfeldgröße basierend auf der Bildschirmgröße
  const calculateBoardSize = useCallback(() => {
    if (isSmallScreen) {
      // Für kleine Bildschirme (Mobilgeräte)
      const boardWidth = Math.min(width * 0.9, 300)
      const boardHeight = boardWidth * 2
      return { width: boardWidth, height: boardHeight }
    } else if (isMediumScreen) {
      // Für mittlere Bildschirme (Tablets)
      const boardHeight = Math.min(height * 0.7, 600)
      const boardWidth = boardHeight / 2
      return { width: boardWidth, height: boardHeight }
    } else {
      // Für große Bildschirme (Desktop)
      const boardHeight = Math.min(height * 0.8, 700)
      const boardWidth = boardHeight / 2
      return { width: boardWidth, height: boardHeight }
    }
  }, [height, isMediumScreen, isSmallScreen, width])

  const boardSize = calculateBoardSize()

  // Initialize game
  const startGame = useCallback(() => {
    // Reset everything
    setBoard(createEmptyBoard())
    setScore(0)
    setRows(0)
    setLevel(0)
    setDropTime(1000)
    setGameOver(false)
    setGameStarted(true)

    // Set initial pieces
    const newPiece = getRandomPiece()
    setCurrentPiece(newPiece)
    setNextPiece(getRandomPiece())

    // Set initial position
    setPosition({
      x: Math.floor((10 - TETROMINOS[newPiece].shape[0].length) / 2),
      y: 0,
    })
    setRotation(0)
  }, [])

  // Move piece horizontally
  const movePiece = useCallback(
    (dir: number) => {
      if (!gameOver && gameStarted && currentPiece) {
        if (!checkCollision(board, currentPiece, position.x + dir, position.y, rotation)) {
          setPosition((prev) => ({ ...prev, x: prev.x + dir }))
        }
      }
    },
    [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation],
  )

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!gameOver && gameStarted && currentPiece) {
      const newRotation = (rotation + 1) % 4
      if (!checkCollision(board, currentPiece, position.x, position.y, newRotation)) {
        setRotation(newRotation)
      }
    }
  }, [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation])

  // Drop piece one row
  const dropPiece = useCallback(() => {
    if (!gameOver && gameStarted && currentPiece) {
      if (!checkCollision(board, currentPiece, position.x, position.y + 1, rotation)) {
        setPosition((prev) => ({ ...prev, y: prev.y + 1 }))
      } else {
        // Piece has landed
        updateBoard()
      }
    }
  }, [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation])

  // Drop piece all the way down
  const dropPieceToBottom = useCallback(() => {
    if (!gameOver && gameStarted && currentPiece) {
      let newY = position.y
      while (!checkCollision(board, currentPiece, position.x, newY + 1, rotation)) {
        newY += 1
      }
      setPosition((prev) => ({ ...prev, y: newY }))
      updateBoard()
    }
  }, [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation])

  // Update the board when a piece lands
  const updateBoard = useCallback(() => {
    if (!currentPiece || !nextPiece) return

    // Create a new board with the current piece merged in
    const newBoard = [...board]
    const shape = TETROMINOS[currentPiece].shape[rotation]
    const color = TETROMINOS[currentPiece].color

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardY = y + position.y
          const boardX = x + position.x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = { color, merged: true }
          }
        }
      }
    }

    // Check for completed rows
    let clearedRows = 0
    for (let y = 0; y < 20; y++) {
      if (newBoard[y].every((cell) => cell !== null)) {
        // Remove the row and add an empty row at the top
        newBoard.splice(y, 1)
        newBoard.unshift(Array(10).fill(null))
        clearedRows += 1
        y -= 1 // Check the same row again
      }
    }

    // Update score and level
    if (clearedRows > 0) {
      const points = [0, 40, 100, 300, 1200][clearedRows] * (level + 1)
      setScore((prev) => prev + points)
      setRows((prev) => {
        const newRows = prev + clearedRows
        // Level up every 10 rows
        if (Math.floor(newRows / 10) > Math.floor(prev / 10)) {
          setLevel((prev) => prev + 1)
          // Speed up drop time
          setDropTime(1000 * Math.pow(0.8, Math.floor(newRows / 10)))
        }
        return newRows
      })
    }

    // Set the new board
    setBoard(newBoard)

    // Get next piece
    setCurrentPiece(nextPiece)
    const newNextPiece = getRandomPiece()
    setNextPiece(newNextPiece)

    // Reset position and rotation
    const newPieceWidth = TETROMINOS[nextPiece].shape[0].length
    setPosition({
      x: Math.floor((10 - newPieceWidth) / 2),
      y: 0,
    })
    setRotation(0)

    // Check for game over
    if (checkCollision(newBoard, nextPiece, Math.floor((10 - newPieceWidth) / 2), 0, 0)) {
      setGameOver(true)
      setDropTime(null)
    }
  }, [board, currentPiece, level, nextPiece, position.x, position.y, rotation])

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && e.keyCode === 32) {
        // Space
        startGame()
        return
      }

      if (gameOver) return

      switch (e.keyCode) {
        case 37: // Left arrow
          movePiece(-1)
          break
        case 39: // Right arrow
          movePiece(1)
          break
        case 40: // Down arrow
          dropPiece()
          break
        case 38: // Up arrow
          rotatePiece()
          break
        case 32: // Space
          dropPieceToBottom()
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [dropPiece, dropPieceToBottom, gameOver, gameStarted, movePiece, rotatePiece, startGame])

  // Auto drop piece
  useInterval(() => {
    dropPiece()
  }, dropTime)

  return (
    <div
      className={`
      flex 
      ${isSmallScreen ? "flex-col" : isLargeScreen ? "flex-row" : "flex-col md:flex-row"} 
      gap-6 items-center justify-center
      max-w-full
    `}
    >
      <GameBoard
        board={board}
        currentPiece={currentPiece}
        position={position}
        rotation={rotation}
        width={boardSize.width}
        height={boardSize.height}
      />
      <div
        className={`
        flex 
        ${isSmallScreen ? "flex-row" : isLargeScreen ? "flex-col" : "flex-row md:flex-col"} 
        gap-4 flex-wrap justify-center
      `}
      >
        <GameStats score={score} rows={rows} level={level} nextPiece={nextPiece} isSmallScreen={isSmallScreen} />
        <GameControls
          gameStarted={gameStarted}
          gameOver={gameOver}
          onStart={startGame}
          onMove={movePiece}
          onRotate={rotatePiece}
          onDrop={dropPiece}
          onDropToBottom={dropPieceToBottom}
          isSmallScreen={isSmallScreen}
        />
      </div>
    </div>
  )
}

