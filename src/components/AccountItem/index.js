import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
const cx = classNames.bind(styles);
function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/3197f31d62a78f5d6c2491283231092e~c5_100x100.jpeg?x-expires=1657958400&x-signature=0Mwhybl3k6unAoOz%2FCOmgMiXYt0%3D"
                alt="Dangg"
            ></img>
            <div className={cx('info')}>
                <p className={cx('name')}>
                    Nguyen Chi Dang <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}></FontAwesomeIcon>
                </p>
                <span className={cx('username')}>dangnnguyen</span>
            </div>
        </div>
    );
}

export default AccountItem;
