import React, { Component } from 'react';
import FotoItem from './FotoItem';
import axios from 'axios';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




export default class TimeLine extends Component {

    constructor(props) {
        super(props)
        this.state = { fotos: [] }
        this.login = this.props.login;

    }


    UNSAFE_componentWillMount() {
        PubSub.subscribe('timeline',(topico,fotos) => {
            this.setState({fotos});
          });
    
          PubSub.subscribe('atualiza-liker',(topico,infoLiker) => {        
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;
            
            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);
    
            if(possivelLiker === undefined){
              fotoAchada.likers.push(infoLiker.liker);
            } else {
              const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
              fotoAchada.likers = novosLikers;
            }
            this.setState({fotos:this.state.fotos});
            
          });
    
          PubSub.subscribe('novos-comentarios',(topico,infoComentario) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId);        
            fotoAchada.comentarios.push(infoComentario.novoComentario);
            this.setState({fotos:this.state.fotos});        
          });      



    }


    componentDidMount() {
        this.carregaFotos()
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.login !== undefined) {

            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {

        axios.post(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
            .then(res => {
                //  console.log(res)
                if (res.status === 200) {
                    return res.data;
                }
            }).then(liker => {
                //console.log(liker)
                //this.setState({ likeada: !this.state.likeada })
                PubSub.publish('atualiza-liker', { fotoId, liker });

            }).catch(erro => {
                console.log(erro)
                //.setState({ msg: 'Não foi possível completar a ação' })
            })
    }

    comenta(fotoId, textoComentario) {
       
        axios.post(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
            , { texto: textoComentario }
        )
            .then(res => {
                //console.log(res)
                if (res.status === 200) {
                    return res.data;
                }
            }).then(novoComentario => {
                //console.log(liker)
                //this.setState({ likeada: !this.state.likeada })
                PubSub.publish('novos-comentarios', { fotoId, novoComentario });

            }).catch(erro => {
                console.log(erro)
                //this.setState({ msg: 'Não foi possível completar a ação' })
            })
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
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta} />)
                    }
                </ReactCSSTransitionGroup>

            </div>
        );
    }
}