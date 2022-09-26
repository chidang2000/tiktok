import classNames from 'classnames/bind';
// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
// import { ProfileContext } from '@/Context/ProfileContext';
import Image from '@/components/Image';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis, faLock, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as profileService from '@/services/profileService';

const cx = classNames.bind(styles);
function Profile() {
    const { nickname } = useParams();
    const [profileUser, setProfileUser] = useState({ videos: [] });

    // const profile = JSON.parse(localStorage.getItem('API'));

    // const getProfileByNickname = (nickname) => profile.find((e) => e.nickname === nickname);
    // const profileUser = getProfileByNickname(nickname);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await profileService.profile(nickname);
            setProfileUser(result);
        };
        fetchApi();
    }, [nickname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [nickname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('header-left')}>
                        <div className={cx('header-left__info')}>
                            <div className={cx('header-left__avatar')}>
                                <Image src={profileUser.avatar} />
                            </div>
                            <div className={cx('header-left__desc')}>
                                <h1 className={cx('header-left__nickname')}>
                                    {profileUser.nickname}

                                    {profileUser.tick && (
                                        <FontAwesomeIcon icon={faCheckCircle} className={cx('header-left__tick')} />
                                    )}
                                </h1>
                                <h3 className={cx('header-left__name')}>
                                    {profileUser.first_name} {profileUser.last_name}
                                </h3>
                                <Button primary>Follow</Button>
                            </div>
                        </div>

                        <div className={cx('header-left__follow')}>
                            <p>
                                <strong className={cx('header-left__following')}>
                                    {profileUser.followings_count}{' '}
                                </strong>
                                <span>Đang Follow</span>
                            </p>
                            <p>
                                <strong className={cx('header-left__following')}>{profileUser.followers_count} </strong>
                                <span>Follower</span>
                            </p>
                            <p>
                                <strong className={cx('header-left__following')}>{profileUser.likes_count} </strong>
                                <span>Like</span>
                            </p>
                        </div>

                        <div className={cx('header-left__slogan')}>{profileUser.bio}</div>
                    </div>

                    <div className={cx('header-right')}>
                        <div>
                            <FontAwesomeIcon icon={faShare} className={cx('header-right__icon')} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEllipsis} className={cx('header-right__icon')} />
                        </div>
                    </div>
                </div>

                <div className={cx('main')}>
                    <div className={cx('tab')}>
                        <p className={cx('video-post', 'active')}>Video</p>
                        <p className={cx('video-post')}>
                            <FontAwesomeIcon icon={faLock} className={cx('video-post__icon')} />
                            Like
                        </p>
                    </div>

                    <div className={cx('list-video')}>
                        {profileUser.videos.map((video) => (
                            <div className={cx('video-item')} key={video.id}>
                                <div className={cx('video-item__video')}>
                                    <video controls width="100%">
                                        <source
                                            height="245px"
                                            width="100%"
                                            src={video.file_url}
                                            type={video.meta.mine_type}
                                        ></source>
                                    </video>
                                </div>
                                <div className={cx('video-item__desc')}>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
