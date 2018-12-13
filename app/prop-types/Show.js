/* Node */
import PropTypes from 'prop-types';

export default PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imdb_id: PropTypes.string,
    num_seasons: PropTypes.number,
    rating: PropTypes.objectOf(PropTypes.number),
    slug: PropTypes.string,
    title: PropTypes.string,
    tvdb_id: PropTypes.string,
    year: PropTypes.string,
    images: PropTypes.objectOf(PropTypes.string).isRequired,
});
