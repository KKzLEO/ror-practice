import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loader.module.scss';

function Loader(props) {
    let isShow = props.isShow === true ? true : false;
    if(isShow)
        return (
            <div className={styles.loader_container}>
                <CircularProgress className={styles.loader} />
            </div>
        )
    else return null;
}

export default Loader
