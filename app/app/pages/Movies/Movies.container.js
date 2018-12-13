/* Node */
import React, { Component, createRef } from 'react';

/* Relative */
import { NAVBAR_WIDTH } from '../../../config/globals';
import { debounce } from '../../../helpers/debounce';
import MoviesPresenter from './Movies.presenter';
import propTypes from './Movies.propTypes';

class MoviesContainer extends Component {
    static propTypes = propTypes.container;

    // We reflect window dimensions in state because
    // we want to rerender on resize.
    state = {
        width: window.innerWidth - NAVBAR_WIDTH,
        height: window.innerHeight,
    };

    // Reference to underlying Grid component
    scroller = createRef();

    // eslint-disable-next-line react/destructuring-assignment
    currentScroll = this.props.scrollPosition;

    initialScrollCompleted = false;

    componentDidMount () {
        // If our currentScroll > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved value.
        if (this.currentScroll > 0 && this.scroller.current) {
            const scrollTop = this.currentScroll;

            this.scroller.current.scrollToPosition({ scrollTop });
        }

        // Subscribe to resize event
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount () {
        // Unsubscribe from resize event
        window.removeEventListener('resize', this.handleResize);
    }

    // Resize event handler. Debounced so that the handler
    // only fires once a resize has taken place.
    handleResize = debounce((e) => {
        // Update state to reflect new window sizes
        const width = e.target.innerWidth - NAVBAR_WIDTH;
        const height = e.target.innerHeight;

        this.setState({ width, height });
    }, 250)

    // Handle the list scroll
    handleScroll = (event) => {
        const { loadMovies } = this.props;
        const { scrollHeight, scrollTop, clientHeight } = event;

        const distanceToBottom = scrollHeight - scrollTop;

        if (this.initialScrollCompleted) {
            this.currentScroll = scrollTop;
        }

        // If we're close to the bottom of the page, send out another request and get more content!
        if (distanceToBottom <= (clientHeight + 300)) {
            loadMovies();
        }

        this.initialScrollCompleted = true;
    }

    // Fire a redux event to save the current scroll value
    saveScrollPosition = () => {
        const { preserveScroll } = this.props;

        preserveScroll(this.currentScroll);
    }

    // Get the current scroll position
    getScrollPosition = () => this.currentScroll;

    // Determine how many columns to render
    // for the given width.
    getColumnCount = (w) => {
        if (w <= 525) {
            return 2;
        }

        if (w <= 960) {
            return 4;
        }

        if (w <= 1392) {
            return 5;
        }

        return 10;
    }

    // Calculates the width of a scroll bar on the
    // users system.
    getScrollbarWidth = () => {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.overflow = 'scroll';

        const inner = document.createElement('div');
        inner.style.width = '100%';

        document.body.appendChild(outer);
        outer.appendChild(inner);

        const withoutScroll = outer.offsetWidth;
        const withScroll = inner.offsetWidth;

        document.body.removeChild(outer);

        return withoutScroll - withScroll;
    }

    // Gets data to pass to react-virtualized's Grid component
    getGridData = () => {
        const { movies } = this.props;
        const { width, height } = this.state;
        const scrollbarWidth = this.getScrollbarWidth();

        const data = {};

        // The width & height of the grid should be the entire window
        data.width = width;
        data.height = height;

        // We need to figure out how many columns we want
        data.columnCount = this.getColumnCount(data.width);

        // To determine the width of each column, we divide the entire width
        // by the column count, and subtract an equal share of the scrollbar
        // width from each row, so that everything fits nicely in the viewport,
        // edge to edge.
        data.columnWidth = (data.width / data.columnCount) - (scrollbarWidth / data.columnCount);

        // There's no simple math we can do to get an accurate height,
        // so we just decide on an aspect ratio to use; 1.66:1
        data.rowHeight = Math.round(data.columnWidth * 1.66);

        // The amount of rows we need is the amount of movies we have,
        // divided by the amount of columns we have, rounded up to ensure
        // every movie is fit in on the end.
        data.rowCount = Math.ceil(movies.length / data.columnCount);

        return data;
    };

    render () {
        const { movies } = this.props;

        return (
            <MoviesPresenter
                ref={this.scroller}
                movies={movies}
                saveScrollPosition={this.saveScrollPosition}
                getScrollPosition={this.getScrollPosition}
                grid={this.getGridData()}
                onScroll={this.handleScroll}
            />
        );
    }
}

export default MoviesContainer;
