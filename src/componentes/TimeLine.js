import React, { Component } from 'react';
import FotoItem from './FotoItem';
import axios from 'axios';




export default class TimeLine extends Component {

    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login;

    }

    componentDidMount() {
        this.carregaFotos()
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        
        if(nextProps.login !== undefined){
            
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }
    carregaFotos(){
        let urlPerfil;       
        
        console.log(this.login)
        
        if(this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
           // urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login.params.login}`;
        }
        //console.log(urlPerfil)


        axios.get(urlPerfil)
        .then(({ data }) => {
            //console.log(data)
            this.setState({
                fotos: data
            })
        })
    }
  

    render() {
        //console.log(this.state.fotos)
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }

            </div>
        );
    }
}