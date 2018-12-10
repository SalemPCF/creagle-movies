/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadMovies, preserveScroll } from '../../../redux/actions/movies';
import movieSchema from '../../../schemas/movie';
import MoviesContainer from './Movies.container';
import { flatten } from '../../../helpers';

const mapStateToProps = state => ({
    movies: denormalize(
        flatten(Object.values(state.pages.movies.pages)),
        [movieSchema],
        state.entities,
    ),
    scrollPosition: state.pages.movies.scrollPosition,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
    preserveScroll: clientHeight => dispatch(preserveScroll(clientHeight)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MoviesContainer);
