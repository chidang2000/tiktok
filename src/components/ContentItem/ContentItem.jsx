import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentItem.module.scss';
import Button from '../Button';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import PreviewModal from '../PreviewModal';
import { Wrapper } from '../Popper';
import Image from '../Image';
const cx = classNames.bind(styles);

const ContentItem = ({ data }) => {
    const [follow, setFollow] = useState(data.user.is_followed);

    return (
        <div className={cx('item')}>
            <HeadlessTippy
                interactive
                placement="bottom"
                offset={[100, -660]}
                delay={[800, 0]}
                render={(attrs) => (
                    <div className={cx('item-preview')} tabIndex="-1" {...attrs}>
                        <Wrapper>
                            <PreviewModal
                                avatar={data.user.avatar}
                                nickname={data.user.nickname}
                                first_name={data.user.first_name}
                                last_name={data.user.last_name}
                                followers_count={data.user.followers_count}
                                likes_count={data.user.likes_count}
                            />
                        </Wrapper>
                    </div>
                )}
            >
                <NavLink to={`/@${data.user.nickname}`}>
                    <Image src={data.user.avatar} alt="" className={cx('avatar')} />
                </NavLink>
            </HeadlessTippy>

            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <Link to={`/@${data.user.nickname}`}>
                            <HeadlessTippy
                                interactive
                                placement="bottom"
                                offset={[-120, 0]}
                                delay={[800, 0]}
                                render={(attrs) => (
                                    <div className={cx('data-preview1')} tabIndex="-1" {...attrs}>
                                        <Wrapper>
                                            <PreviewModal
                                                avatar={data.user.avatar}
                                                nickname={data.user.nickname}
                                                first_name={data.user.first_name}
                                                last_name={data.user.last_name}
                                                followers_count={data.user.followers_count}
                                                likes_count={data.user.likes_count}
                                            />
                                        </Wrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('author')}>
                                    <h3 className={cx('author__nickname')}>{data.user.nickname}</h3>
                                    <h4 className={cx('author__name')}>{data.user.full_name}</h4>
                                </div>
                            </HeadlessTippy>
                        </Link>
                        <div className={cx('video-desc')}>
                            <span className={cx('video-desc__text')}>{data.description}</span>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #reviewlamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                            <NavLink to="/" className={cx('video-desc__hashtag')}>
                                #goclamdep
                            </NavLink>
                        </div>
                        <p className={cx('intership')}>Quan hệ có trả phí</p>
                        <h4 className={cx('video-music')}>Nhạc nền - Hồng Cao</h4>
                    </div>

                    <div className={cx('follow')}>
                        <Button
                            onClick={() => {
                                setFollow(!follow);
                            }}
                            className={follow ? 'text' : 'outline'}
                        >
                            {follow ? 'Đang Follow' : 'Follow'}
                        </Button>
                    </div>
                </div>
                <div className={cx('main')}>
                    <div className={cx('left')}>
                        <video controls width={'100%'} className={cx('video')}>
                            <source src={data.file_url} type={data.meta.mime_type}></source>
                        </video>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('right__item')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('right__icon')} />
                            <strong className={cx('right__value')}>10.5k</strong>
                        </div>
                        <div className={cx('right__item')}>
                            <FontAwesomeIcon icon={faCommentDots} className={cx('right__icon')} />
                            <strong className={cx('right__value')}>13.3</strong>
                        </div>
                        <div className={cx('right__item')}>
                            <FontAwesomeIcon icon={faShare} className={cx('right__icon')} />
                            <strong className={cx('right__value')}>27</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentItem;
