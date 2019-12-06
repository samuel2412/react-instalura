import axios from 'axios';


export default class TimelineApi {

    static lista(urlPerfil) {
        return dispatch => {
            axios.get(urlPerfil)
                .then(({ data }) => {
                    //console.log(data)
                    dispatch({ type: 'LISTAGEM', fotos: data });
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
                    dispatch({ type: 'COMENTARIO', fotoId, novoComentario });
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
                    dispatch({ type: 'LIKE', fotoId, liker });
                    return liker;
                }).catch(erro => {
                    console.log(erro)
                })
        }
    }
}

