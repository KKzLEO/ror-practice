import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loader.module.scss';

function Loader(props) {
    let isShow = props.isShow === null || props.isShow === undefined || !props.isShow ? false : true;
    if(isShow)
        return (
            <div className={styles.loader_container}>
                <CircularProgress className={styles.loader} />
            </div>
        )
    else return false;
}

export default Loader
