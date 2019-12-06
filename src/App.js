import React,{Component} from 'react';
import Header from './componentes/Header'
import Timeline from './componentes/TimeLine';
import PropTypes from 'prop-types';

class App extends Component{
  
  constructor(props){
    super(props)
  }

//<Header store={this.context.store}/>
  render(){
    console.log(this.props)
    return (
    <div id="root">
      <div className="main">
        
        <Timeline login={this.props.match.params}/>
      </div>
    </div>
    );
  }

}
App.contextTypes = {
  store : PropTypes.object.isRequired
}

export default App;
