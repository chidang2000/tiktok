import ContentItem from '@/components/ContentItem';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Following.module.scss';
import * as homeServices from '@/services/homeService';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const page = 1;
const type = 'following';
function Following() {
    const [post, setPost] = useState([]);
    const token = useSelector((state) => state.auth.login.currentUser.meta.token);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await homeServices.getVideos({ token, type, page });

            setPost(result);
        };
        fetchApi();
    }, [token]);
    return (
        <div className={cx('wrapper')}>
            {post.map((item, i) => (
                <ContentItem data={item} key={i} />
            ))}
        </div>
    );
}

export default Following;
