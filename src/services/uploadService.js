import * as httpRequest from '@/utils/httpRequest';

export const uploadVideo = async (token, data) => {
    try {
        const res = await httpRequest.post('/videos', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
