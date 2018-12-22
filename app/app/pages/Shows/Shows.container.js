/* Node */
import React, { Component, createRef } from 'react';

/* Relative */
import ShowsPresenter from './Shows.presenter';
import propTypes from './Shows.propTypes';

class ShowsContainer extends Component {
    static propTypes = propTypes.container;

    scroller = createRef();

    currentScroll = null;

    initialScrollCompleted = false;

    componentDidMount = () => {
        const { scrollPosition } = this.props;

        // Initialize our scrollPosition
        this.currentScroll = scrollPosition;

        // If our currentScroll > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved value.
        if (this.currentScroll > 0 && this.scroller.current) {
            this.scroller.current.scrollTo(this.currentScroll);
        }
    }

    /**
     * Fires a redux action to save the latest scroll position before our component unmounts.
     */
    componentWillUnmount = () => this.saveScrollPosition();

    /**
     * Handles each scroll event by saving the current scroll value.
     *
     * @param {mixed} event - The scroll event
     */
    handleScroll = (event) => {
        const { scrollTop } = event;

        if (this.initialScrollCompleted) {
            this.currentScroll = scrollTop;
        }

        this.initialScrollCompleted = true;
    }

    /**
     * Fires a redux action save the latest scroll position.
     */
    saveScrollPosition = () => {
        const { preserveScroll } = this.props;

        preserveScroll(this.currentScroll);
    }

    handleSearchClick = () => console.log('clicked')

    /**
     * Renders the component.
     *
     * @returns {mixed}
     */
    render () {
        const { shows, loadShows } = this.props;

        return (
            <ShowsPresenter
                ref={this.scroller}
                shows={shows}
                loadMore={loadShows}
                onScroll={this.handleScroll}
                handleSearchClick={this.handleSearchClick}
            />
        );
    }
}

export default ShowsContainer;
