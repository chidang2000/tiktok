import * as httpRequest from '@/utils/httpRequest';

export const suggest = async (per_page) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                per_page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
