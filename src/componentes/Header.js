import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import PubSub from 'pubsub-js';

export default class Header extends Component {



    pesquisa(event){
        event.preventDefault();
        axios.get(`http://localhost:8080/api/public/fotos/${this.loginPesquisado.value}`)
        .then(response => response.data)
        .then(fotos => {
            PubSub.publish('timeline',fotos);
        });
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
        </h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <Link to="/timeline">
                                ♡
               {/* <!--                 ♥-->
                <!--Quem deu like nas minhas fotos?--> */}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Link to="/logout">
                        Logout
               {/* <!--                 ♥-->
                <!--Quem deu like nas minhas fotos?--> */}
                    </Link>
            </header>
        );
    }
}