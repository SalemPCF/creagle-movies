import React, { Component } from 'react';
import WebTorrent from 'webtorrent';

import RemoteContext from '../../components/RemoteContext';
import propTypes from './Movie.propTypes';

import MoviePresenter from './Movie.presenter';

class MovieContainer extends Component {
    static propTypes = propTypes.container;

    static contextType = RemoteContext;

    client = new WebTorrent();

    componentDidMount () {
        const { loadMovie, match } = this.props;

        loadMovie(match.params.id);

        this.client.on('error', (err) => {
            console.log(err);
        });
    }

    startDownload = (e) => {
        e.preventDefault();

        const { movie } = this.props;
        const remote = this.context;

        // TODO: Change the .en key to be either of the options provided under the torrent list.
        this.client.add(movie.torrents.en['1080p'].url, { path: `${remote.app.getPath('temp')}/Creagle Movies` }, (torrent) => {
            const interval = setInterval(() => {
                console.log(`Progress: ${(torrent.progress * 100).toFixed(1)}%`);
            }, 1000);

            torrent.on('error', (error) => {
                console.log(error);

                clearInterval(interval);
            });

            torrent.on('done', () => {
                clearInterval(interval);
            });
        });
    }

    render () {
        const { movie } = this.props;

        return (
            <MoviePresenter
                movie={movie}
                startDownload={this.startDownload}
            />
        );
    }
}

export default MovieContainer;
