import React, { useState, useEffect } from 'react';

import { useWebsocket } from './socket';
import ShoppingList from './ShoppingList';

function App() {
  const [isConnected, setConnected] = useState(false);
  const ws = useWebsocket();

  useEffect(() => {
    console.log('READY', ws.readyState);
    ws.onopen = () => {
      setConnected(true);
    };
    if (ws.readyState === 1) {
      // Already connected before mount
      setConnected(true);
    }
  }, [ws]);

  return (
    <div className="App">
      {isConnected ? <ShoppingList /> : <div>Connecting...</div>}
    </div>
  );
}

export default App;
