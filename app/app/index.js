/* Node */
import { connect } from 'react-redux';

/* Relative */
import { loadMovies } from '../redux/actions/movies';
import App from './App';

const mapStateToProps = state => ({
    // We can safely assume that if the current
    // page is 0, then nothing has loaded.
    initiating: state.pages.movies.page === 0,
});

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
