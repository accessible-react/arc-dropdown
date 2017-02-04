import ArcDropdown, {ArcDropdownListItem} from '../../src';
import React from 'react';

const options = [{
  label : <div>
    <b> <span className='glyphicon glyphicon-play-circle'></span>  Option One </b>
  </div>,
  text : `Option One`,
},{
  label : <div>
    <b> <span className='glyphicon glyphicon-file'></span>  Option Two </b>
  </div>,
  text : `Option Two`,
},{
  label : <div>
    <b> <span className='glyphicon glyphicon-volume-up'></span>  Option Three </b>
  </div>,
  text : `Option Three`,
},{
  label : <div>
    <b> <span className='glyphicon glyphicon-repeat'></span>  Option Four </b>
  </div>,
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
