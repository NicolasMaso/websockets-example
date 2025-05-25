# WebSocket Demo - Next.js + NestJS

This project demonstrates real-time communication between a Next.js frontend and a NestJS backend using WebSockets.

## Project Structure

- **backend/**: NestJS server with WebSocket Gateway (Port 3001)
- **frontend/**: Next.js application with interface for sending messages (Port 3000)

## 🚀 Quick Start

### Option 1: Automated Script

```bash
./start.sh
```

### Option 2: Manual

**1. Install Dependencies:**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**2. Run Services:**

Terminal 1 - Backend:

```bash
cd backend
npm run start:dev
```

Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

### 3. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- ✅ Real-time WebSocket connection
- ✅ Custom message sending
- ✅ Ping/Pong system
- ✅ Visual connection status
- ✅ Message history
- ✅ Modern interface with Tailwind CSS

## WebSocket Events

### Frontend → Backend

- `sendMessage`: Sends a message to the server
- `ping`: Sends a ping to test the connection

### Backend → Frontend

- `messageReceived`: Server response with the received message
- `pong`: Response to client ping

## Technologies Used

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Socket.io-client
- **Backend**: NestJS, TypeScript, Socket.io, WebSockets

## Main File Structure

```
backend/
├── src/
│   ├── chat.gateway.ts  # WebSocket Gateway
│   ├── app.module.ts        # Main module
│   └── main.ts              # Application bootstrap
frontend/
├── app/
│   └── page.tsx             # Main page with WebSocket interface
```
