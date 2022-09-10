import ContentItem from '@/components/ContentItem';
import classNames from 'classnames/bind';
// import { useContext } from 'react';
import styles from './Following.module.scss';
// import { ProfileContext } from '@/Context/ProfileContext';
const cx = classNames.bind(styles);
function Following() {
    const following = JSON.parse(localStorage.getItem('API'));
    return (
        <div className={cx('wrapper')}>
            {following.map((item, i) => (
                <ContentItem key={i} data={item} />
            ))}
        </div>
    );
}

export default Following;
