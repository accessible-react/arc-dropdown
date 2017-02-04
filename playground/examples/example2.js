import Dropdown, {DropdownItem} from '../../src';
import React from 'react';

export default class Example2 extends React.Component{
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
    return <section className="container-fluid">
        <h2>Example with labels</h2>
        
    </section>;
  }
}
