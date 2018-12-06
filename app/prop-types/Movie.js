import PropTypes from 'prop-types';

export default PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imdb_id: PropTypes.string,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    synopsis: PropTypes.string,
    runtime: PropTypes.string,
    released: PropTypes.number,
    trailer: PropTypes.string,
    certification: PropTypes.string,
    images: PropTypes.objectOf(PropTypes.string).isRequired,
    // Not all api returns contain a torrent.
    // The app ignores them, but they would fail this
    // validation if it was required.
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
    rating: PropTypes.objectOf(PropTypes.number),
});
