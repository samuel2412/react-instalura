import React from 'react';
import Header from './componentes/Header'
import FotoItem from './componentes/FotoItem';

function App() {
  return (
    <div id="root">
      <div className="main">

        <Header />

        <div className="fotos container">
          <FotoItem />

        </div>
      </div>
    </div>
  );
}

export default App;
