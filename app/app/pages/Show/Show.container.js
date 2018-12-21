/* Node */
import React, { Component } from 'react';

/* Relative */
import ShowPresenter from './Show.presenter';
import propTypes from './Show.propTypes';

class ShowContainer extends Component {
    state = {
        seasons: {},
        sorted: false,
        selectedSeason: 1,
        synopsisCollapsed: false,
    }

    static propTypes = propTypes.container;

    componentDidMount () {
        const { loadShow, match } = this.props;

        loadShow(match.params.id);
    }

    componentDidUpdate () {
        const { show } = this.props;
        const { sorted } = this.state;

        if (!show || sorted) { return; }

        // Create our seasons array:
        // const seasons = [['episode 1', 'episode 2'], ['episode 1']]
        const seasons = show.episodes.reduce((accumulator, episode) => {
            if (!accumulator[episode.season]) {
                accumulator[episode.season] = [];
            }

            accumulator[episode.season].push(episode);

            return accumulator;
        }, {});

        let firstSeason = null;

        // Let's make sure we've got our episodes in ascending order
        // eslint-disable-next-line no-restricted-syntax
        for (const season in seasons) {
            if (Object.prototype.hasOwnProperty.call(seasons, season)) {
                // Make sure we've got our first season
                if (!firstSeason) { firstSeason = season; }

                seasons[season] = seasons[season].sort((a, b) => a.episode - b.episode);
            }
        }

        this.setState({ seasons, sorted: true, selectedSeason: firstSeason });
    }

    componentWillUnmount () {
        const { unloadShow } = this.props;

        unloadShow();
    }

    getStars = () => {
        const { show } = this.props;

        // Make sure we've got an object to destructure
        if (!show) { return {}; }

        // Get our number of stars to the nearest 0.5
        const numOfFilledStars = Math.round((show.rating.percentage / 20) * 2) / 2;

        return {
            // Check if we should show a half star
            hasHalfStar: numOfFilledStars % 1 === 0.5,
            // Create an array with sizeof(numOfFilledStars)
            filledStars: [...Array(Math.floor(numOfFilledStars)).keys()],
            // Create an array with sizeof(5 - numOfFilledStars)
            emptyStars: [...Array(Math.floor(5 - numOfFilledStars)).keys()],
        };
    }

    getRuntime = () => {
        const { show } = this.props;

        if (!show) { return '0 mins'; }

        const runtime = parseInt(show.runtime, 10);

        const hours = Math.floor(runtime / 60);
        const mins = (runtime % 60);

        return hours ? `${hours}h ${mins}m` : `${mins}m`;
    }

    /**
     * Handles a generic state change
     *
     */
    createGenericHandler = (type, value) => () => this.setState({ [type]: value });

    /**
     * Returns our card height
     *
     */
    getCellHeight = width => Math.round(width * 0.8)

    /**
     * Returns how many cards should be rendered based on our container width
     *
     */
    getColumnCount = (width) => {
        if (width <= 525) return 2;
        if (width <= 960) return 4;

        return 6;
    }

    handleScroll = (event) => {
        const { scrollTop } = event;

        this.setState({ synopsisCollapsed: scrollTop > 50 });
    }

    render () {
        const { show } = this.props;
        const { seasons, selectedSeason, synopsisCollapsed } = this.state;

        return (
            <ShowPresenter
                show={show}
                stars={this.getStars()}
                runtime={this.getRuntime()}
                seasons={seasons}
                selectedSeason={selectedSeason}
                synopsisCollapsed={synopsisCollapsed}
                createGenericHandler={this.createGenericHandler}
                getCellHeight={this.getCellHeight}
                getColumnCount={this.getColumnCount}
                handleScroll={this.handleScroll}
            />
        );
    }
}

export default ShowContainer;
