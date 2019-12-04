import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super();
        const params = new URLSearchParams(props.location.search);
        const msgParam = params.get('msg');
        this.state = { msg:msgParam }
    }

    componentDidMount() {

    }
    envia(event) {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/public/login`, { login: this.login.value, senha: this.senha.value })
            .then(res => {
                //console.log(res)
                if(res.status === 200){
                    return res.data;
                }    
            }).then(token => {
                //console.log(token)
                localStorage.setItem('auth-token',token)
                this.props.history.push("/timeline");
                
            }).catch(erro => {
               // console.log(erro)
                this.setState({ msg:'Login ou Senha inválidos' })
            })
    }

    render() {
        return (
            <div className="login-box" >
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}