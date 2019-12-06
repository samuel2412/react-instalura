import React from 'react';
import Header from './componentes/Header'
import TimeLine from './componentes/TimeLine';
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './reducers/timeline';

const store = createStore(timeline,applyMiddleware(thunkMiddleware));
function App(props) {
  
  
  //<TimeLine login={props.match.params.login}/>
  return (
    <div id="root">
      <div className="main">
        <Header />
        <TimeLine login={props.match}  store={store} />
      </div>
    </div>
  );
}

export default App;
