import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main'

describe('test Main component', () => {
    let props;
    
    beforeEach(() => {
        props = {
            stockData: [],
            fetchStockData: jest.fn(),
            exportStockData: jest.fn(),
            isLoading: false
        }
    })

    it('render', () => {
        shallow(<Main {...props} />)
    })
})

