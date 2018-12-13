/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadShows, preserveScroll } from '../../../redux/actions/shows';
import showSchema from '../../../schemas/show';
import ShowsContainer from './Shows.container';
import { flatten } from '../../../helpers';

const mapStateToProps = state => ({
    shows: denormalize(
        flatten(Object.values(state.pages.shows.pages)),
        [showSchema],
        state.entities,
    ),
    scrollPosition: state.pages.shows.scrollPosition,
});

const mapDispatchToProps = dispatch => ({
    loadShows: () => dispatch(loadShows()),
    preserveScroll: clientHeight => dispatch(preserveScroll(clientHeight)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowsContainer);
