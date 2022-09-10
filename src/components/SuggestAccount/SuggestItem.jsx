import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as WrapperPopper } from '@/components/Popper';
import styles from './SuggestAccount.module.scss';
import PreviewModal from '../PreviewModal';
import Image from '../Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const SuggestItem = ({ isPreview, dataSuggest, isDiscover }) => {
    return (
        <>
            {!isDiscover ? (
                isPreview ? (
                    <Tippy
                        interactive
                        placement="bottom"
                        offset={[-20, 0]}
                        delay={[800, 0]}
                        render={(attrs) => (
                            <div className={cx('item-preview')} tabIndex="-1" {...attrs}>
                                <WrapperPopper>
                                    <PreviewModal
                                        avatar={dataSuggest.avatar}
                                        nickname={dataSuggest.nickname}
                                        first_name={dataSuggest.first_name}
                                        last_name={dataSuggest.last_name}
                                        followers_count={dataSuggest.followers_count}
                                        likes_count={dataSuggest.likes_count}
                                    />
                                </WrapperPopper>
                            </div>
                        )}
                    >
                        <Link to={`/@${dataSuggest.nickname}`}>
                            <div className={cx('account-item')}>
                                <Image className={cx('avatar')} src={dataSuggest.avatar} alt="" />
                                <div className={cx('info')}>
                                    <div className={cx('nickname')}>
                                        <h4>{dataSuggest.nickname}</h4>
                                        <div>
                                            {dataSuggest.tick && (
                                                <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} />
                                            )}
                                        </div>
                                    </div>
                                    <p className={cx('name')}>
                                        {dataSuggest.first_name} {dataSuggest.last_name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Tippy>
                ) : (
                    <Link to={`/@${dataSuggest.nickname}`}>
                        <div className={cx('account-item')}>
                            <Image className={cx('avatar')} src={dataSuggest.avatar} alt="" />

                            <div className={cx('info')}>
                                <p className={cx('nickname')}>
                                    <strong>{dataSuggest.nickname}</strong>
                                    {dataSuggest.tick && (
                                        <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} />
                                    )}
                                </p>
                                <p className={cx('name')}>
                                    {dataSuggest.first_name} {dataSuggest.last_name}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            ) : (
                <div className={cx('discover')}>
                    <div className={cx('discover__item')}>
                        <span>#</span> <p className={cx('discover-text')}>sansangdoithay</p>
                    </div>
                    <div className={cx('discover__item')}>
                        <span>#</span> <p className={cx('discover-text')}>sansangdoithay</p>
                    </div>
                    <div className={cx('discover__item')}>
                        <span>#</span>{' '}
                        <p className={cx('discover-text')}>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n</p>
                    </div>
                </div>
            )}
        </>
    );
};

SuggestItem.propTypes = {
    isPreview: PropTypes.bool,
    dataSuggest: PropTypes.object,
    isDiscover: PropTypes.bool,
};

export default SuggestItem;
