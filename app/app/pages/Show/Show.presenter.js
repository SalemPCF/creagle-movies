/* Node */
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { Spinner } from '../../components/Spinner';
import propTypes from './Show.propTypes';
import styles from './Show.styles';

const ShowPresenter = ({
    show,
}) => (
    <div className={css(styles.container)}>
        {show && show.images && show.images.fanart && (
            <img className={css(styles.background)} src={show.images.fanart} alt="" />
        )}

        <div className={css(styles.overlay)} />

        <Link to="/shows" className={css(styles.closeIcon)}>
            <RoundArrowBack />
        </Link>

        {show ? (
            <div className={css(styles.innerContainer)} />
        ) : (
            <Spinner />
        )}
    </div>
);

ShowPresenter.propTypes = propTypes.presenter;

export default ShowPresenter;
