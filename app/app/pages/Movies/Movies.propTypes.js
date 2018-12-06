import PropTypes from 'prop-types';

import Movie from '../../../prop-types/Movie';

export default {
    container: {
        loadMovies: PropTypes.func.isRequired,
        movies: PropTypes.arrayOf(Movie).isRequired,
    },

    presenter: {
        movies: PropTypes.arrayOf(Movie).isRequired,
        onBottomReached: PropTypes.func.isRequired,
    },
};
