import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as WrapperPopper } from '@/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentHistory = history[history.length - 1];
    const renderItem = () => {
        return currentHistory.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                ></MenuItem>
            );
        });
    };
    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <WrapperPopper>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            ></Header>
                        )}
                        {renderItem()}
                    </WrapperPopper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
