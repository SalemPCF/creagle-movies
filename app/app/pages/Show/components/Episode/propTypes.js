import PropTypes from 'prop-types';

export default {
    showId: PropTypes.string.isRequired,
    tvdb_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    episode: PropTypes.number.isRequired,
    first_aired: PropTypes.string.isRequired,
};
