/* Node */
import PropTypes from 'prop-types';

export default {
    container: {
        loadMovies: PropTypes.func.isRequired,
        loadShows: PropTypes.func.isRequired,
        saveMoviesSearch: PropTypes.func.isRequired,
        resetMoviesSearch: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
    },

    presenter: {
        handleGeneric: PropTypes.func.isRequired,
        keywords: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
    },
};
