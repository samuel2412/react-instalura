import React, { Component } from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TimelineApi from '../API/TimeLineApi';





export default class TimeLine extends Component {

    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login;
    }


    componentDidMount() {
        this.props.store.subscribe(() => {
            this.setState({fotos:this.props.store.getState().timeline});
          })
        this.carregaFotos()
       
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.login !== undefined) {

            this.login = nextProps.login;
            this.carregaFotos();
        }
    }
    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
      }
  
      comenta(fotoId,textoComentario) {
        this.props.store.dispatch(TimelineApi.comenta(fotoId,textoComentario));
      }



    carregaFotos() {
        let urlPerfil;

        //console.log(this.login)

        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            // urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login.params.login}`;
        }
        //console.log(urlPerfil)
        this.props.store.dispatch(TimelineApi.lista(urlPerfil)); 
    }


    render() {
        //console.log(this.state.fotos)
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)} />)
                    }
                </ReactCSSTransitionGroup>

            </div>
        );
    }
}