import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Header from '@/layouts/components/Header';
import SideBar from '@/layouts/components/SideBar';

const cx = classNames.bind(styles);
function ProfileLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header isProfile></Header>
            <div className={cx('container')}>
                <SideBar isProfile></SideBar>

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProfileLayout;
