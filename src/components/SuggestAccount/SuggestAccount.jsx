import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import SuggestItem from './SuggestItem';
import * as suggestServices from '@/services/suggestService';
import * as followingServices from '@/services/followingSidebarService';
import { useSelector } from 'react-redux';

const page = 1;
const per_page = 12;
const cx = classNames.bind(styles);
const SuggestAccount = ({ label, seeMore, isPreview, isDiscover, isFollowing }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser !== null ? currentUser.meta.token : '';
    const [expand, setExpand] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const resultSuggest = await suggestServices.suggest({ page, per_page });
            const resultFollowing = await followingServices.follwingAcount({
                token: token,
                page,
            });

            setData(isFollowing ? resultFollowing : resultSuggest);
        };
        fetchApi();
    }, [isFollowing, token]);

    const handlePerPage = () => {
        setExpand(!expand);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('content', expand ? 'expand' : '')}>
                {isDiscover ? (
                    <SuggestItem isDiscover={isDiscover} />
                ) : (
                    <>
                        {data.map((item, i) => (
                            <SuggestItem key={i} isPreview={isPreview} dataSuggest={item} />
                        ))}
                        <p className={cx('see-more')} onClick={handlePerPage}>
                            {expand ? 'Thu Gọn' : seeMore}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

SuggestAccount.propTypes = {
    label: PropTypes.string,
    seeMore: PropTypes.string,
};

export default SuggestAccount;