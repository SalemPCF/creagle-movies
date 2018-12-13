/* Node */
import PropTypes from 'prop-types';

/* Relative */
import Show from '../../../prop-types/Show';

const shared = {
    shows: PropTypes.arrayOf(Show).isRequired,
};

export default {
    container: {
        ...shared,
        loadShows: PropTypes.func.isRequired,
        scrollPosition: PropTypes.number.isRequired,
    },
};
