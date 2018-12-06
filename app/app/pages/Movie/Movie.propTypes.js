import PropTypes from 'prop-types';
import Movie from '../../../prop-types/Movie';

export default {
    container: {
        match: PropTypes.object.isRequired,
        loadMovie: PropTypes.func.isRequired,
        movie: Movie,
    },

    presenter: {
        movie: Movie,
        startDownload: PropTypes.func.isRequired,
    },
};
