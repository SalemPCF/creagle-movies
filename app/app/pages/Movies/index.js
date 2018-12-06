/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadMovies } from '../../../redux/actions/movies';
import movieSchema from '../../../schemas/movie';
import MoviesContainer from './Movies.container';
import { flatten } from '../../../helpers';

const mapStateToProps = state => ({
    movies: denormalize(
        flatten(Object.values(state.pages.movies.pages)),
        [movieSchema],
        state.entities,
    ),
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MoviesContainer);
