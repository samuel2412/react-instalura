import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login'
import Logout from './componentes/Logout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './css/timeline.css';
import './css/reset.css';
import './css/login.css'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/notificacao'
import { Provider } from 'react-redux';



const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


function verificaAutenticacao(next, replace) {
    if (localStorage.getItem('auth-token') != null) {

        return true;
    }
}


ReactDOM.render(
    (

        <Provider store={store}>
            <BrowserRouter>
                <Switch>

                    <Route exact path="/" component={Login} />
                    <Route exact path="/timeline" render={() => (
                        verificaAutenticacao() ? (
                            <App />

                        ) : (
                                <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!" />
                            )
                    )} />
                    <Route path="/timeline/:login" component={App} />
                    <Route path="/logout" component={Logout} />
                </Switch>

            </BrowserRouter>
        </Provider>

    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
