import test from 'ava';
import ArcDropdown, {ArcDropdownListItem} from '../src';
import React from 'react'
import { shallow, mount } from 'enzyme';

test('component renders correctly',t=>{
  const wrapper = shallow(<ArcDropdown value={-1}>
      <ArcDropdownListItem value={0} text="hey"/>
  </ArcDropdown>);
  t.truthy(wrapper.find('div'),'Arc Dropdown has a valid render');
});
