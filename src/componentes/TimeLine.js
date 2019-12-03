import React, { Component } from 'react';
import FotoItem from './FotoItem';
import axios from 'axios';




export default class TimeLine extends Component {

    constructor() {
        super()
        this.state = { fotos: [] }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
        .then(({ data }) => {
            console.log(data)
            this.setState({
                fotos: data
            })
        })
        /* fetch('http://localhost:8080/api/public/fotos/alots')
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos });
            }); */

    }
  

    render() {
        console.log(this.state.fotos)
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }

            </div>
        );
    }
}