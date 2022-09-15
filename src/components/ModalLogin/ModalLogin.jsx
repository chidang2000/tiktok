import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ModalLogin.module.scss';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';

import MenuItem from '@/components/Popper/Menu/MenuItem';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const ModalLogin = ({ isOpen, onClose, items = [], itemRegister = [], onChange = defaultFn }) => {
    const [register, setRegister] = useState(false);

    const handleClose = () => {
        onClose();
        setRegister(false);
        handleResetToFirstPage();
    };

    const [history, setHistory] = useState([{ data: items }]);
    const [historyRegister, setHistoryRegister] = useState([{ data: itemRegister }]);
    const currentHistory = history[history.length - 1];
    const currentHistoryRegister = historyRegister[historyRegister.length - 1];

    const renderItem = () => {
        return currentHistory.data.map((item, index) => {
            const isParent = !!item.children; // !! dung de chuyen sang dang boolean
            return (
                <MenuItem
                    className={cx('login-link')}
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const renderItemRegister = () => {
        return currentHistoryRegister.data.map((item, index) => {
            const isParent = !!item.children; // !! dung de chuyen sang dang boolean
            return (
                <MenuItem
                    className={cx('login-link')}
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistoryRegister((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleResetToFirstPage = () => setHistory((prev) => prev.slice(0, 1));
    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <Modal isOpen={isOpen}>
            <div className={cx('login-wrapper')}>
                <div className={cx('login-modal')}>
                    {register ? (
                        <div className={cx('login-container')}>
                            <h1 className={cx('login-title')}>
                                {historyRegister.length > 1 ? currentHistoryRegister.title : 'Đăng ký TikTok'}
                            </h1>

                            {renderItemRegister()}
                        </div>
                    ) : (
                        <div className={cx('login-container')}>
                            <h1 className={cx('login-title')}>
                                {history.length > 1 ? currentHistory.title : 'Đăng nhập TikTok'}
                            </h1>

                            {renderItem()}
                        </div>
                    )}

                    <div className={cx('login-register')}>
                        <span>{register ? 'Bạn đã có tài khoản ?' : 'Bạn không có tài khoản ?'}</span>
                        <p onClick={() => setRegister(!register)}>{register ? 'Đăng nhập' : 'Đăng ký'}</p>
                    </div>
                </div>

                {history.length > 1 && (
                    <div className={cx('login-back')} onClick={handleBackMenu}>
                        <FontAwesomeIcon icon={faChevronLeft} className={cx('login-icon')} />
                    </div>
                )}

                <div className={cx('login-close')} onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} className={cx('login-icon')} />
                </div>
            </div>
        </Modal>
    );
};

ModalLogin.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default ModalLogin;
