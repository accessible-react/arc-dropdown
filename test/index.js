import test from 'ava';
import ArcDropdown from '../src';
import React from 'react'
import { shallow, mount } from 'enzyme';

test('component renders correctly',t=>{
  const wrapper = shallow(<ArcDropdown/>);
  t.is(wrapper.find('p').length,1);
});
