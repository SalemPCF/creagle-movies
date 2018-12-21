import React from 'react';
import { css } from 'aphrodite';
import moment from 'moment';
import TruncateMarkup from 'react-truncate-markup';

import { padNum } from '../../../../../helpers/pad';
import Ripple from '../../../../components/Ripple';
import { EpisodePoster } from '../../../../components/Poster';

import styles from './styles';
import propTypes from './propTypes';

const Episode = ({
    showId,
    tvdb_id: tvdbId,
    title,
    season,
    episode,
    first_aired: firstAired,
}) => (
    <div className={css(styles.episode)}>
        <div className={css(styles.posterContainer)}>
            <Ripple>
                <EpisodePoster
                    id={tvdbId}
                    image={`https://www.thetvdb.com/banners/episodes/${showId}/${tvdbId}.jpg`}
                    defaultImage="resources/no-image-available@4-3.png"
                />
            </Ripple>
        </div>

        <div>
            <TruncateMarkup lines={1}>
                <p className={css(styles.infoText, styles.infoText_primary)}>
                    {title}
                </p>
            </TruncateMarkup>

            <div className={css(styles.secondaryTextContainer)}>
                <p className={css(styles.infoText, styles.infoText_secondary)}>
                    S{padNum(season)} E{padNum(episode)}
                </p>

                <p className={css(styles.infoText, styles.infoText_secondary)}>
                    {moment.unix(firstAired).format('MMM Do YYYY')}
                </p>
            </div>
        </div>
    </div>
);

Episode.propTypes = propTypes;

export default Episode;
