import axios from 'axios';
import { listagem, comentario, like, notifica } from '../actions/actionCreator';

export default class TimelineApi {

    static lista(urlPerfil) {
        return dispatch => {
            axios.get(urlPerfil)
                .then(({ data }) => {
                    //console.log(data)
                    dispatch(listagem(data));
                    return data;
                })
        }
    }

    static comenta(fotoId, textoComentario) {
        return dispatch => {
            axios.post(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
                , { texto: textoComentario }
            )
                .then(res => {
                    //console.log(res)
                    if (res.status === 200) {
                        return res.data;
                    }
                }).then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario));
                    return novoComentario;

                }).catch(erro => {
                    console.log(erro)
                    //this.setState({ msg: 'Não foi possível completar a ação' })
                })
        }
    }

    static like(fotoId) {
        return dispatch => {
            axios.post(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
                .then(res => {
                    if (res.status === 200) {
                        return res.data;
                    }
                }).then(liker => {
                    dispatch(like(fotoId, liker));
                    return liker;
                }).catch(erro => {
                    console.log(erro)
                })
        }
    }

    static pesquisa(login) {
        return dispatch => {
            axios.get(`http://localhost:8080/api/public/fotos/${login}`)
                .then(response => response.data)
                .then(fotos => {
                    if (fotos.length === 0) {
                        dispatch(notifica('usuario não encontrado'));
                    } else {
                        dispatch(notifica(''));
                    }

                    dispatch(listagem(fotos));

                });
        }
    }
}

