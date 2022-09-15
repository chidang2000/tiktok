import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../FakeAPI.module.scss';
import Button from '@/components/Button';
import { loginUser } from '@/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loginStart, loginSucces } from '@/redux/authSlice';

const cx = classNames.bind(styles);
const LoginBySDT = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };
    return (
        <div className={cx('sdt-content')}>
            <div className={cx('sdt-top')}>
                <span className={cx('login-email')}>Email hoặc TikTok ID</span>
                <p className={cx('login-sdt')}>Đăng nhập bằng số điện thoại</p>
            </div>
            <form className={cx('sdt-form')} onSubmit={handleSubmit}>
                <div className={cx('input-container')}>
                    <input
                        placeholder="Email hoặc TikTok ID"
                        type="email"
                        className={cx('sdt-input')}
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('input-container')}>
                    <input
                        placeholder="Password"
                        type="password"
                        className={cx('sdt-input')}
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className={cx('sdt-btn')}>Đăng nhập</Button>
            </form>
        </div>
    );
};

export default LoginBySDT;
