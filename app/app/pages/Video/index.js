/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadMovie } from '../../../redux/actions/movie';
import { loadShow } from '../../../redux/actions/show';
import fullShowSchema from '../../../schemas/fullShow';
import movieSchema from '../../../schemas/movie';
import VideoContainer from './Video.container';

const mapStateToProps = state => ({
    movie: state.pages.movie.id ? denormalize(
        state.pages.movie.id,
        movieSchema,
        state.entities,
    ) : null,
    show: state.pages.show.id ? denormalize(
        state.pages.show.id,
        fullShowSchema,
        state.entities,
    ) : null,
});

const mapDispatchToProps = dispatch => ({
    loadMovie: id => dispatch(loadMovie(id)),
    loadShow: id => dispatch(loadShow(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoContainer);
