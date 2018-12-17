/* Node */
import { connect } from 'react-redux';

/* Relative */
import { loadMovies, resetMoviesSearch, saveMoviesSearch } from '../../../redux/actions/movies';
import { loadShows, resetShowsSearch, saveShowsSearch } from '../../../redux/actions/shows';
import SearchContainer from './Search.container';

const mapStateToProps = state => ({
    params: state.pages.movies.params,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
    saveMoviesSearch: params => dispatch(saveMoviesSearch(params)),
    resetMoviesSearch: () => dispatch(resetMoviesSearch()),
    loadShows: () => dispatch(loadShows()),
    saveShowsSearch: params => dispatch(saveShowsSearch(params)),
    resetShowsSearch: () => dispatch(resetShowsSearch()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchContainer);
