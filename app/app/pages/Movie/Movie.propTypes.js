/* Node */
import PropTypes from 'prop-types';

/* Relative */
import Movie from '../../../prop-types/Movie';

export default {
    container: {
        match: PropTypes.object.isRequired,
        loadMovie: PropTypes.func.isRequired,
        unloadMovie: PropTypes.func.isRequired,
        movie: Movie,
    },

    presenter: {
        movie: Movie,
        stars: PropTypes.shape({
            hasHalfStar: PropTypes.bool,
            filledStars: PropTypes.arrayOf(PropTypes.number),
            emptyStars: PropTypes.arrayOf(PropTypes.number),
        }).isRequired,
        isHD: PropTypes.bool.isRequired,
        runtime: PropTypes.string.isRequired,
        quality: PropTypes.string.isRequired,
    },
};
