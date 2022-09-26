import Header from '@/layouts/components/Header';
import './HeaderOnly.scss';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header isProfile></Header>
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
