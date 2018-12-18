/* Node */
import { connect } from 'react-redux';

/* Relative */
import { loadShow, unloadShow } from '../../../redux/actions/show';
import ShowsContainer from './Show.container';

const mapStateToProps = state => ({
    show: state.pages.show.data,
});

const mapDispatchToProps = dispatch => ({
    loadShow: id => dispatch(loadShow(id)),
    unloadShow: () => dispatch(unloadShow()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowsContainer);
