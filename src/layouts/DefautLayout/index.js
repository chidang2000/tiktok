// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';
import Header from '@/layouts/components/Header';
import SideBar from '@/layouts/components/SideBar';
const cx = classNames.bind(styles);

function DefautLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
DefautLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefautLayout;
