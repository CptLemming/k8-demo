import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WebsocketProvider } from './socket';
import * as serviceWorker from './serviceWorker';

const HOST = process.env.REACT_APP_HOST || window.location.hostname;
const PORT = process.env.REACT_APP_PORT || 3500;

const ws = new WebSocket(`ws://${HOST}:${PORT}`);

ReactDOM.render(
    <WebsocketProvider ws={ws}>
        <App />
    </WebsocketProvider>
    ,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
