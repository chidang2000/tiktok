import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import configs from '@/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '@/components/icons';
import SuggestAccount from '@/components/SuggestAccount';
import Button from '@/components/Button';
import ModalLogin from '@/components/ModalLogin';
import { useState } from 'react';
import { MODAL_LOGIN, MODAL_REGISTER } from '@/components/FakeAPIModalAuth';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SideBar({ isProfile }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const isLogin = useSelector((state) => state.auth.login.currentUser);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return !isProfile ? (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={configs.routes.home}
                    icon={<HomeIcon />}
                    iconActive={<HomeActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={configs.routes.following}
                    icon={<UserGroupIcon></UserGroupIcon>}
                    iconActive={<UserGroupActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Live"
                    to={configs.routes.live}
                    icon={<LiveIcon></LiveIcon>}
                    iconActive={<LiveActiveIcon />}
                ></MenuItem>
            </Menu>

            {isLogin === null && (
                <div className={cx('suggest-login')}>
                    <h2 className={cx('suggest-login__title')}>
                        Đăng nhập để follow các tác giả, thích video và xem bình luận.
                    </h2>
                    <Button outline className={cx('suggest-login__btn')} onClick={openModal}>
                        Đăng Nhập
                    </Button>
                    <ModalLogin
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        items={MODAL_LOGIN}
                        itemRegister={MODAL_REGISTER}
                    />
                </div>
            )}

            <SuggestAccount label="Suggested Accounts" seeMore="See all" isPreview />
            {isLogin !== null && <SuggestAccount label="Following" seeMore="See more" isFollowing />}
            <SuggestAccount isDiscover label="Discover" />
        </aside>
    ) : (
        <aside className={cx('wrapper-profile')}>
            <Menu>
                <MenuItem
                    title="For You"
                    to={configs.routes.home}
                    icon={<HomeIcon />}
                    iconActive={<HomeActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={configs.routes.following}
                    icon={<UserGroupIcon></UserGroupIcon>}
                    iconActive={<UserGroupActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Live"
                    to={configs.routes.live}
                    icon={<LiveIcon></LiveIcon>}
                    iconActive={<LiveActiveIcon />}
                ></MenuItem>
            </Menu>

            {isLogin === null && (
                <div className={cx('suggest-login')}>
                    <h2 className={cx('suggest-login__title')}>
                        Đăng nhập để follow các tác giả, thích video và xem bình luận.
                    </h2>
                    <Button outline className={cx('suggest-login__btn')} onClick={openModal}>
                        Đăng Nhập
                    </Button>
                    <ModalLogin
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        items={MODAL_LOGIN}
                        itemRegister={MODAL_REGISTER}
                    />
                </div>
            )}

            <SuggestAccount label="Suggested Accounts" seeMore="See all" isPreview />
            <SuggestAccount isDiscover label="Discover" />
        </aside>
    );
}

export default SideBar;
