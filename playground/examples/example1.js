import Dropdown, {DropdownItem} from '../../src';
import React from 'react';

export default class Example1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : -1
    };
  }
  onChange=(event,value,child,index)=>{
    console.log(child,index);
    this.setState({value});
  }
  render(){
    return <section className="container-fluid">
      <h2> Basic example</h2>
      <Dropdown value={this.state.value} onChange={this.onChange}>
        <DropdownItem text="Morning" value={0} />
        <DropdownItem text="A long Afternoon" label="An afternoon" value={1} />
        <DropdownItem text="Evening" value={2} />
        <DropdownItem text="Night" value={3} />
      </Dropdown>
    </section>;
  }
}
