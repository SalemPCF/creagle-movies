/* Node */
import PropTypes from 'prop-types';

/* Relative */
import Show from '../../../prop-types/Show';

export default {
    container: {
        match: PropTypes.object.isRequired,
        loadShow: PropTypes.func.isRequired,
        unloadShow: PropTypes.func.isRequired,
        show: Show,
    },

    presenter: {
        show: Show,
    },
};
