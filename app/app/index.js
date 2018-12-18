/* Node */
import { connect } from 'react-redux';

/* Relative */
import { loadMovies } from '../redux/actions/movies';
import { loadShows } from '../redux/actions/shows';
import App from './App';

const mapStateToProps = state => ({
    // We can safely assume that if the current page for both movies and shows
    // is 0, no data has been loaded yet.
    initiating: state.pages.movies.page === 0 && state.pages.shows.page === 0,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
    loadShows: () => dispatch(loadShows()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
