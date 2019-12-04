import { Component } from 'react';


export default class Logout extends Component {

    UNSAFE_componentWillMount(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/')
    }

    render(){
        return null;
    }
}