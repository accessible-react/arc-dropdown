import {Example1, Example2, Example3} from './examples';
import React from 'react';
import {render} from 'react-dom';

if(module.hot){
   module.hot.accept();
}

class Main extends React.Component{
  render(){
    return <div className="container-fluid" style={{paddingTop : 100,paddingBottom : 300}}>
        <div className="jumbotron">
        <h1>ArcDropdown</h1>
        <h4> Accessible React Dropdown </h4>
        </div>
        <div style={{marginTop:100}}>
          <Example1/>
        </div>
        <div style={{marginTop:300}}>
          <Example2/>
        </div>
        <div style={{marginTop:300}}>
          <Example3/>
        </div>
    </div>;
  }
}
window.__myapp_container = document.getElementById('app');
render(<Main/>,window.__myapp_container);
