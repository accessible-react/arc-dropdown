import React, {PropTypes,Component} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import {arcDropdownListItemStyles, arcDropdownSelectedListItemStyles} from './styles';

export default class ArcDropdownListItem extends Component{
    handleClick=(e)=>{
      const {value} = this.props;
      const {onArcDropdownItemClick} = this.context;
      typeof onArcDropdownItemClick === 'function' ? onArcDropdownItemClick(e,value) : null;
    }
    render(){
      const {text,label, style : propStyles, value} = this.props;
      const {selectedValue} = this.context;
      const isSelected = selectedValue === value;
      const style = isSelected ? Object.assign({},arcDropdownListItemStyles, arcDropdownSelectedListItemStyles , propStyles) : Object.assign({},arcDropdownListItemStyles, propStyles);
      console.log(selectedValue,value,isSelected, style);
      return <div className="arc-dropdown-list-item" style={style} onClick={this.handleClick} >{label || text}</div>;
    }
}

ArcDropdownListItem.contextTypes = {
  onArcDropdownItemClick : PropTypes.func,
  selectedValue : PropTypes.any
};

ArcDropdownListItem.propTypes = {
  value : PropTypes.any.isRequired,
  label : PropTypes.any,
  style : PropTypes.object,
  text : PropTypes.any.isRequired,
};
