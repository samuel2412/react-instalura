import React from 'react';
import Header from './componentes/Header'
import TimeLine from './componentes/TimeLine';


function App(props) {
  
  
  //<TimeLine login={props.match.params.login}/>
  return (
    <div id="root">
      <div className="main">
        <Header />
        <TimeLine login={props.match}/>
      </div>
    </div>
  );
}

export default App;
