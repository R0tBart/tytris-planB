🎮 Tytris – Ein responsives HTML Tetris-Game
📌 Projektbeschreibung
Tytris ist ein klassisches Tetris-Spiel, das in HTML, CSS und JavaScript entwickelt wurde und direkt im Browser spielbar ist. Ziel des Projekts ist es, ein responsives, funktionierendes und plattformübergreifendes Tetris zu erstellen, das sowohl auf Desktop- als auch auf mobilen Geräten gut spielbar ist. Die Entwicklung folgt einem agilen SCRUM-Prozess, um eine kontinuierliche Verbesserung des Spiels zu gewährleisten.

Technologien: HTML, CSS, JavaScript
SCRUM-Framework: Sprint-Planung, Daily Stand-ups, Reviews

📜 Product Backlog & User Stories
🏁 User Story 1: Grundlegendes Spiel
Beschreibung:
Als Spieler möchte ich ein funktionierendes HTML-basiertes Tetris-Game, um das klassische Spiel im Browser zu spielen.

Akzeptanzkriterien:

Das Spiel startet im Browser und zeigt ein Spielfeld an.

Die Steuerung (Pfeiltasten, Space zum schnellen Fallen) reagiert korrekt.

Punktestand und aktueller Level werden angezeigt.

Das Spiel endet bei Spielüber (Game Over).

📱 User Story 2: Responsives Design
Beschreibung:
Als Spieler möchte ich, dass das Spiel auf verschiedenen Bildschirmgrößen (Desktop, Tablet, Smartphone) gut aussieht und bedienbar ist.

Akzeptanzkriterien:

Das Layout passt sich dynamisch an unterschiedliche Bildschirmgrößen an.

Bedienelemente und Spielfeld bleiben auch auf kleineren Displays gut nutzbar.

🌐 User Story 3: Cross-Browser-Kompatibilität
Beschreibung:
Als Product Owner möchte ich, dass das Spiel in allen gängigen Browsern (Chrome, Firefox, Edge, Safari) fehlerfrei läuft.

Akzeptanzkriterien:

Das Spiel startet in den Zielbrowsern ohne sichtbare Fehler.

Alle Spielmechaniken funktionieren browserübergreifend identisch.

💻 User Story 4: Sauberer, wartbarer Code und Struktur
Beschreibung:
Als Entwickler möchte ich einen modularen und gut dokumentierten Code, um später einfach neue Features (z. B. Leaderboard, Sound-Effekte) hinzufügen zu können.

Akzeptanzkriterien:

Der Code ist in logische Module unterteilt (Spielmechanik, UI, Logik).

Kommentare und Dokumentation sind vorhanden.

Einheitliche Coding-Standards werden eingehalten.

🏆 User Story 5: Erweiterungsoption: Leaderboard
Beschreibung:
Als Spieler möchte ich meine Punktzahl mit anderen vergleichen können, um meinen Fortschritt zu messen.

Akzeptanzkriterien:

Nach Spielende wird der Punktestand angezeigt.

Es gibt eine einfache Möglichkeit, den Highscore lokal (oder später via Backend) zu speichern und anzuzeigen.

🚀 Features
✔️ Klassisches Tetris-Gameplay mit zufälligen Tetromino-Formen.

✔️ Steuerung über Pfeiltasten (Bewegung und Drehung) und Leertaste (schnelles Fallen).

✔️ Responsive Design – spielbar auf Desktop, Tablet und Smartphone.

✔️ Punktesystem und Levelmechanik, um die Schwierigkeit mit der Zeit zu steigern.

✔️ Cross-Browser-Kompatibilität für gängige Browser (Chrome, Firefox, Edge, Safari).

✔️ Erweiterungspotenzial für zukünftige Features wie ein Leaderboard und Sound-Effekte.

🎮 Steuerung
⬅️⬆️➡️⬇️ Pfeiltasten: Bewegung & Drehung der Tetrominos.

⏹️ Leertaste: Block sofort fallen lassen.

📂 Projektstruktur
bash
Kopieren
/tetris
│── index.html # Hauptdatei mit Spielfläche & Steuerung
│── script.js # Spiellogik (Tetrominos, Kollisionen, Steuerung)
│── README.md # Projektbeschreibung & Anleitung
📦 Installation & Lokales Testing
1️⃣ Lokale Ausführung
Klone das Repository:

bash
Kopieren
git clone https://github.com/R0tBart/tytris-planB
cd tytris-planB
Öffne index.html im Browser oder starte es über den Live Server in VS Code.

2️⃣ Mit Docker ausführen (optional, für spätere Nutzung)
Falls du das Spiel in einem Docker-Container ausführen möchtest (zukünftiges Deployment):

bash
Kopieren
docker build -t tetris-game .
docker run -p 8080:80 tetris-game
Öffne den Browser und gehe zu: http://localhost:8080

🤝 Mitwirken (SCRUM-Prozess für Contributors)
Dieses Projekt nutzt SCRUM als agiles Framework, um es kontinuierlich zu verbessern. Wenn du mitmachen möchtest:

Neues Feature oder Bug melden: Erstelle ein Issue.

Forke das Repository und entwickle in einem Feature-Branch:
https://github.com/R0tBart/tytris-planB

Pull-Request (PR) stellen & am Code-Review teilnehmen.

📜 Lizenz
🔓 Dieses Projekt steht unter der MIT-Lizenz – du kannst es gerne nutzen, verbessern und teilen!

✨ Viel Spaß beim Spielen & Entwickeln! 🚀👾
