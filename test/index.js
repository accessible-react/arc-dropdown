import test from 'ava';
import Dropdown, {DropdownItem} from '../dist';
import React from 'react'
import { shallow, mount } from 'enzyme';

test('component renders correctly',t=>{
  const wrapper = shallow(<Dropdown value={-1}>
      <DropdownItem value={0} text="hey"/>
  </Dropdown>);
  t.truthy(wrapper.find('div'),'Arc Dropdown has a valid render');
});
