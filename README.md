# 🎮 Modern Tetris Game

> Eine moderne Interpretation des klassischen Tetris, umgesetzt mit **React**, **Next.js**, **Tailwind CSS** und **TypeScript** – mit Fokus auf modularer Struktur und Benutzerfreundlichkeit. Ziel des Projekts ist es, ein responsives, funktionierendes und plattformübergreifendes Tetris zu erstellen, das sowohl auf Desktop- als auch auf mobilen Geräten gut spielbar ist. Die Entwicklung folgt einem agilen SCRUM-Prozess, um eine kontinuierliche Verbesserung des Spiels zu gewährleisten.

---

## 🚀 Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/R0tBart/tytris-planB
cd modern-tetris
```

### 2. Abhängigkeiten installieren

```bash
pnpm install
# oder
npm install
```

### 3. Dev-Server starten

```bash
pnpm dev
# oder
npm run dev
```

---

## 🧩 Features

- 🎨 Modernes UI mit Tailwind CSS
- ⚛️ React & Next.js Architektur
- 🧱 Dynamische Spiellogik (Tetris)
- ⌨️ Intuitive Steuerung mit Tastatur
- 🎞️ Game Over Animation (Framer Motion)
- 🐳 Docker-Setup für einfaches Deployment

---

## ⚙️ Technologien

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📁 Projektstruktur

```bash
├── app/                  # Next.js App Router
├── components/           # UI-Komponenten (GameBoard, Overlay, etc.)
├── hooks/                # Eigene React-Hooks
├── lib/                  # Spiellogik, z. B. Tetris-Engine
├── public/               # Assets
├── styles/               # Tailwind Styles & Konfiguration
├── types/                # TypeScript Typdefinitionen
├── Dockerfile            # Container-Definition
├── compose.yaml          # Docker-Compose Setup
└── ...
```

---

## ⌨️ Steuerung

| Taste           | Aktion                  |
|----------------|--------------------------|
| ⬅️ / ➡️        | Block nach links/rechts  |
| ⬇️              | Block fallen lassen      |
| ⬆️              | Block rotieren           |
| Space           | Block sofort platzieren  |
| R               | Spiel zurücksetzen       |

---

## 🐳 Docker

### App bauen und starten:

```bash
docker compose up --build
```

> Siehe `README.Docker.md` für detaillierte Docker-Anweisungen



📜 Lizenz
🔓 Dieses Projekt steht unter der MIT-Lizenz – du kannst es gerne nutzen, verbessern und teilen!

✨ Viel Spaß beim Spielen & Entwickeln! 🚀👾
