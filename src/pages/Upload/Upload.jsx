import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as uploadServices from '@/services/uploadService';

import Button from '@/components/Button';
import { useSelector } from 'react-redux';

const options = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends' },
    { value: 'private', label: 'Private' },
];

// console.log(options[indexedDB].value);
const cx = classNames.bind(styles);
const Upload = (props) => {
    const [video, setVideo] = useState();
    const [inputCaption, setInputCaption] = useState('');
    const [limitedText, setLimitedText] = useState(0);
    const [checked, setChecked] = useState(true);
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser.meta.token;

    useEffect(() => {
        return () => {
            video && URL.revokeObjectURL(video.getImage);
        };
    }, [video]);

    const handleViewVideo = (e) => {
        const file = e.target.files[0];

        if ((file.type === 'video/mp4') | (file.type === 'video/webm')) {
            file.getImage = URL.createObjectURL(file);
            setVideo(file);
        } else {
            alert('Vui lòng chọn file có đuôi là "mp4" hoặc "webm"');
            setVideo('');
        }
    };

    const handleChangeTextCaption = (e) => {
        const target = e.target.value;
        setInputCaption(target);

        if (target.length >= 0) {
            setLimitedText(target.length >= 150 ? 150 : target.length);
        } else if (target.length <= 0) {
            setLimitedText(0);
        }
        if (target.length > 149) {
            setTimeout(() => {
                alert('Maximum 150 characters');
            }, 200);
        }
    };

    // const fetchApi = async () => {
    //     const infoVideo = {
    //         description: inputCaption,
    //         upload_file: video,
    //         thumbnail_time: 4,
    //         viewable: selectedOption.value,
    //     };
    //     const result = await uploadServices.uploadVideo({ token, infoVideo });
    //     return result;
    // };

    const handleUploadVideo = async () => {
        const infoVideo = {
            description: inputCaption,
            upload_file: video,
            thumbnail_time: 4,
            viewable: selectedOption.value,
        };
        const result = await uploadServices.uploadVideo({ token, infoVideo });
        return result;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <h2 className={cx('title')}>Upload Video</h2>
                    <p className={cx('desc')}>Post a video to your account</p>
                </div>

                <div className={cx('main')}>
                    <div className={cx('uploader')}>
                        {video ? (
                            <div className={cx('select-video')}>
                                <video controls autoPlay className={cx('video')}>
                                    <source src={video.getImage} type={'video/mp4' || 'video/webm'} />
                                </video>
                                <Button primary onClick={() => setVideo()} className={cx('btn-changevideo')}>
                                    Change Video
                                </Button>
                            </div>
                        ) : (
                            <label className={cx('uploader__card')} htmlFor="file">
                                <FontAwesomeIcon icon={faCloudArrowUp} className={cx('uploader__icon')} />
                                <span className={cx('uploader__title')}>Select video to upload</span>
                                <p className={cx('uploader__desc')}>Or drag and drop a file</p>
                                <div className={cx('uploader__info')}>
                                    <p className={cx('uploader__text')}>MP4 or WebM</p>
                                    <p className={cx('uploader__text')}>720x1280 resolution or higher</p>
                                    <p className={cx('uploader__text')}>Up to 10 minutes</p>
                                    <p className={cx('uploader__text')}>Less than 2 GB</p>
                                </div>
                                <div>
                                    <label htmlFor="file" className={cx('input-video')}>
                                        Select file
                                    </label>
                                    <input type="file" onChange={handleViewVideo} id="file" />
                                </div>
                            </label>
                        )}
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('caption')}>
                            <div className={cx('caption-top')}>
                                <h2 className={cx('text')}>Caption</h2>
                                <p className={cx('caption-limited')}>{limitedText}/150</p>
                            </div>
                            <input
                                value={inputCaption}
                                type="text"
                                className={cx('caption-input')}
                                onChange={handleChangeTextCaption}
                                maxLength="150"
                            />
                        </div>

                        <div className={cx('select-wrap')}>
                            <h2 className={cx('text')}>Who can view this video</h2>
                            <Dropdown
                                options={options}
                                value={options[0].value}
                                className={cx('dropdown')}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                            />
                        </div>

                        <div className={cx('checkbox-wrap')}>
                            <h2 className={cx('text')}>Allow users to</h2>
                            <div className={cx('checkbox-list')}>
                                <label className={cx('checkbox-item')}>
                                    <span className={cx('checkbox-name')}>Comment</span>
                                    <input
                                        type="checkbox"
                                        className={cx('checkbox-input')}
                                        defaultChecked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('checkbox-item')}>
                                    <span className={cx('checkbox-name')}>Duet</span>
                                    <input
                                        type="checkbox"
                                        className={cx('checkbox-input')}
                                        defaultChecked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('checkbox-item')}>
                                    <span className={cx('checkbox-name')}>Stitch</span>
                                    <input
                                        type="checkbox"
                                        className={cx('checkbox-input')}
                                        defaultChecked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                            </div>
                        </div>

                        <div className={cx('actions')}>
                            <Button className={cx('actions-discard')}>Discard</Button>
                            <Button className={video ? cx('actions-post') : cx('disable')} onClick={handleUploadVideo}>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Upload.propTypes = {};

export default Upload;
