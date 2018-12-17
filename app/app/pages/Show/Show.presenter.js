/* Node */
import RoundStarBorder from 'react-md-icon/dist/RoundStarBorder';
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import RoundStarHalf from 'react-md-icon/dist/RoundStarHalf';
import RoundStar from 'react-md-icon/dist/RoundStar';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { titleCase } from '../../../helpers';
import { Spinner } from '../../components/Spinner';
import propTypes from './Show.propTypes';
import styles from './Show.styles';

const ShowPresenter = ({
    show, stars, runtime, seasons,
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
            <div className={css(styles.innerContainer)}>
                <h1 className={css(styles.title)}>{show.title}</h1>

                <div className={css(styles.metadata)}>
                    <p className={css(styles.metadataText)}>{show.year}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{runtime}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{`${show.air_day}s at ${show.air_time}`}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{titleCase(show.status)}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>

                    <div className={css(styles.metadataText, styles.metadataStars)}>
                        {stars.filledStars.map(num => (
                            <RoundStar key={num} className={css(styles.starIcon)} />
                        ))}

                        {stars.hasHalfStar
                            ? <RoundStarHalf className={css(styles.starIcon)} />
                            : null}

                        {stars.emptyStars.map(num => (
                            <RoundStarBorder key={num} className={css(styles.starIcon)} />
                        ))}
                    </div>
                </div>

                <div>
                    {Object.keys(seasons).map(season => (
                        <div key={season}>
                            <p>{`Season ${season}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

ShowPresenter.propTypes = propTypes.presenter;

export default ShowPresenter;
