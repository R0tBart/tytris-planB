"use client"

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private themeSound: HTMLAudioElement | null = null
  private muted = false

  constructor() {
    if (typeof window !== "undefined") {
      this.sounds = {
        move: new Audio("/sounds/move.mp3"),
        rotate: new Audio("/sounds/rotate.mp3"),
        drop: new Audio("/sounds/drop.mp3"),
        clear: new Audio("/sounds/clear.mp3"),
        gameover: new Audio("/sounds/gameover.mp3"),
      }

      this.themeSound = new Audio("/sounds/theme.mp3")
      if (this.themeSound) {
        this.themeSound.loop = true
        this.themeSound.volume = 0.5
      }

      // Setze die Lautstärke für alle Sounds
      Object.values(this.sounds).forEach((sound) => {
        sound.volume = 0.3
      })
    }
  }

  playSound(name: string): void {
    if (this.muted || typeof window === "undefined") {
      return
    }

    const sound = this.sounds[name]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch((e) => console.log("Sound play error:", e))
    }
  }

  playTheme(): void {
    if (this.muted || typeof window === "undefined" || !this.themeSound) {
        return
    }
    this.themeSound.currentTime = 0
    this.themeSound.play().catch((e) => console.log("Theme play error:", e))
  }

  stopTheme(): void {
    if (typeof window === "undefined" || !this.themeSound) {
        return
    }
    this.themeSound.pause()
    this.themeSound.currentTime = 0
  }

  toggleMute(): boolean {
    this.muted = !this.muted

    if (this.muted) {
      this.stopTheme()
    } else if (this.themeSound) {
      this.playTheme()
    }

    return this.muted
  }

  isMuted(): boolean {
    return this.muted
  }
}

// Singleton-Instanz
export const soundManager = typeof window !== "undefined" ? new SoundManager() : null

