// Sound Manager für Tetris

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private musicElement: HTMLAudioElement | null = null
  private isMuted = false
  private musicVolume = 0.2
  private sfxVolume = 0.4
  private isInitialized = false

  // Initialisiere alle Sounds
  public initialize(): void {
    if (typeof window === "undefined" || this.isInitialized) {
      return
    }

    this.isInitialized = true

    // Soundeffekte laden
    this.sounds = {
      move: new Audio("/sounds/move.mp3"),
      rotate: new Audio("/sounds/rotate.mp3"),
      drop: new Audio("/sounds/drop.mp3"),
      clearLine: new Audio("/sounds/clear-line.mp3"),
      clearTetris: new Audio("/sounds/clear-tetris.mp3"), // 4 Linien auf einmal
      levelUp: new Audio("/sounds/level-up.mp3"),
      gameOver: new Audio("/sounds/game-over.mp3"),
      start: new Audio("/sounds/start.mp3"),
    }

    // Hintergrundmusik laden
    this.musicElement = new Audio("/sounds/theme.mp3")
    if (this.musicElement) {
      this.musicElement.loop = true
      this.musicElement.volume = this.musicVolume
    }

    // Lautstärke für alle Soundeffekte setzen
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.sfxVolume
    })

    // Aus dem lokalen Speicher laden, falls vorhanden
    const savedMute = localStorage.getItem("tetris-muted")
    if (savedMute) {
      this.isMuted = savedMute === "true"
    }
  }

  // Spiele einen Soundeffekt ab
  public play(soundName: string): void {
    if (!this.isInitialized || this.isMuted || typeof window === "undefined") {
      return
    }

    const sound = this.sounds[soundName]
    if (sound) {
      // Sound zurücksetzen und abspielen
      sound.currentTime = 0
      sound.play().catch((e) => console.log("Sound play error:", e))
    }
  }

  // Starte die Hintergrundmusik
  public startMusic(): void {
    if (!this.isInitialized || this.isMuted || typeof window === "undefined" || !this.musicElement) {
      return
    }

    this.musicElement.currentTime = 0
    this.musicElement.play().catch((e) => console.log("Music play error:", e))
  }

  // Pausiere die Hintergrundmusik
  public pauseMusic(): void {
    if (!this.isInitialized || typeof window === "undefined" || !this.musicElement) {
      return
    }

    this.musicElement.pause()
  }

  // Setze die Musik fort
  public resumeMusic(): void {
    if (!this.isInitialized || this.isMuted || typeof window === "undefined" || !this.musicElement) {
      return
    }

    this.musicElement.play().catch((e) => console.log("Music resume error:", e))
  }

  // Ton ein-/ausschalten
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted

    if (typeof window !== "undefined") {
      localStorage.setItem("tetris-muted", this.isMuted.toString())

      if (this.isMuted) {
        this.pauseMusic()
      } else if (this.musicElement) {
        this.resumeMusic()
      }
    }

    return this.isMuted
  }

  // Prüfen, ob der Ton stummgeschaltet ist
  public isMutedState(): boolean {
    return this.isMuted
  }

  // Lautstärke der Musik ändern
  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume))
    if (this.musicElement) {
      this.musicElement.volume = this.musicVolume
    }
  }

  // Lautstärke der Soundeffekte ändern
  public setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.sfxVolume
    })
  }
}

// Singleton-Instanz
export const soundManager = new SoundManager()
