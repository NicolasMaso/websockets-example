#!/bin/bash

echo "🚀 Starting WebSocket Demo..."
echo ""

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo "🎯 Backend running at: http://localhost:3001"
echo "🌐 Frontend running at: http://localhost:3000"
echo ""
echo "To stop services, press Ctrl+C"
echo ""

cd backend
npm run start:dev &
BACKEND_PID=$!

sleep 3

cd ../frontend
npm run dev &
FRONTEND_PID=$!

cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT

# Wait
wait
