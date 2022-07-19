import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import { HeaderOnly } from '@/components/Layout';
import configRoutes from '@/config/routes';
import Search from '@/pages/Search';
const publicRoutes = [
    {
        path: configRoutes.home,
        component: Home,
    },
    {
        path: configRoutes.following,
        component: Following,
    },
    {
        path: configRoutes.profile,
        component: Profile,
    },
    {
        path: configRoutes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: configRoutes.search,
        component: Search,
        layout: null,
    },
];

export { publicRoutes };
