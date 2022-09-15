import * as httpRequest from '@/utils/httpRequest';

export const profile = async (nickname) => {
    try {
        const res = await httpRequest.get(`users/@${nickname}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
