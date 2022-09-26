import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faClose,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faL,
    faM,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { InboxIcon, MessageIcon, UploadIcon } from '@/components/icons';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';
import Menu from '@/components/Popper/Menu';
import Image from '@/components/Image';
import Search from '../Search';
import configs from '@/config';
import Modal from '@/components/Modal';
import { MODAL_LOGIN, MODAL_REGISTER } from '@/components/FakeAPIModalAuth';
import ModalLogin from '@/components/ModalLogin';
import { logout } from '@/redux/authSlice';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and help',
        // to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard shortcuts',
    },
];

function Header({ isProfile }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [keyboardModal, setKeyboardModal] = useState(false);
    const menuUser = [
        {
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
            title: 'View profile',
            to: currentUser && `/@${currentUser.data.nickname}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
            title: 'Logout',
            // to: '/logout',
            border: true,
        },
    ];

    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Keyboard shortcuts':
                return setKeyboardModal(true);
            // break;
            case 'Logout':
                dispatch(logout());
                navigate('/');
                break;
            default:
        }
    };
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return !isProfile ? (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={configs.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="tiktok"></img>
                    </Link>
                </div>

                <Search></Search>

                <div className={cx('action')}>
                    {currentUser !== null ? (
                        <div>
                            <Tippy content="Upload video" placement="bottom" delay={(0, 200)}>
                                <Link to={configs.routes.upload}>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon></UploadIcon>
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={(0, 200)}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon></MessageIcon>
                                    <span className={cx('toast-message')}>12</span>
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" delay={(0, 200)}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon></InboxIcon>
                                </button>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <Button to={currentUser ? configs.routes.upload : ''} text onClick={openModal}>
                                Upload
                            </Button>

                            <Button onClick={openModal} primary>
                                Log In
                            </Button>

                            {/* modal login */}

                            <ModalLogin
                                isOpen={modalIsOpen}
                                onClose={closeModal}
                                items={MODAL_LOGIN}
                                itemRegister={MODAL_REGISTER}
                            />

                            {/* end modal login */}
                        </>
                    )}

                    <Menu items={currentUser == null ? menuUser : MENU_ITEMS} onClick={handleMenuChange}>
                        {currentUser !== null ? (
                            <Link to={`/@${currentUser.data.nickname}`}>
                                <Image
                                    src={currentUser.data.avatar}
                                    className={cx('user-avatar')}
                                    alt={currentUser.data.nickname}
                                    fallBack="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fac92301a36c2275c99f393061ef04ca~c5_100x100.jpeg?x-expires=1658232000&x-signature=gjN6nX0HHH2P8ozGqGsUbS7UbAs%3D" //nay dung de lay anh khac khi anh tren bi loi~
                                ></Image>
                            </Link>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>

                    {/* Modal Keyboard */}
                    <Modal isOpen={keyboardModal}>
                        <div className={cx('keyboard-modal')}>
                            <div className={cx('keyboard-title')}>Phím tắt trên bàn phím</div>
                            <div className={cx('keyboard-content')}>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Quay về phía trước</span>
                                    <FontAwesomeIcon icon={faSquareCaretUp} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Đi đến video tiếp theo</span>
                                    <FontAwesomeIcon icon={faSquareCaretDown} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Thích video</span>
                                    <FontAwesomeIcon icon={faL} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Tắt / bật tiếng video</span>
                                    <FontAwesomeIcon icon={faM} className={cx('keyboard-icon')} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('login-close')} onClick={() => setKeyboardModal(false)}>
                            <FontAwesomeIcon icon={faClose} className={cx('login-icon')} />
                        </div>
                    </Modal>
                    {/* End modal Keyboard */}
                </div>
            </div>
        </header>
    ) : (
        <header className={cx('wrapper-profile')}>
            <div className={cx('inner-profile')}>
                <div className={cx('logo')}>
                    <Link to={configs.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="tiktok"></img>
                    </Link>
                </div>

                <Search></Search>

                <div className={cx('action')}>
                    {currentUser !== null ? (
                        <div>
                            <Tippy content="Upload video" placement="bottom" delay={(0, 200)}>
                                <Link to={configs.routes.upload}>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon></UploadIcon>
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy content="Message" placement="bottom" delay={(0, 200)}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon></MessageIcon>
                                    <span className={cx('toast-message')}>12</span>
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" delay={(0, 200)}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon></InboxIcon>
                                </button>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <Button to={currentUser.data ? configs.routes.upload : ''} text onClick={openModal}>
                                Upload
                            </Button>
                            <Button primary onClick={openModal}>
                                Log In
                            </Button>

                            {/* modal login */}

                            <ModalLogin
                                isOpen={modalIsOpen}
                                onClose={closeModal}
                                items={MODAL_LOGIN}
                                itemRegister={MODAL_REGISTER}
                            />

                            {/* end modal login */}
                        </>
                    )}
                    <Menu items={currentUser !== null ? menuUser : MENU_ITEMS} onClick={handleMenuChange}>
                        {currentUser.data !== null ? (
                            <Image
                                src={currentUser.data.avatar}
                                className={cx('user-avatar')}
                                alt={currentUser.data.nickname}
                                fallBack="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fac92301a36c2275c99f393061ef04ca~c5_100x100.jpeg?x-expires=1658232000&x-signature=gjN6nX0HHH2P8ozGqGsUbS7UbAs%3D" //nay dung de lay anh khac khi anh tren bi loi~
                            ></Image>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                    {/* Modal Keyboard */}
                    <Modal isOpen={keyboardModal}>
                        <div className={cx('keyboard-modal')}>
                            <div className={cx('keyboard-title')}>Phím tắt trên bàn phím</div>
                            <div className={cx('keyboard-content')}>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Quay về phía trước</span>
                                    <FontAwesomeIcon icon={faSquareCaretUp} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Đi đến video tiếp theo</span>
                                    <FontAwesomeIcon icon={faSquareCaretDown} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Thích video</span>
                                    <FontAwesomeIcon icon={faL} className={cx('keyboard-icon')} />
                                </div>
                                <div className={cx('keyboard-content-item')}>
                                    <span className={cx('keyboard-name')}>Tắt / bật tiếng video</span>
                                    <FontAwesomeIcon icon={faM} className={cx('keyboard-icon')} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('login-close')} onClick={() => setKeyboardModal(false)}>
                            <FontAwesomeIcon icon={faClose} className={cx('login-icon')} />
                        </div>
                    </Modal>
                    {/* End modal Keyboard */}
                </div>
            </div>
        </header>
    );
}

export default Header;
