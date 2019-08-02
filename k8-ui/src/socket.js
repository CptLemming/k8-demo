import React, { createContext, useContext } from 'react';

const WebsocketContext = createContext();

export const WebsocketProvider = ({ ws, children }) =>(
  <WebsocketContext.Provider value={ws}>
    {children}
  </WebsocketContext.Provider>
);

export const useWebsocket = () => useContext(WebsocketContext);
