import React, {PropTypes,Component} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import './style.scss';


export default class ArcDropdownListItem extends Component{
    handleClick=(e)=>{
      const {value} = this.props;
      const {onArcDropdownItemClick} = this.context;
      typeof onArcDropdownItemClick === 'function' ? onArcDropdownItemClick(e,value) : null;
    }
    render(){
      const {text,label} = this.props;
      return <div className="arc-dropdown-list-item" onClick={this.handleClick} >{label || text}</div>;
    }
}

ArcDropdownListItem.contextTypes = {
  onArcDropdownItemClick : ()=>{},
};

ArcDropdownListItem.propTypes = {
  value : PropTypes.any.isRequired,
  label : PropTypes.any,
  text : PropTypes.any.isRequired,
};
