import axios from 'axios';
import PubSub from 'pubsub-js';

export default class LogicaTimeLine {

    constructor(fotos) {
        this.fotos = fotos;
    }
    subscribe(callback){
        PubSub.subscribe('timeline',(topico,fotos) => {
            callback(fotos);
        })
    }

    carregaFotos(urlPerfil) {

        axios.get(urlPerfil)
            .then(({ data }) => {
                //console.log(data)
                this.fotos = data;
                PubSub.publish('timeline',this.fotos);
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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(novoComentario);
                PubSub.publish('timeline', this.fotos);


            }).catch(erro => {
                console.log(erro)
                //this.setState({ msg: 'Não foi possível completar a ação' })
            })
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

                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.likeada = !fotoAchada.likeada;

                const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

                if (possivelLiker === undefined) {
                    fotoAchada.likers.push(liker);
                } else {
                    const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = novosLikers;
                }
                PubSub.publish('timeline', this.fotos);



            }).catch(erro => {
                console.log(erro)
                //.setState({ msg: 'Não foi possível completar a ação' })
            })
    }


}