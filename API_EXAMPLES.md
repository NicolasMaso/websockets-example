# WebSocket API Usage Examples

## Client to Server Events

### 1. Send Message

```javascript
socket.emit("sendMessage", {
  message: "Hello, server!",
});
```

### 2. Send Ping

```javascript
socket.emit("ping", {
  message: "Client ping!",
});
```

## Server to Client Events

### 1. Message Received

```javascript
socket.on("messageReceived", (data) => {
  console.log(data.message); // "Server received: 'Hello, server!'"
  console.log(data.timestamp); // "2025-05-25T19:53:19.123Z"
});
```

### 2. Pong Response

```javascript
socket.on("pong", (data) => {
  console.log(data.message); // "Server pong!"
  console.log(data.timestamp); // "2025-05-25T19:53:19.123Z"
});
```

## Complete Browser Example

```javascript
// Connect to server
const socket = io("http://localhost:3001");

// Connection events
socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
});

// Listen for responses
socket.on("messageReceived", (data) => {
  console.log("Response:", data);
});

socket.on("pong", (data) => {
  console.log("Pong:", data);
});

// Send messages
socket.emit("sendMessage", { message: "Test message" });
socket.emit("ping", { message: "Test ping" });
```

## Testing via Browser Console

1. Open [http://localhost:3000](http://localhost:3000)
2. Open browser Console (F12)
3. Use the examples above to test directly
