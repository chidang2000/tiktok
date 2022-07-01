import Header from '@/components/Layout/components/Header';
import SideBar from './SideBar';

function DefautLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <SideBar></SideBar>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefautLayout;
