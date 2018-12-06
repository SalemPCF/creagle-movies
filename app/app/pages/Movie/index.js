/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadMovie } from '../../../redux/actions/movie';
import movieSchema from '../../../schemas/movie';
import MovieContainer from './Movie.container';

const mapStateToProps = state => ({
    movie: state.pages.movie.id ? denormalize(
        state.pages.movie.id,
        movieSchema,
        state.entities,
    ) : null,
});

const mapDispatchToProps = dispatch => ({
    loadMovie: id => dispatch(loadMovie(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MovieContainer);
