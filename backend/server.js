import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  host: "127.0.0.1",
  port: 8080
});

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log("New connection: ", ip)
  ws.on('message', data => {
    console.log(`${ip}: ${data}`);
  });
})