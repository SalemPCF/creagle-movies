/* Node */
import React, { Component } from 'react';

/* Relative */
import ShowPresenter from './Show.presenter';
import propTypes from './Show.propTypes';

class ShowContainer extends Component {
    static propTypes = propTypes.container;

    componentDidMount = () => {
        const { loadShow, match } = this.props;

        loadShow(match.params.id);
    }

    componentWillUnmount = () => {
        const { unloadShow } = this.props;

        unloadShow();
    }

    render () {
        const { show } = this.props;

        return (
            <ShowPresenter
                show={show}
            />
        );
    }
}

export default ShowContainer;
