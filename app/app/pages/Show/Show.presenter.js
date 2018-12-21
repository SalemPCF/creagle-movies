/* Node */
import RoundStarBorder from 'react-md-icon/dist/RoundStarBorder';
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import RoundStarHalf from 'react-md-icon/dist/RoundStarHalf';
import RoundStar from 'react-md-icon/dist/RoundStar';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import SizeTracker from '../../components/SizeTracker';
import { Spinner } from '../../components/Spinner';
import Ripple from '../../components/Ripple';
import { titleCase } from '../../../helpers';
import Grid from '../../components/Grid';
import propTypes from './Show.propTypes';
import styles from './Show.styles';
import Episode from './components/Episode';

const ShowPresenter = ({
    show,
    stars,
    runtime,
    seasons,
    selectedSeason,
    createGenericHandler,
    getCellHeight,
    getColumnCount,
    handleScroll,
    synopsisCollapsed,
}) => (
    <div className={css(styles.container)}>
        <Link to="/shows" className={css(styles.closeIcon)}>
            <RoundArrowBack />
        </Link>

        {show ? (
            <div className={css(styles.innerContainer)}>
                <h1 className={css(styles.title)}>{show.title}</h1>

                <div className={css(styles.metadata)}>
                    <p className={css(styles.metadataText)}>{show.year}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{`~${runtime}`}</p>
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

                <p className={css(styles.synopsis, synopsisCollapsed && styles.synopsis_collapsed)}>
                    {show.synopsis}
                </p>

                <div className={css(styles.breakout)}>
                    <div className={css(styles.tabs)}>
                        {seasons && Object.keys(seasons).map((seasonNum) => {
                            const selected = selectedSeason === seasonNum;
                            return (
                                <div
                                    key={seasonNum}
                                    onClick={createGenericHandler('selectedSeason', seasonNum)}
                                    className={css(styles.tab, selected && styles.tab_selected)}
                                >
                                    <Ripple>
                                        <p
                                            className={css(
                                                styles.tabText,
                                                selected && styles.tabText_selected,
                                            )}
                                        >
                                            SEASON {seasonNum}
                                        </p>
                                    </Ripple>
                                </div>
                            );
                        })}
                    </div>

                    {Object.keys(seasons).length > 0 ? (
                        <div className={css(styles.gridContainer)}>
                            <SizeTracker className={css(styles.tracker)}>
                                {({ width, height }) => (
                                    <Grid
                                        className={css(styles.grid)}
                                        width={width}
                                        height={height}
                                        getCellHeight={getCellHeight}
                                        getColumnCount={getColumnCount}
                                        items={seasons[selectedSeason]}
                                        overscan={2}
                                        onScroll={handleScroll}
                                        renderItem={episode => (
                                            <Episode
                                                showId={show.tvdb_id}
                                                {...episode}
                                            />
                                        )}
                                    />
                                )}
                            </SizeTracker>
                        </div>
                    ) : null}
                </div>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

ShowPresenter.propTypes = propTypes.presenter;

export default ShowPresenter;
