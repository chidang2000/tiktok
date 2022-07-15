import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';
import Header from '@/components/Layout/components/Header';
import SideBar from './SideBar';

const cx = classNames.bind(styles);
function DefautLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <SideBar></SideBar>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefautLayout;
