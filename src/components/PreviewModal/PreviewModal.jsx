import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PreviewModal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';

const cx = classNames.bind(styles);
const PreviewModal = ({ avatar, nickname, first_name, last_name, likes_count, followers_count }) => {
    return (
        <div className={cx('item-preview__wrapper')}>
            <div className={cx('item-preview__top')}>
                <Image className={cx('item-preview__top__img')} src={avatar} alt="" />
                <Button primary>Follow</Button>
            </div>

            <div className={cx('item-preview__info')}>
                <p className={cx('nickname')}>
                    <strong>{nickname}</strong>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} />
                </p>
                <p className={cx('name')}>
                    {first_name} {last_name}
                </p>
            </div>

            <div className={cx('item-preview__bottom')}>
                <p>
                    <strong>{followers_count}M</strong> <span>Followers</span> <strong>{likes_count}M</strong>
                    <span>Likes</span>
                </p>
            </div>
        </div>
    );
};

PreviewModal.propTypes = {
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    full_name: PropTypes.string,
};

export default PreviewModal;
