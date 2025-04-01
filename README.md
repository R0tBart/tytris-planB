
# 🎮 Tytris – Ein SCRUM-basiertes Webprojekt

## 📌 Projektbeschreibung  
Dieses **Tytris-Spiel** wurde mit **HTML, CSS und JavaScript** entwickelt und folgt den Prinzipien von **SCRUM** als agilem Entwicklungsprozess. Ziel war es, ein **klassisches Tytris-Spiel** als Webanwendung zu programmieren, die in einem modernen Browser spielbar ist.

- **Technologien:** HTML, CSS, JavaScript  
- **Deployment:** Docker & GitHub Pages  
- **SCRUM-Framework:** Sprint-Planung, Daily Stand-ups, Reviews  

---

## 📜 SCRUM-Prozess & Sprints  

Die Entwicklung erfolgte in **agilen Sprints**, um eine iterative Verbesserung des Spiels zu ermöglichen.  

| Sprint | Feature | Status |
|--------|---------|--------|
| 🎯 Sprint 1 | Spiellogik (Blöcke, Bewegung, Kollision) | ✅ Abgeschlossen |
| 🎨 Sprint 2 | UI-Design, CSS-Animationen | 🔄 In Arbeit |
| 🎵 Sprint 3 | Soundeffekte & Punkte-System | 🔄 In Arbeit |
| 🚀 Sprint 4 | Highscore-Speicherung & Docker-Deployment | ⏳ Geplant |

---

## 🚀 Features  
✔️ **Klassisches Tetris-Gameplay** mit zufälligen Tetromino-Formen  
✔️ **Steuerung über Tastatur** (Pfeiltasten für Bewegung & Rotation)  
✔️ **CSS-Animationen** für sanfte Blockbewegungen  
✔️ **Punktesystem & Level-Mechanik** für steigende Schwierigkeit  
✔️ **Responsive Design** – spielbar auf Desktop & Mobile  
✔️ **Docker-Container für einfaches Hosting**  

---

## 🎮 Steuerung  
- **⬅️⬆️➡️⬇️ Pfeiltasten:** Bewegung & Drehung  
- **⏹️ Leertaste:** Block sofort fallen lassen  

---
# NOCH IN ARBEIT!!!

## 📂 Projektstruktur  

````plaintext
/tetris
│── index.html       # Hauptdatei mit Spielfläche & Steuerung
│── style.css        # Styling & Animationen
│── script.js        # Spiellogik (Tetrominos, Kollisionen, Steuerung)
│── assets/          # Bilder & Sounds für das Spiel
│── README.md        # Projektbeschreibung & Anleitung
│── Dockerfile       # Containerisierung für einfaches Deployment
````

---

## 📦 Installation & Lokales Testing  

### 1️⃣ Lokale Ausführung  

```bash
git clone https://github.com/R0tBart/tytris-planB
cd tytris-scrum
open index.html   Oder über Live Server in VS Code starten
````

### 2️⃣ Mit Docker ausführen  
Falls du das Spiel in einem **Docker-Container** ausführen möchtest:

````bash
docker build -t tetris-game .
docker run -p 8080:80 tetris-game

Dann im Browser öffnen: \`http://localhost:8080\`
````

## 🤝 Mitwirken (SCRUM-Prozess für Contributors)  
📌 Dieses Projekt nutzt **SCRUM als agiles Framework**, um es **kontinuierlich zu verbessern**. Wenn du mitmachen möchtest:  

1. **Neues Feature oder Bug melden:** Erstelle ein **Issue**  
2. **Forke das Repository & entwickle in einem Feature-Branch**  https://github.com/R0tBart/tytris-planB
3. **Pull-Request (PR) stellen & am Code-Review teilnehmen**  

---

## 📜 Lizenz  
🔓 Dieses Projekt steht unter der **MIT-Lizenz** – du kannst es gerne nutzen, verbessern und teilen!  

---

✨ **Viel Spaß beim Spielen & Entwickeln!** 🚀👾

