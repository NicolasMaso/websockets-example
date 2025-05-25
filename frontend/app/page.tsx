"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    newSocket.on("messageReceived", (data) => {
      setMessages((prev) => [
        ...prev,
        `📨 ${data.message} (${new Date(data.timestamp).toLocaleTimeString()})`,
      ]);
    });

    newSocket.on("pong", (data) => {
      setMessages((prev) => [
        ...prev,
        `🏓 ${data.message} (${new Date(data.timestamp).toLocaleTimeString()})`,
      ]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("sendMessage", { message });
      setMessages((prev) => [...prev, `➡️ You: ${message}`]);
      setMessage("");
    }
  };

  const sendPing = () => {
    if (socket) {
      socket.emit("ping", { message: "Client ping!" });
      setMessages((prev) => [...prev, `🏓 Ping sent`]);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-6 border border-slate-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6 text-center">
            WebSocket Demo
          </h1>

          <div className="mb-6 p-4 rounded-lg bg-slate-700 border border-slate-600">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected
                    ? "bg-green-400 shadow-lg shadow-green-400/50 animate-pulse"
                    : "bg-red-400 shadow-lg shadow-red-400/50"
                }`}
              ></div>
              <span className="font-medium text-slate-200">
                Status: {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
            <h2 className="text-lg font-semibold mb-3 text-slate-200">
              Send Message
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                disabled={!isConnected}
              />
              <button
                onClick={sendMessage}
                disabled={!isConnected || !message.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </div>

          <div className="mb-6 flex gap-3">
            <button
              onClick={sendPing}
              disabled={!isConnected}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200"
            >
              🏓 Send Ping
            </button>
            <button
              onClick={clearMessages}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              🗑️ Clear
            </button>
          </div>

          <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3 text-slate-200">
              Messages
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              {messages.length === 0 ? (
                <p className="text-slate-400 italic">No messages yet...</p>
              ) : (
                messages.map((msg, index) => {
                  let borderColor = "border-slate-500";
                  let bgColor = "bg-slate-600";

                  if (msg.includes("📨")) {
                    borderColor = "border-blue-400";
                    bgColor = "bg-blue-900/30";
                  } else if (msg.includes("🏓")) {
                    borderColor = "border-green-400";
                    bgColor = "bg-green-900/30";
                  } else if (msg.includes("➡️")) {
                    borderColor = "border-purple-400";
                    bgColor = "bg-purple-900/30";
                  }

                  return (
                    <div
                      key={index}
                      className={`p-3 ${bgColor} rounded border ${borderColor} text-sm text-slate-100 hover:bg-slate-500/50 transition-all duration-150`}
                    >
                      {msg}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
