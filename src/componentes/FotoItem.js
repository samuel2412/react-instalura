import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import PubSub from 'pubsub-js'

class FotoAtulizacoes extends Component {

  constructor(props) {
    super(props);
    this.state = { likeada: this.props.foto.likeada }
  }

  likeFoto(event) {
    event.preventDefault();

    axios.post(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(res => {
        //  console.log(res)
        if (res.status === 200) {
          return res.data;
        }
      }).then(liker => {
        //console.log(liker)
        this.setState({ likeada: !this.state.likeada })
        PubSub.publish('atualiza-liker', { fotoId: this.props.foto.id, liker });

      }).catch(erro => {
        //console.log(erro)
        this.setState({ msg: 'Não foi possível completar a ação' })
      })
  }

  comentaFoto(event) {
    event.preventDefault();

    axios.post(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
    , {texto:this.comentario.value}
    )
      .then(res => {
          //console.log(res)
        if (res.status === 200) {
          return res.data;
        }
      }).then(novoComentario => {
        //console.log(liker)
        //this.setState({ likeada: !this.state.likeada })
        PubSub.publish('novo-comentarios', { fotoId:this.props.foto.id,novoComentario});

      }).catch(erro => {
        //console.log(erro)
        this.setState({ msg: 'Não foi possível completar a ação' })
      })
  }


  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.likeFoto.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</a>
        <form className="fotoAtualizacoes-form" onSubmit={this.comentaFoto.bind(this)}>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input} />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>

      </section>
    );
  }
}

class FotoInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { likers: this.props.foto.likers, comentarios: this.props.foto.comentarios }
  }

  componentDidMount() {
    PubSub.subscribe('novo-comentarios', (topico, infoComentario) => {
      if (this.props.foto.id === infoComentario.fotoId) {
      
        const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
        console.log(novosComentarios)
        this.setState({comentarios: novosComentarios});
        
      }
    });

    PubSub.subscribe('atualiza-liker', (topico, infoLiker) => {
      if (this.props.foto.id === infoLiker.fotoId) {
        const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
        if (possivelLiker === undefined) {
          const novosLikers = this.state.likers.concat(infoLiker.liker);
          this.setState({ likers: novosLikers });
        } else {
          const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
          this.setState({ likers: novosLikers });
        }
      }
    });





  }
  render() {
    //console.log(this.comentarios)

    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.state.likers.map(liker => {
              return (<Link key={liker.login} to={`/timeline/${liker.login}`} >{liker.login},</Link>)
            })
          }

          curtiram

              </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          {this.props.foto.comentario}
        </p>

        <ul className="foto-info-comentarios">
          {
            this.state.comentarios.map(comentario => {
              return (
                  <li className="comentario" key={comentario.id}>
                  <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                  {comentario.texto}
                  </li>
              );
              })
          }
        </ul>
      </div>
    );
  }
}

class FotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
              {this.props.foto.loginUsuario}
            </Link>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.foto.horario}</time>
      </header>

    );
  }
}



export default class FotoItem extends Component {


  render() {
    return (
      <div className="foto">
        <FotoHeader foto={this.props.foto} />
        <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} />
        <FotoAtulizacoes foto={this.props.foto} />
      </div>
    );
  }
}