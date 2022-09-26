import * as httpRequest from '@/utils/httpRequest';

export const follwingAcount = async ({ token, page }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
