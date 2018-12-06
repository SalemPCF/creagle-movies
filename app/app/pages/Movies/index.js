import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import movieSchema from '../../../schemas/movie';
import { loadMovies } from '../../../redux/actions/movies';
import { flatten } from '../../../helpers/flatten';

import MoviesContainer from './Movies.container';

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
