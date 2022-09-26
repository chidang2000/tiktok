import * as httpRequest from '@/utils/httpRequest';

export const getVideos = async ({ token, type, page }) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
