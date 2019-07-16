import React from 'react';
import { shallow } from 'enzyme';
import Turnover from './Turnover'
import styles from './Turnover.module.scss';
import Immutable from 'immutable';

it('should render without crashing', () => {
    let props = {
        fetchStockData: jest.fn(),
        setQueryParameters: jest.fn().mockResolvedValue(43),
        stockData: [],
        isLoading: false,
        parameters: Immutable.Map()
    }
    const wrapper = shallow(<Turnover {...props} />)
    expect(props.fetchStockData).toBeCalled();
    expect(props.fetchStockData).toBeCalledTimes(1);
    expect(wrapper.instance().sortByField()).toBe(undefined);
});

// it('check ', () => {
    
// })


