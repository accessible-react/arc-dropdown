import React, {PropTypes,Component} from 'react';
import {findDOMNode} from 'react-dom';
import classnames from 'classnames';
import {arcDropdownStyles, arcDropdownListStyles, arcDropdownSelectStyles} from './styles';
import ArcDropdownListItem from './ArcDropdownListItem';



export default class ArcDropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen : false,
    };
    this.id = parseInt( Math.random() * 100);
  }
  handleChange=(...args)=>{
    const {onChange} = this.props;
    this.close();
    onChange(...args);
  }
  getChildContext=()=>{
    const {value} = this.props;
    return {
      onArcDropdownItemClick: this.handleChange,
      selectedValue : value
    };
  }

  toggle=()=>{
    const { state : {isOpen}, open,close} = this;
    isOpen ? close() : open();
  }

  closeHandler=(evt)=>{
    const area = findDOMNode(this.refs.area);
    if (!area.contains(evt.target)) {
      this.close();
    }
  }

  open=()=>{
    this.setState({isOpen : true});
    document.addEventListener('click',this.closeHandler);
  }

  close=()=>{
    this.setState({isOpen : false});
    document.removeEventListener('click',this.closeHandler);
  }

  onKeyDown=({which})=>{
    console.log(which);
    const {toggle,open,close} = this;
    switch(which){
      case 13:
        toggle();
        break;
      case 40:
      case 39:
        open();
        break;
      case 27:
      case 38:
      case 37:
        close();
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

  renderChildren=()=>{
    const {children, dropdownListClassname, dropdownListStyle} = this.props;
    const {isOpen} = this.state;
    const filteredChildren = this.getFilteredChildren(children);
    return isOpen ? ( <div className={classnames('arc-dropdown-list',dropdownListClassname)} style={Object.assign({},arcDropdownListStyles,dropdownListStyle)}  aria-hidden={!isOpen} id={this.id}>
       {filteredChildren}
    </div>) : null;
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
      onChange
    } = this.props;

    let displayValue = placeHolderText;
    React.Children.forEach(children, (child) => {
      if (child && value === child.props.value) {
        // This will need to be improved (in case primaryText is a node)
        displayValue = child.props.label || child.props.text;
      }
    });
    return <div className={classnames('arc-dropdown',className)} style={Object.assign({},arcDropdownStyles,style)} ref="area">
    <div className={classnames('arc-dropdown-select',dropdownSelectClassname)} style={Object.assign({},arcDropdownSelectStyles,dropdownSelectStyle)} aria-expanded={isOpen} tabIndex="0" onClick={this.toggle} onKeyDown={this.onKeyDown} aria-controls={`${this.id}`}>
      {displayValue}
    </div>
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
ArcDropdown.childContextTypes = {
  onArcDropdownItemClick : PropTypes.func,
  selectedValue : PropTypes.any
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
