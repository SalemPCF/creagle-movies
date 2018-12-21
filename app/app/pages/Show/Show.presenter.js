/* Node */
import RoundStarBorder from 'react-md-icon/dist/RoundStarBorder';
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import RoundStarHalf from 'react-md-icon/dist/RoundStarHalf';
import RoundStar from 'react-md-icon/dist/RoundStar';
import TruncateMarkup from 'react-truncate-markup';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import moment from 'moment';
import React from 'react';

/* Relative */
import { EpisodePoster } from '../../components/Poster';
import SizeTracker from '../../components/SizeTracker';
import { Spinner } from '../../components/Spinner';
import Ripple from '../../components/Ripple';
import { titleCase } from '../../../helpers';
import Grid from '../../components/Grid';
import propTypes from './Show.propTypes';
import styles from './Show.styles';

const ShowPresenter = ({
    show, stars, runtime, seasons, selectedSeason, handleGeneric, getCellHeight, getColumnCount,
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

                <p className={css(styles.synopsis)}>{show.synopsis}</p>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {seasons ? Object.keys(seasons).map(seasonNum => (
                        <div key={seasonNum} onClick={() => handleGeneric('selectedSeason', seasonNum)} style={{ cursor: 'pointer' }}>
                            <p style={{ fontFamily: 'Roboto', color: selectedSeason === seasonNum ? '#6b91ca' : 'white', padding: '10px', borderBottom: selectedSeason === seasonNum ? '2px solid #6b91ca' : 'none' }}>{`SEASON ${seasonNum}`}</p>
                        </div>
                    )) : null}
                </div>

                {console.log(seasons[selectedSeason])}

                {Object.keys(seasons).length > 0 ? (
                    <SizeTracker className={css(styles.tracker)}>
                        {({ width, height }) => (
                            <Grid
                                className={css(styles.grid)}
                                width={width}
                                height={height}
                                getCellHeight={getCellHeight}
                                getColumnCount={getColumnCount}
                                items={seasons[selectedSeason]}
                                loadMore={() => null}
                                overscan={2}
                                renderItem={episode => (
                                    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
                                        <Ripple styles={styles.ripple}>
                                            <EpisodePoster
                                                id={`${episode.tvdb_id}`}
                                                image={`https://www.thetvdb.com/banners/episodes/${show.tvdb_id}/${episode.tvdb_id}.jpg`}
                                            />
                                        </Ripple>

                                        <div>
                                            <TruncateMarkup lines={1}>
                                                <p className={css(styles.infoText, styles.infoText_primary)}>
                                                    {episode.title}
                                                </p>
                                            </TruncateMarkup>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <p className={css(styles.infoText, styles.infoText_secondary)}>
                                                    {`S${episode.season > 10 ? episode.season : `0${episode.season}`}
                                                      E${episode.episode > 10 ? episode.episode : `0${episode.episode}`}
                                                     `}
                                                </p>

                                                <p className={css(styles.infoText, styles.infoText_secondary)}>
                                                    {moment.unix(episode.first_aired).format('MMM Do YYYY')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    </SizeTracker>
                ) : null}
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

ShowPresenter.propTypes = propTypes.presenter;

export default ShowPresenter;
