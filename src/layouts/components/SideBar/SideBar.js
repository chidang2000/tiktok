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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SuggestAccount from '@/components/SuggestAccount';
import Button from '@/components/Button';
import ModalLogin from '@/components/ModalLogin';
import { MODAL_LOGIN, MODAL_REGISTER } from '@/components/FakeAPIModalAuth';
import * as suggestServices from '@/services/suggestService';
import * as followingServices from '@/services/followingSidebarService';

const cx = classNames.bind(styles);

const page = 1;
const per_page = 12;
function SideBar({ isProfile }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    // const isFollowing = true;
    const isLogin = useSelector((state) => state.auth.login.currentUser);

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser !== null ? currentUser.meta.token : '';
    const [data, setData] = useState([]);
    const [followingSidebar, setFollowingSidebar] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            if (isLogin !== null) {
                const resultSuggest = await suggestServices.suggest({ page, per_page });
                const resultFollowing = await followingServices.follwingAcount({
                    token,
                    page,
                });
                setData(resultSuggest);
                setFollowingSidebar(resultFollowing);
            } else {
                const resultSuggest = await suggestServices.suggest({ page, per_page });
                setData(resultSuggest);
            }
        };
        fetchApi();
    }, [isLogin, token]);
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

            <SuggestAccount label="Suggested Accounts" seeMore="See all" isPreview data={data} />
            {isLogin !== null && <SuggestAccount label="Following" seeMore="See more" data={followingSidebar} />}
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

            <SuggestAccount label="Suggested Accounts" seeMore="See all" isPreview data={data} />
            <SuggestAccount isDiscover label="Discover" />
        </aside>
    );
}

export default SideBar;
