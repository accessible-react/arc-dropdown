import ArcDropdown, {ArcDropdownListItem} from '../../src';
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
        <ArcDropdown value={this.state.value} onChange={this.onChange}>
          <ArcDropdownListItem label="Morning" text="9AM - 12PM" value={0} />
          <ArcDropdownListItem label="A long Afternoon" text="12PM-4PM" value={1} />
          <ArcDropdownListItem label="Evening" text="4PM-8PM" value={2} />
          <ArcDropdownListItem label="Night" text="8PM-11PM" value={3} />
        </ArcDropdown>
    </section>;
  }
}
