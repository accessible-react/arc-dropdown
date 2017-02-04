import ArcDropdown, {ArcDropdownListItem} from '../../src';
import React from 'react';

export default class Example1 extends React.Component{
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
    return <section className="container">
      <h2> Basic example</h2>
      <ArcDropdown value={this.state.value} onChange={this.onChange}>
        <ArcDropdownListItem text="Morning" value={0} />
        <ArcDropdownListItem text="A long Afternoon" label="An afternoon" value={1} />
        <ArcDropdownListItem text="Evening" value={2} />
        <ArcDropdownListItem text="Night" value={3} />
      </ArcDropdown>
    </section>;
  }
}
