/* Node */
import PropTypes from 'prop-types';

export default {
    container: {
        match: PropTypes.shape({
            params: PropTypes.shape({
                type: PropTypes.string.isRequired,
                background: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    },
};
