/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadMovies, preserveScroll, loadSearchedMovies, saveMoviesSearch, resetMoviesSearch } from '../../../redux/actions/movies';
import movieSchema from '../../../schemas/movie';
import MoviesContainer from './Movies.container';
import { flatten } from '../../../helpers';

const mapStateToProps = state => ({
    movies: denormalize(
        flatten(Object.values(state.pages.movies.pages)),
        [movieSchema],
        state.entities,
    ),
    searchedMovies: denormalize(
        flatten(Object.values(state.pages.movies.searchPages)),
        [movieSchema],
        state.entities,
    ),
    scrollPosition: state.pages.movies.scrollPosition,
    params: state.pages.movies.params,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
    loadSearchedMovies: () => dispatch(loadSearchedMovies()),
    saveMoviesSearch: params => dispatch(saveMoviesSearch(params)),
    resetMoviesSearch: () => dispatch(resetMoviesSearch()),
    preserveScroll: clientHeight => dispatch(preserveScroll(clientHeight)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MoviesContainer);
