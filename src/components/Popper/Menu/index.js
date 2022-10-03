import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as WrapperPopper } from '@/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);

const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onClick = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentHistory = history[history.length - 1];

    const renderItem = () => {
        return currentHistory.data.map((item) => {
            const isParent = !!item.children; // !! dung de chuyen sang dang boolean
            return (
                <MenuItem
                    key={uuid()}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onClick(item);
                        }
                    }}
                ></MenuItem>
            );
        });
    };

    const handleResetToFirstPage = () => setHistory((prev) => prev.slice(0, 1));
    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 500]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <WrapperPopper>
                        {history.length > 1 && <Header title={currentHistory.title} onBack={handleBackMenu}></Header>}
                        <div className={cx('menu-body')}>{renderItem()}</div>
                    </WrapperPopper>
                </div>
            )}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
