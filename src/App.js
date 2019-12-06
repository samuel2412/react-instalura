import React from 'react';
import Header from './componentes/Header'
import TimeLine from './componentes/TimeLine';
import LogicaTimeLine from './logicas/LogicaTimeLine';


const logicaTimeLine = new LogicaTimeLine([]);
function App(props) {
  
  
  //<TimeLine login={props.match.params.login}/>
  return (
    <div id="root">
      <div className="main">
        <Header />
        <TimeLine login={props.match}  store={logicaTimeLine} />
      </div>
    </div>
  );
}

export default App;
