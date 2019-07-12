import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loader.module.scss';

it('should render without crashing', () => {
    shallow(<Loader />)
});

it('should show when isShow equal true', () => {
    const wrapper = shallow(<Loader isShow={true} />);
    const div = <CircularProgress className={styles.loader} />;
    expect(wrapper.contains(div)).toEqual(true);
})

it('should hide when isShow equal false', () => {
    const wrapper = shallow(<Loader isShow={false} />);
    expect(wrapper.type()).toEqual(null);
})

it('should hide when isShow equal null', () => {
    const wrapper = shallow(<Loader isShow={null} />);
    expect(wrapper.type()).toEqual(null);
})

it('should hide when isShow equal undefine', () => {
    const wrapper = shallow(<Loader isShow={undefined} />);
    expect(wrapper.type()).toEqual(null);
})

it('should hide when isShow equal others', () => {
    const wrapper = shallow(<Loader isShow={'ffdsfsdfsd'} />);
    expect(wrapper.type()).toEqual(null);
})
