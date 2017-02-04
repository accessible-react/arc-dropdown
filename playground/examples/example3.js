import ArcDropdown, {ArcDropdownListItem} from '../../dist';
import React from 'react';

const options = [{
  label : <span>
    <b> <span className='glyphicon glyphicon-play-circle'></span>  Option One </b>
  </span>,
  text : `Option One`,
},{
  label : <span>
    <b> <span className='glyphicon glyphicon-file'></span>  Option Two </b>
  </span>,
  text : `Option Two`,
},{
  label : <span>
    <b> <span className='glyphicon glyphicon-volume-up'></span>  Option Three </b>
  </span>,
  text : `Option Three`,
},{
  label : <span>
    <b> <span className='glyphicon glyphicon-repeat'></span>  Option Four </b>
  </span>,
  text : `Option Four`,
}];

export default class Example2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : 2
    };
  }
  onChange=(event,value)=>{
    this.setState({value});
  }
  render(){
    return <section className="container-fluid">
        <h2>Example with custom jsx</h2>
        <ArcDropdown value={this.state.value} onChange={this.onChange}>
          {options.map((option,index)=><ArcDropdownListItem key={index} value={index} label={option.label} text={option.text} />)}
        </ArcDropdown>
    </section>;
  }
}
