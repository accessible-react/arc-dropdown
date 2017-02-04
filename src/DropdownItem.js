import React, {PropTypes,Component} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import keycode from 'keycode';
import {arcDropdownListItemStyles, arcDropdownSelectedListItemStyles, arcDropdownFocusedListItemStyles} from './styles';
import * as KEY_CODES_NAMES from './keycodenames';

export default class DropdownItem extends Component{

    componentDidMount=()=>{
      this.focusIfNeeded();
    }
    componentDidUpdate=()=>{
      this.focusIfNeeded();
    }
    focusIfNeeded=()=>{
      if(this.props.focused){
        this.node.focus();
      }
    }
    mergeStyles=()=>{
      const styles = {};
      const {selected,focused, style : propStyles} = this.props;
      Object.assign(styles,arcDropdownListItemStyles);
      if(selected){
        Object.assign(styles,arcDropdownSelectedListItemStyles);
      }
      if(focused){
        Object.assign(styles,arcDropdownFocusedListItemStyles);
      }
      Object.assign(styles,propStyles);
      return styles;
    }

    render(){
      const {text,label,onClick} = this.props;
      const style = this.mergeStyles();
      return <li ref={node=>this.node=node}  className="arc-dropdown-list-item" style={style} onClick={onClick} onKeyDown={this.onKeyDown} role="menu-item">{label || text}</li>;
    }
}



DropdownItem.propTypes = {
  value : PropTypes.any.isRequired,
  label : PropTypes.any,
  style : PropTypes.object,
  text : PropTypes.any.isRequired,
  onClick : PropTypes.func.isRequired,
  onKeyDown : PropTypes.func.isRequired,
  selected : PropTypes.bool,
  focused : PropTypes.bool
};

DropdownItem.defaultProps = {
  onClick : ()=>{},
  onKeyDown : ()=>{}
};
