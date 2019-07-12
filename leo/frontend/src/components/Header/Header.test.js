import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('Header renders without crashing', () => {
    shallow(<Header />);
});

it('Header title exist', ()=>{
    const wrapper = shallow(<Header />);
    const welcome = <h1>STOCKS</h1>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
});

