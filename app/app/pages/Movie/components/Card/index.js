import React from 'react';
import { css } from 'aphrodite';

import BaselineTrendingUp from 'react-md-icon/dist/BaselineTrendingUp';

import WatchButton from '../WatchButton';

import styles from './styles';

const Card = ({ movie }) => (
    <div className={css(styles.card)}>
        <img src={movie.images.fanart} className={css(styles.image)} alt={movie.title} />

        <div className={css(styles.content)}>
            <h3 className={css(styles.title)}>Torrents</h3>

            {Object.entries(movie.torrents.en).map(([res, torrent], i) => (
                <div className={css(styles.torrent)} key={res}>
                    <div className={css(styles.torrentHeader)}>
                        <p className={css(styles.resolution)}>{res}</p>
                        <span className={css(styles.ratio)}>
                            <BaselineTrendingUp className={css(styles.ratioIcon)} />
                            <p>{(torrent.seed / torrent.peer).toFixed(2)}</p>
                        </span>
                    </div>

                    <WatchButton movie={movie} resolution={res} primary={i === 0} />
                </div>
            ))}
        </div>
    </div>
);

export default Card;
