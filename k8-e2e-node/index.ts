import * as WebSocket from 'ws';

const WS_HOST = process.env.WS_HOST || 'localhost';
const WS_PORT = process.env.WS_PORT || 4000;
const WS_URI = `ws://${WS_HOST}:${WS_PORT}`;

const ws = new WebSocket(WS_URI);

ws.on('open', () => {
  console.log('Connected');

  ws.send('CONNECTED');
});

ws.on('message', (data) => {
  console.log("Incoming", data);
});
