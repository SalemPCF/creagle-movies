/* Node */
import PropTypes from 'prop-types';

/* Relative */
import Movie from '../../../prop-types/Movie';

const shared = {
    movies: PropTypes.arrayOf(Movie).isRequired,
};

export default {
    container: {
        ...shared,
        loadMovies: PropTypes.func.isRequired,
    },

    presenter: {
        ...shared,
        onBottomReached: PropTypes.func.isRequired,
        preserveScroll: PropTypes.func.isRequired,
    },
};
