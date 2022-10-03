import ContentItem from '@/components/ContentItem';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import * as homeServices from '@/services/homeService';
import Loading from '@/components/Loading/Loading';
// import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const page = 1;
const type = 'for-you';
function Home() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    // const token = useSelector((state) => state.auth.login.currentUser.meta.token);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await homeServices.getVideos({ type, page });
            setLoading(false);
            setPost(result);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loading type="spinningBubbles" color="#fe2c55" width={50} height={50} />
            ) : (
                post.map((item, i) => <ContentItem data={item} key={i} />)
            )}
        </div>
    );
}

export default Home;
