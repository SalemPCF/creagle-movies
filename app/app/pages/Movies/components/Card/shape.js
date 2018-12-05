import PropTypes from 'prop-types';

export const cardShape = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    images: PropTypes.objectOf(PropTypes.string).isRequired,
    // Not all api returns contain a torrent.
    // The app ignores them, but they would fail this validation
    // if they it was required.
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
};

export const cardDefaultProps = {
    torrents: {},
};
