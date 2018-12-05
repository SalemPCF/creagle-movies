import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import React from 'react';

import { cardShape, cardDefaultProps } from './shape';

export const Movie = ({
    _id: id,
    title,
    year,
    images,
    torrents,
}) => {
    const qualities = Object.keys(torrents.en);

    if (qualities.length < 0) { return null; }

    return (
        <Link to={`/movies/${id}`} className="card">
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
        </Link>
    );
};

Movie.propTypes = cardShape;
Movie.defaultProps = cardDefaultProps;
