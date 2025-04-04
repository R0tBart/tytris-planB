"use client"

import { useState, useEffect, useCallback } from "react"
import { useInterval } from "@/hooks/use-interval"
import { useWindowSize } from "@/hooks/use-window-size"
import GameBoard from "./game-board"
import GameStats from "./game-stats"
import GameControls from "./game-controls"
import GameOverOverlay from "./game-over-overlay"
import { createEmptyBoard, checkCollision, getRandomPiece, TETROMINOS } from "@/lib/tetris-utils"
import { soundManager } from "@/lib/sound-manager"
import type { Board, Position } from "@/types/tetris-types"
import { Volume2, VolumeX } from "lucide-react"

export default function TetrisGame() {
  // Verwende einen State, um zu prüfen, ob wir auf dem Client sind
  const [isMounted, setIsMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

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

  // Setze isMounted auf true, wenn die Komponente auf dem Client gemountet wird
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Berechne die optimale Spielfeldgröße basierend auf der Bildschirmgröße
  const calculateBoardSize = useCallback(() => {
    if (!isMounted) {
      // Standardwerte für Server-Rendering
      return { width: 300, height: 600 }
    }

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
  }, [height, isMediumScreen, isSmallScreen, width, isMounted])

  const boardSize = calculateBoardSize()

  // Sound-Steuerung
  const toggleMute = useCallback(() => {
    if (soundManager) {
      const muted = soundManager.toggleMute()
      setIsMuted(muted)
    }
  }, [])

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

    // Spiele Thema-Musik
    if (soundManager && !isMuted) {
      soundManager.playTheme()
    }
  }, [isMuted])

  // Move piece horizontally
  const movePiece = useCallback(
    (dir: number) => {
      if (!gameOver && gameStarted && currentPiece) {
        if (!checkCollision(board, currentPiece, position.x + dir, position.y, rotation)) {
          setPosition((prev) => ({ ...prev, x: prev.x + dir }))
          // Spiele Bewegungssound
          if (soundManager && !isMuted) {
            soundManager.playSound("move")
          }
        }
      }
    },
    [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation, isMuted],
  )

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!gameOver && gameStarted && currentPiece) {
      const newRotation = (rotation + 1) % 4
      if (!checkCollision(board, currentPiece, position.x, position.y, newRotation)) {
        setRotation(newRotation)
        // Spiele Rotationssound
        if (soundManager && !isMuted) {
          soundManager.playSound("rotate")
        }
      }
    }
  }, [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation, isMuted])

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
      // Spiele Drop-Sound
      if (soundManager && !isMuted) {
        soundManager.playSound("drop")
      }
      updateBoard()
    }
  }, [board, currentPiece, gameOver, gameStarted, position.x, position.y, rotation, isMuted])

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

      // Spiele Clear-Sound
      if (soundManager && !isMuted) {
        soundManager.playSound("clear")
      }
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

      // Stoppe Thema-Musik und spiele Game-Over-Sound
      if (soundManager) {
        soundManager.stopTheme()
        if (!isMuted) {
          soundManager.playSound("gameover")
        }
      }
    }
  }, [board, currentPiece, level, nextPiece, position.x, position.y, rotation, isMuted])

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
        case 77: // M key for mute
          toggleMute()
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [dropPiece, dropPieceToBottom, gameOver, gameStarted, movePiece, rotatePiece, startGame, toggleMute])

  // Auto drop piece
  useInterval(() => {
    dropPiece()
  }, dropTime)

  // Cleanup beim Unmount
  useEffect(() => {
    return () => {
      if (soundManager) {
        soundManager.stopTheme()
      }
    }
  }, [])

  // Verwende ein konsistentes Layout für Server- und Client-Rendering
  const layoutClassName = isMounted
    ? `flex ${isSmallScreen ? "flex-col" : isLargeScreen ? "flex-row" : "flex-col md:flex-row"} gap-6 items-center justify-center max-w-full`
    : "flex flex-row gap-6 items-center justify-center max-w-full"

  const statsContainerClassName = isMounted
    ? `flex ${isSmallScreen ? "flex-row" : isLargeScreen ? "flex-col" : "flex-row md:flex-col"} gap-4 flex-wrap justify-center`
    : "flex flex-col gap-4 flex-wrap justify-center"

  return (
    <div className="relative">
      {/* Sound-Steuerung */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 z-10 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
        aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className={layoutClassName}>
        <div className="relative">
          <GameBoard
            board={board}
            currentPiece={currentPiece}
            position={position}
            rotation={rotation}
            width={boardSize.width}
            height={boardSize.height}
          />
          {gameOver && <GameOverOverlay score={score} level={level} rows={rows} onRestart={startGame} />}
        </div>
        <div className={statsContainerClassName}>
          <GameStats score={score} rows={rows} level={level} nextPiece={nextPiece} isSmallScreen={isSmallScreen} />
          <GameControls
            gameStarted={gameStarted}
            gameOver={gameOver}
            onStart={startGame}
            onMove={movePiece}
            onRotate={rotatePiece}
            onDrop={dropPiece}
            onDropToBottom={dropPieceToBottom}
            onToggleMute={toggleMute}
            isMuted={isMuted}
            isSmallScreen={isSmallScreen}
          />
        </div>
      </div>
    </div>
  )
}

