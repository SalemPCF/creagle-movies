/* Node */
import { connect } from 'react-redux';

/* Relative */
import { loadMovies, resetMoviesSearch, saveMoviesSearch } from '../../../redux/actions/movies';
import { loadShows } from '../../../redux/actions/shows';
import SearchContainer from './Search.container';

const mapStateToProps = state => ({
    params: state.pages.movies.params,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
    saveMoviesSearch: params => dispatch(saveMoviesSearch(params)),
    resetMoviesSearch: () => dispatch(resetMoviesSearch()),
    loadShows: () => dispatch(loadShows()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchContainer);
