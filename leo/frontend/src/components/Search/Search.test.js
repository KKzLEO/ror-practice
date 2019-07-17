import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search'
import styles from './Search.module.scss';
import Immutable from 'immutable';
import Button from '@material-ui/core/Button';

describe('test Search component', () => {
    let wrapper;
    let props;
    
    beforeEach(() => {
        props = {
            fetchStockData: jest.fn(),
            setQueryParameters: jest.fn().mockResolvedValue(43),
            exportStockData: jest.fn(),
            parameters: Immutable.Map()
        }
        wrapper = shallow(<Search {...props} />)
    })

    it('test function exportStockData', () => {
        wrapper.instance().exportStockData();
        expect(props.setQueryParameters).toBeCalled();
        expect(props.setQueryParameters).toBeCalledTimes(1);
    });

    it('test exporting file btn work', () => {
        wrapper.find(`.${styles.btn_toolbar}`).simulate('click');
        expect(props.setQueryParameters).toBeCalled();
        expect(props.setQueryParameters).toBeCalledTimes(1);
    })

    it('test enter id will change state ', () => {
        let mockChangeEvent = {
            target:{
                name:'companyId',
                value:'1101'
            }
        }
        wrapper.find('#id').simulate('change',mockChangeEvent);
        wrapper.update();
        let expectedParameters = Object.assign({}, wrapper.state().parameters);
        expectedParameters.companyId = '1101';
        expect(wrapper.state().parameters).toEqual(expectedParameters);
    })

    it('test enter date will change state ', () => {
        let mockChangeEvent = {
            target:{
                name:'date',
                value:'1996-08-15'
            }
        }
        wrapper.find('#date').simulate('change',mockChangeEvent);
        wrapper.update();
        let expectedParameters = Object.assign({}, wrapper.state().parameters);
        expectedParameters.date = '1996-08-15';
        expect(wrapper.state().parameters).toEqual(expectedParameters);
    })
    
    
})

