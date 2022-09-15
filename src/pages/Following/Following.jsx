import ContentItem from '@/components/ContentItem';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
// import { useContext } from 'react';
import styles from './Following.module.scss';
import * as suggestServices from '@/services/suggestService';
// import { ProfileContext } from '@/Context/ProfileContext';

const page = 1;
const per_page = 12;
const cx = classNames.bind(styles);
function Following() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggestServices.suggest({ page, per_page });

            setPost(result);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {post.map((item, i) => (
                <ContentItem key={i} data={item} />
            ))}
        </div>
    );
}

export default Following;
