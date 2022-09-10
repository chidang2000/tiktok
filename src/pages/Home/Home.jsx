import ContentItem from '@/components/ContentItem';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import * as suggestServices from '@/services/suggestService';
// import { ProfileContext } from '@/Context/ProfileContext';

const cx = classNames.bind(styles);
const per_page = 12;
function Home() {
    // const { post } = useContext(ProfileContext);
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await suggestServices.suggest(per_page);

            setPost(result);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {post.map((item, i) => (
                <ContentItem data={item} key={i} />
            ))}
        </div>
    );
}

export default Home;
