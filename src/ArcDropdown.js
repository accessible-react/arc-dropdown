import React, {PropTypes,Component} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import {arcDropdownStyles, arcDropdownListStyles, arcDropdownSelectStyles} from './styles';
import ArcDropdownListItem from './ArcDropdownListItem';
import keycode from 'keycode';
import * as KEY_CODES_NAMES from './keycodenames';
const KEYNAMES =[KEY_CODES_NAMES.ENTER,KEY_CODES_NAMES.ESC, KEY_CODES_NAMES.UP, KEY_CODES_NAMES.DOWN, KEY_CODES_NAMES.SPACE];

export default class ArcDropdown extends Component{
  static count = 0;
  constructor(props){
    super(props);
    this.state = {
      isOpen : false,
      focusChildIndex : -1
    };
    this.id = `arcDropdown${++this.constructor.count}`;
  }
  toggle=()=>{
    const { state : {isOpen}, open,close} = this;
    isOpen ? close() : open();
  }

  closeHandler=(evt)=>{
    if (!this.node.contains(evt.target)) {
      this.close();
    }
  }

  focusChild=(num)=>{
    const filteredChildrenLength = this.getFilteredChildren(this.props.children).length;
    if(!filteredChildrenLength){
      return;
    }
    const {focusChildIndex} = this.state;
    if(num == -1 && focusChildIndex>0){
       return this.setState({focusChildIndex : focusChildIndex - 1});
    }
    if(num== 1 && focusChildIndex < (filteredChildrenLength - 1)){
       return this.setState({focusChildIndex : focusChildIndex + 1});
    }
  }

  open=()=>{
    this.setState({isOpen : true});
    document.addEventListener('click',this.closeHandler);
  }

  close=()=>{
    this.setState({isOpen : false, focusChildIndex : -1});
    document.removeEventListener('click',this.closeHandler);
  }
  blur = ()=>{
    this.node.blur();
  }

  selectFocusedItem=(e)=>{
    try{
      //console.log(this.refs[this.state.focusChildIndex].node.click);
      this.state.focusChildIndex >=0 && this.state.focusChildIndex < this.dropdownItemRefs.length ? this.dropdownItemRefs[this.state.focusChildIndex].node.click(e) : null;
      //console.log(this.refs);
    }catch(err){
      console.log(err);
    }
  }

  handleChange =(index)=>{
    this.setState({
      focusChildIndex : index,
    },()=>{ this.close(); });
  }

  onKeyDown=(e)=>{
    const keyName = keycode(e);
    if(KEYNAMES.indexOf(keyName)>=0){
      //Spacebar triggers click event too
      // Hence prevent default
      e.stopPropagation();
      e.preventDefault();
    }
    const {toggle,open,close,focusChild,blur,selectFocusedItem} = this;
    const {isOpen} = this.state;
    switch(keyName){
      case KEY_CODES_NAMES.ENTER:
        if(isOpen){
          selectFocusedItem(e);
        }else{
          open();
        }
        break;
      case KEY_CODES_NAMES.UP:
        if(!isOpen){
          open();
        }else{
          focusChild(-1);
        }
        break;
      case KEY_CODES_NAMES.DOWN:
        if(!isOpen){
          open();
        }else{
          focusChild(1);
        }
        break;
      case KEY_CODES_NAMES.SPACE:
        if(!isOpen){
          open();
        }
        break;
      case KEY_CODES_NAMES.ESC:
        if(isOpen){
          close();
        }
        blur();
        break;
      default :
        return;
    }
  }

  getFilteredChildren=(children)=>{
   const filteredChildren = [];
   React.Children.forEach(children, (child) => {
     if (child) {
       filteredChildren.push(child);
     }
   });
   return filteredChildren;
 }

  cloneChild = (child,index,focused, currentDropdownValue)=>{
    const {value = null} = child.props;
    this.dropdownItemRefs = [];
    return React.cloneElement(child,{
        index,
        focused,
        ref : node=>this.dropdownItemRefs[index] = node,
        selected : value === currentDropdownValue,
        onClick: (event) => {
        this.handleChange(index);
        this.props.onChange(event, value, child,index);
        if (child.props.onClick){
           child.props.onClick(event,value, child, index);
        };
    }});
  }

  renderChildren=()=>{
    //Render children
    const {children, dropdownListClassname, dropdownListStyle, value} = this.props;
    const {isOpen, focusChildIndex} = this.state;
    const filteredChildren = this.getFilteredChildren(children);
    const displayStyle = isOpen ? {display : 'block'} : {display : 'none'};
    return ( <ul className={classnames('arc-dropdown-list',dropdownListClassname)} style={Object.assign({},arcDropdownListStyles,dropdownListStyle,displayStyle)}  aria-hidden={!isOpen} aria-labelledby={this.id} role="menu">
       {React.Children.map(filteredChildren,(child,index)=>this.cloneChild(child,index,focusChildIndex===index, value ))}
    </ul>);
  }
  render(){
    const {isOpen} = this.state;
    const {
      className,
      dropdownSelectClassname,
      style,
      dropdownSelectStyle,
      children,
      value,
      placeHolderText,
    } = this.props;

    let displayValue = placeHolderText;
    React.Children.forEach(children, (child) => {
      if (child && value === child.props.value) {
        displayValue = child.props.label || child.props.text;
      }
    });
    return <div ref={node=>this.node=node} className={classnames('arc-dropdown',className)} style={Object.assign({},arcDropdownStyles,style)} >
            <button
                type="button"
                className={classnames('arc-dropdown-select',dropdownSelectClassname)}
                style={Object.assign({},arcDropdownSelectStyles,dropdownSelectStyle)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={this.toggle}
                onKeyDown={this.onKeyDown}
                id={`${this.id}`} >
              {displayValue}
            </button>
            {this.renderChildren()}
            </div>;
  }
}

ArcDropdown.defaultProps = {
  className : '',
  placeHolderText : 'Select a value',
  dropdownSelectClassname : '',
  dropdownListClassname : '',
  style : {},
  dropdownSelectStyle : {},
  dropdownListStyle : {}
};

ArcDropdown.propTypes = {
  value: PropTypes.any.isRequired,
  placeHolderText : PropTypes.string,
  children : PropTypes.any.isRequired,
  style : PropTypes.object,
  dropdownSelectStyle : PropTypes.object,
  dropdownListStyle : PropTypes.object,
  className : PropTypes.string,
  dropdownSelectClassname : PropTypes.string,
  dropdownListClassname : PropTypes.string,
  onChange : PropTypes.func
};
