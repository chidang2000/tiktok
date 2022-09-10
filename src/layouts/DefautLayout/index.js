// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';
import Header from '@/layouts/components/Header';
import SideBar from '@/layouts/components/SideBar';
// import { ProfileContext } from '@/Context/ProfileContext';
const cx = classNames.bind(styles);

function DefautLayout({ children }) {
    // const [post, setPost] = useState([]);
    // useEffect(() => {
    //     fetch('https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=12')
    //         .then((res) => res.json())
    //         .then((res) => setPost(res.data));
    // }, []);

    return (
        // <ProfileContext.Provider value={{ post, setPost }}>
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
        // </ProfileContext.Provider>
    );
}
DefautLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefautLayout;
