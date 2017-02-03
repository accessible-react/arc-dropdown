import ArcDropdown, {ArcDropdownListItem} from '../src';
import React from 'react';
import {render} from 'react-dom';

if(module.hot){
   module.hot.accept();
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : -1
    };
  }
  onChange=(event,value)=>{
    this.setState({value});
  }
  render(){
    return <div className="container">
        <div className="jumbotron">
        <h1>ArcDropdown</h1>
        </div>
      <ArcDropdown value={this.state.value} onChange={this.onChange}>
        <ArcDropdownListItem text="Morning" value={0} />
        <ArcDropdownListItem text="A long Afternoon" value={1} />
        <ArcDropdownListItem text="Evening" value={2} />
        <ArcDropdownListItem text="Night" value={3} />
      </ArcDropdown>
    </div>;
  }
}
window.__myapp_container = document.getElementById('app');
render(<Main/>,window.__myapp_container);
