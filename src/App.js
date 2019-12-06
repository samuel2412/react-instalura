import React from 'react';
import Header from './componentes/Header'
import TimeLine from './componentes/TimeLine';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './reducers/timeline';
import {notificacao} from './reducers/notificacao'

const reducers = combineReducers({timeline,notificacao});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));
function App(props) {
  
  
  //<TimeLine login={props.match.params.login}/>
  return (
    <div id="root">
      <div className="main">
        <Header store={store} />
        <TimeLine login={props.match}  store={store} />
      </div>
    </div>
  );
}

export default App;
