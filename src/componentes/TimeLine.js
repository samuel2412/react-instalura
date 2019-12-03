import React, { Component } from 'react';
import FotoItem from './FotoItem';




export default class TimeLine extends Component {

    constructor() {
        super()
        this.state = { fotos: [] }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/public/fotos/alots')
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos });
            });

    }

    render() {
        console.log(this.state.fotos)
        return (
            <div className="fotos container">
                {
                  this.state.fotos.map(foto => <FotoItem foto={foto}/>)
                }
                
            </div>
        );
    }
}