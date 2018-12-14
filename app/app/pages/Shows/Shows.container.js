/* Node */
import React, { Component } from 'react';

/* Relative */
import propTypes from './Shows.propTypes';

// NOTE: This component will work the EXACT same way as the Movies component works.
// Therefore, the Grid logic will need to be seperated out so we can reuse it here.
class ShowsContainer extends Component {
    static propTypes = propTypes.container;

    componentDidMount = () => {
        const { shows } = this.props;
    }

    render () {
        return (
            <p>TV Show page</p>
        );
    }
}

export default ShowsContainer;
