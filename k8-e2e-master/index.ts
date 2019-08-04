import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log('message: %s', message);

    // Relay the message to "other" clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  let numClients = 0;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      numClients += 1;
    }
  });

  console.info('connected :: %s', numClients);

  ws.send(JSON.stringify({
    type: 'CONNECT',
    message: 'CONNECTED',
  }));
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`e2e master started on port 4000`);
});
