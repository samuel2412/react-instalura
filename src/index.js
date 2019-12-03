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


function verificaAutenticacao(next, replace)
{
    if(localStorage.getItem('auth-token') != null)
    {
        return true;
    }
}

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>

                <Route exact path="/" component={Login} />
                <Route path="/timeline" render={() => (
                    verificaAutenticacao() ? (
                        <App />
                    ) : (
                            <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!" />
                        )
                )} />
                 <Route path="/logout" component={Logout}/>

            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
