import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const Portal = ({ children }) => {
    const [wrapper, setWrapper] = useState();

    useEffect(() => {
        const portal = document.createElement('div');
        document.body.appendChild(portal);

        setWrapper(portal);

        return () => {
            document.body.removeChild(portal);
        };
    }, []);

    if (!wrapper) {
        return null;
    }

    return ReactDOM.createPortal(children, wrapper);
};

export default Portal;
