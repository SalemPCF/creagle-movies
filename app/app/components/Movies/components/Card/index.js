import { Route } from 'react-router-dom';
import Truncate from 'react-truncate';
import React from 'react';

import { cardShape, cardDefaultProps } from './shape';

export const Card = ({
    _id: id,
    title,
    year,
    images,
    torrents,
}) => (
    <Route
        key={id}
        render={({ history }) => {
            const qualities = Object.keys(torrents.en);

            if (qualities.length < 0) { return null; }

            return (
                // eslint-disable-next-line
                <div className="card" onClick={() => history.push('/movie')}>
                    {qualities.includes('1080p') && (
                        <i className="material-icons hd-icon">hd</i>
                    )}

                    <img className="card-image" src={images.poster} alt="Poster" />

                    <div className="card-footer">
                        <p className="text primary">
                            <Truncate lines={1} ellipsis="...">{title}</Truncate>
                        </p>

                        <p className="text secondary">
                            {year}
                        </p>
                    </div>
                </div>
            );
        }}
    />
);

Card.propTypes = cardShape;
Card.defaultProps = cardDefaultProps;
