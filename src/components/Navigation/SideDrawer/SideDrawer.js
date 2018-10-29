import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attStyles = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attStyles = [styles.SideDrawer, styles.Open];
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attStyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;