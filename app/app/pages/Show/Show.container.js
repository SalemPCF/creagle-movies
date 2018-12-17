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
    }

    static propTypes = propTypes.container;

    componentDidMount = () => {
        const { loadShow, match } = this.props;

        loadShow(match.params.id);
    }

    componentDidUpdate = () => {
        const { show } = this.props;
        const { sorted } = this.state;

        if (!show || sorted) { return; }

        const seasons = {};

        // Start at season 1, end at season {i}
        for (let i = 1; i <= show.num_seasons; i += 1) {
            seasons[i] = [];
        }

        if (show.episodes.length <= 0) { return; }

        // Sort our episodes into the correct season
        show.episodes.forEach((episode) => {
            const { season } = episode;

            seasons[season].push(episode);
        });

        // Make sure our season episodes are in the right order
        Object.values(seasons).forEach((season) => {
            // Remove our season if it doesn't have any episodes
            if (Object.keys(season).length <= 0) {
                seasons[season] = undefined;
            }

            season.sort((current, next) => current.episode - next.episode);
        });

        this.setState({ seasons, sorted: true });
    }

    componentWillUnmount = () => {
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

    render () {
        const { show } = this.props;
        const { seasons, selectedSeason } = this.state;

        return (
            <ShowPresenter
                show={show}
                stars={this.getStars()}
                runtime={this.getRuntime()}
                seasons={seasons}
                selectedSeason={selectedSeason}
            />
        );
    }
}

export default ShowContainer;
