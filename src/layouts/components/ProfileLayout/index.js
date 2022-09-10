import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Header from '@/layouts/components/Header';
import SideBar from '@/layouts/components/SideBar';

// import { useEffect, useState } from 'react';
// import { ProfileContext } from '@/Context/ProfileContext';

const cx = classNames.bind(styles);
function ProfileLayout({ children }) {
    // const [profile, setProfile] = useState([]);

    // useEffect(() => {
    //     fetch('https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=12')
    //         .then((res) => res.json())
    //         .then((res) => setProfile(res.data));
    // }, []);

    return (
        // <ProfileContext.Provider value={{ profile, setProfile }}>
        <div className={cx('wrapper')}>
            <Header isProfile></Header>
            <div className={cx('container')}>
                <SideBar isProfile></SideBar>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
        // </ProfileContext.Provider>
    );
}
ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProfileLayout;
