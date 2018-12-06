import { connect } from 'react-redux';

import { loadMovies } from '../redux/actions/movies';

import App from './App';

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(loadMovies()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
