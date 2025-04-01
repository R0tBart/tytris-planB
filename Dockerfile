# Basis-Image: Python 3.9-slim
FROM python:3.9-slim

# Setze den Arbeitsordner im Container
WORKDIR /usr/src/app

# Verhindere interaktive Abfragen während der Installation
ENV DEBIAN_FRONTEND=noninteractive

# Setze nötige Umgebungsvariablen
ENV USER=root
ENV DISPLAY=:99

# Installiere notwendige Pakete, SDL2-Bibliotheken, Xvfb, VNC, noVNC und weitere Tools
RUN apt-get update && apt-get install -y \
    xvfb \
    fluxbox \
    tightvncserver \
    novnc \
    websockify \
    build-essential \
    libsdl2-dev \
    libsdl2-image-dev \
    libsdl2-mixer-dev \
    libsdl2-ttf-dev \
    libsmpeg-dev \
    libportmidi-dev \
    libfreetype6-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Kopiere requirements.txt und installiere Python-Abhängigkeiten (z. B. pygame)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiere den gesamten Projektcode in den Container
COPY . .

# Konfiguriere den VNC-Server: Setze ein Passwort (hier "password", du kannst es ändern)
RUN mkdir -p /root/.vnc && \
    echo "password" | vncpasswd -f > /root/.vnc/passwd && \
    chmod 600 /root/.vnc/passwd

# Exponiere den Port für noVNC (6080)
EXPOSE 6080

# Starte Xvfb, den VNC-Server, den Fenstermanager, noVNC und anschließend das Spiel
CMD Xvfb :99 -screen 0 1280x1024x24 & \
    tightvncserver :1 -geometry 1280x1024 -depth 24 && \
    sleep 2 && \
    fluxbox & \
    sleep 2 && \
    websockify --web /usr/share/novnc/ 6080 localhost:5901 & \
    sleep 2 && \
    python tytris_game.py
