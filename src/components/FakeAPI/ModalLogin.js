import classNames from 'classnames/bind';
import styles from './FakeAPI.module.scss';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '@/assets/images';
import LoginByEmail from './LoginByEmail';
import RegisterByEmail from './RegisterByEmail';

const cx = classNames.bind(styles);
const QR = () => {
    return (
        <div className={cx('qr-content')}>
            <div className={cx('qr-left')}>
                <div className={cx('qr-image')}>
                    <img src={images.qr} alt="" />
                </div>
                <div className={cx('qr-left__content')}>
                    <p>1. Mở ứng dụng TikTok trên thiết bị di động của bạn</p>
                    <p>2. Trên Hồ sơ, nhấn vào </p>
                    <p>3. Nhấn vào rồi quét mã QR để xác nhận thông tin đăng nhập của bạn </p>
                </div>
            </div>
            <div className={cx('qr-right')}>
                <img
                    src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp/main/webapp-desktop/b6d3cc69d3525571aef0.gif"
                    alt=""
                />
            </div>
        </div>
    );
};

const MODAL_LOGIN = [
    {
        icon: <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>,
        title: 'Sử dụng mã QR',
        children: {
            title: 'Đăng nhập bằng mã QR',
            data: [
                {
                    body: QR(),
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'Số điện thoại/ Email / Tiktok ID',
        children: {
            title: 'Đăng nhập',
            data: [
                {
                    body: <LoginByEmail />,
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>,
        title: 'Tiếp tục Facebook',
        href: 'https://www.facebook.com/',
    },
    {
        icon: <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>,
        title: 'Tiếp tục Google',
        href: 'https://mail.google.com/',
    },
];

const MODAL_REGISTER = [
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'Đăng ký bằng Email',
        children: {
            title: 'Đăng Ký',
            data: [
                {
                    body: <RegisterByEmail />,
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>,
        title: 'Tiếp tục Google',
        href: 'https://mail.google.com/',
    },
];

export { MODAL_LOGIN, MODAL_REGISTER };
