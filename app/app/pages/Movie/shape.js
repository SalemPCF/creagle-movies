import PropTypes from 'prop-types';

const movie = PropTypes.shape({
    _id: PropTypes.string,
    imdb_id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    synopsis: PropTypes.string,
    runtime: PropTypes.string,
    released: PropTypes.number,
    trailer: PropTypes.string,
    certification: PropTypes.string,
    torrents: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.shape({
                filesize: PropTypes.string,
                peer: PropTypes.number,
                provider: PropTypes.string,
                seed: PropTypes.number,
                size: PropTypes.number,
                url: PropTypes.string,
            }),
        ),
    ),
    genres: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.objectOf(PropTypes.string),
    rating: PropTypes.objectOf(PropTypes.number),
});

export const movieShape = {
    loadMovie: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    movie,
};
