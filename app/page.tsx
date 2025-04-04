import TetrisGame from "@/components/tetris-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-8">Modern Tetris</h1>
      <TetrisGame />
    </main>
  )
}

