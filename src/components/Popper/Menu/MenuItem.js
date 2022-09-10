import PropTypes from 'prop-types';
import Button from '@/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ data, onClick, className }) {
    const classnames = cx(
        'menu-item',
        {
            border: data.border,
        },
        className,
    );
    const isParent = !!data.title;

    return isParent ? (
        <Button className={classnames} leftIcon={data.icon} to={data.to} href={data.href} onClick={onClick}>
            {data.title}
        </Button>
    ) : (
        data.body
    );
}
MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};
export default MenuItem;
