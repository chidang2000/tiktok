import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import { HeaderOnly } from '@/layouts';
import configs from '@/config';
import Search from '@/pages/Search';
const publicRoutes = [
    {
        path: configs.routes.home,
        component: Home,
    },
    {
        path: configs.routes.following,
        component: Following,
    },
    {
        path: configs.routes.profile,
        component: Profile,
    },
    {
        path: configs.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: configs.routes.search,
        component: Search,
        layout: null,
    },
];

export { publicRoutes };
