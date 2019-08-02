import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import fetch from 'node-fetch';

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5000;

const API_URL = `http://${DB_HOST}:${DB_PORT}`;

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.info('received: %s', message);

    try {
      const msg = JSON.parse(message);

      switch(msg.type) {
        case 'DETAILS':
          fetch(`${API_URL}/items`)
            .then(response => response.json())
            .then(data => {
              console.log('DATA', data);
              ws.send(JSON.stringify({
                type: 'DATA',
                data: data.items,
              }));
            });
          break;
      }
    } catch (err) {
      console.error(err);
      ws.send(JSON.stringify({
        type: 'ERROR',
        message: 'PARSE_FAILED',
      }))
    }
  });

  ws.send(JSON.stringify({
    type: 'CONNECT',
    message: 'CONNECTED',
  }));
});

server.listen(process.env.PORT || 3500, () => {
  console.log(`Server started on port 3500`);
});
