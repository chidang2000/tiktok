import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import images from '@/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallBack = images.noImage, ...props }, ref) => {
    const [_fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(fallBack);
    };
    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, className)}
            src={_fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        ></img>
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};
export default Image;
