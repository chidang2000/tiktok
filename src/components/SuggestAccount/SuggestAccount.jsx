import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import SuggestItem from './SuggestItem';

const cx = classNames.bind(styles);
const SuggestAccount = ({ label, seeMore, isPreview, isDiscover, data }) => {
    const [expand, setExpand] = useState(false);

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
                        {data &&
                            data.map((item, i) => <SuggestItem key={i} isPreview={isPreview} dataSuggest={item} />)}
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
