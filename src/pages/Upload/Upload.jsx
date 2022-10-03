import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import * as uploadServices from '@/services/uploadService';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';
// import Loading from '@/components/Loading/Loading';
import Modal from '@/components/Modal';

const options = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends' },
    { value: 'private', label: 'Private' },
];

const cx = classNames.bind(styles);
const Upload = (props) => {
    const [video, setVideo] = useState();
    const [inputCaption, setInputCaption] = useState('');
    const [limitedText, setLimitedText] = useState(0);
    const [checked, setChecked] = useState(true);
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser.meta.token;

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return () => {
            video && URL.revokeObjectURL(video.getImage);
        };
    }, [video]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, []);

    const handleViewVideo = (e) => {
        const file = e.target.files[0];

        if ((file.type === 'video/mp4') | (file.type === 'video/webm')) {
            file.getUrl = URL.createObjectURL(file);
            setVideo(file);
        } else {
            alert('Vui lòng chọn file có đuôi là "mp4" hoặc "webm"');
            setVideo('');
        }
    };

    const handleUploadVideo = async () => {
        setLoading(true);
        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 900);

        let formData = new FormData();

        formData.append('description', inputCaption);
        formData.append('upload_file', video);
        formData.append('thumbnail_time', '5');
        formData.append('viewable', selectedOption);

        const result = await uploadServices.uploadVideo(token, formData);
        setLoading(false);
        clearInterval(timer);
        setTimeout(() => {
            setVideo();
            setProgress(0);
            setInputCaption('');
            alert('Upload Success');
        }, 200);

        return result;
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
                                    <source src={video.getUrl} type={'video/mp4' || 'video/webm'} />
                                </video>
                                <Button
                                    primary
                                    onClick={() => {
                                        setVideo();
                                    }}
                                    className={cx('btn-changevideo')}
                                >
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
                                    <input type="file" onChange={handleViewVideo} id="file" name="upload" />
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
                                onChange={(e) => setSelectedOption(e.value)}
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
                        <Modal isOpen={loading}>
                            <div className={cx('loading')}>
                                {/* <Loading type="spinningBubbles" color="#fe2c55" width={100} height={100} /> */}
                                <div className={cx('wrapper-progress')}>
                                    <CircularProgressbar
                                        value={progress}
                                        maxValue={100}
                                        text={`${progress}%`}
                                        styles={buildStyles({
                                            pathColor: '#fe2c55',
                                        })}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Upload.propTypes = {};

export default Upload;
