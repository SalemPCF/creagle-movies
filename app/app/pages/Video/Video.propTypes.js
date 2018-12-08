/* Node */
import PropTypes from 'prop-types';

/* Relative */
import Movie from '../../../prop-types/Movie';

export default {
    container: {
        match: PropTypes.object.isRequired,
        loadMovie: PropTypes.func.isRequired,
        // quality: PropTypes.string.isRequired,
        movie: Movie,
    },

    presenter: {
        movie: Movie,
        startDownload: PropTypes.func.isRequired,
    },
};
