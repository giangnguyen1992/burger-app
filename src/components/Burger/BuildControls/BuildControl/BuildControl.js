import React from 'react';

import styles from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button 
            className={styles.Less}
            onClick={props.removed} 
            // disabled ist ein React property und bestimmt ob das Element angezeigt werden, true or false
            disabled={props.disabled}>Less</button>
            <button 
            className={styles.More} 
            onClick={props.added}>More</button>
        </div>
    )
};

export default buildControl;