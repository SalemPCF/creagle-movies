import PropTypes from 'prop-types';

export default {
    location: PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        state: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
};
