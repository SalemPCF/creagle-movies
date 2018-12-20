/* Node */
import { denormalize } from 'normalizr';
import { connect } from 'react-redux';

/* Relative */
import { loadShow, unloadShow } from '../../../redux/actions/show';
import fullShowSchema from '../../../schemas/fullShow';
import ShowsContainer from './Show.container';

const mapStateToProps = state => ({
    show: state.pages.show.id ? denormalize(
        state.pages.show.id,
        fullShowSchema,
        state.entities,
    ) : null,
});

const mapDispatchToProps = dispatch => ({
    loadShow: id => dispatch(loadShow(id)),
    unloadShow: () => dispatch(unloadShow()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowsContainer);
