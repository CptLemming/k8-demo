import React, { useState, useEffect } from 'react';

import { useWebsocket } from './socket';

function ShoppingList() {
  const [details, setDetails] = useState([]);
  const ws = useWebsocket();

  useEffect(() => {
    ws.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      
      switch (msg.type) {
        case 'DATA':
          setDetails(msg.data);
          break;
        default:
          // Do nothing
      }
    };

    ws.send(JSON.stringify({ type: 'DETAILS' }));
  }, [ws]);

  return (
    <div className="ShoppingList">
      <h1>Shopping list</h1>
      {details.length === 0 && <p>No details to show</p>}
      {details.map(detail => (
        <div key={detail.id}>
          <p>{detail.label}</p>
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;
