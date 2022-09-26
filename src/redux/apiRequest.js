import * as httpRequest from '@/utils/httpRequest';

import { loginSucces, register } from './authSlice';

export const loginUser = async (data, dispatch, navigate) => {
    try {
        const res = await httpRequest.post('/auth/login', data);
        dispatch(loginSucces(res));
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
export const registerUser = async (data, dispatch, navigate) => {
    try {
        const res = await httpRequest.post('/auth/register', data);
        dispatch(register(res.data));
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
