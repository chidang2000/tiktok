// import * as httpRequest from '@/utils/httpRequest';

import { loginStart, loginSucces } from './authSlice';

export const loginUser = (dataUser, dispatch, navigate) => {
    dispatch(loginStart(true));
    try {
        // const res = await httpRequest.post('/auth/login', user);

        dispatch(loginSucces(dataUser));
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};
