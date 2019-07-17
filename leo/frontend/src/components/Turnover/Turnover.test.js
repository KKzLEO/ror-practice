import React from 'react';
import { shallow } from 'enzyme';
import Turnover from './Turnover'


describe('test Turnover component', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            searchStockData: jest.fn(),
            stockData: [],
            isLoading: false,
            parameters: {}
        }
        wrapper = shallow(<Turnover {...props} />)
    })

    it('click event', () => {
        wrapper.find('#company_id').simulate('click');
        wrapper.find('#company_name').simulate('click');
        wrapper.find('#opening_price').simulate('click');
        wrapper.find('#max_price').simulate('click');
        wrapper.find('#min_price').simulate('click');
        wrapper.find('#yesterday_closing_price').simulate('click');
        wrapper.find('#today_closing_price').simulate('click');
        wrapper.find('#volume').simulate('click');
        wrapper.find('#up_down_value').simulate('click');
        wrapper.find('#percentage_up_down_value').simulate('click');
        expect(props.searchStockData).toBeCalledTimes(10);
    })


})
