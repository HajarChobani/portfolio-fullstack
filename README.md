# Portfolio Full Stack - Hajar Chobani

## Description

Application Full Stack developpee avec React, Node.js, Express, Socket.IO et WebRTC.

Le projet contient :

- Un portfolio moderne responsive
- Un systeme de live chat en temps reel
- Un panneau admin pour gerer les conversations
- Un systeme d’appel video avec WebRTC
- Une architecture Docker client/server

---

# Technologies utilisees

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO
- UUID

## Temps reel & Communication

- WebSocket
- WebRTC
- Live Chat
- Video Call

## DevOps

- Docker
- Docker Compose

---

# Fonctionnalites

## Portfolio

- Hero section
- About section
- Skills section
- Projects section
- Contact form
- Responsive design
- Dark mode

## Live Chat

- Communication temps reel
- Gestion des rooms
- Interface admin
- Historique des messages
- Notifications visiteurs

## Video Room

- Camera et microphone
- Appel video WebRTC
- Activation/desactivation audio/video
- Rooms dynamiques

---

# Structure du projet

```bash
portfolio_chat-main/
│
├── client/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── server/
│   ├── server.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

```
---

# Installation et lancement

## Installation

```bash
cd client
npm install

cd ../server
npm install
```

## Lancer avec Docker

```bash
docker-compose up --build
```

## URLs

Frontend :
http://localhost:5173

Backend :
http://localhost:3002