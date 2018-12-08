/* Node */
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';

/* Relative */
import { logError, logInfo, logSuccess } from '../../../helpers';
import RemoteContext from '../../components/RemoteContext';
import VideoPresenter from './Video.presenter';
import propTypes from './Video.propTypes';

class Video extends Component {
    static contextType = RemoteContext;

    static propTypes = propTypes.container;

    client = new WebTorrent();

    interval = null;

    componentDidMount () {
        const { loadMovie, match } = this.props;

        loadMovie(match.params.id);

        this.client.on('error', () => {
            logError('There was an error with WebTorrent.');
        });
    }

    startDownload = (e) => {
        e.preventDefault();

        const { movie } = this.props;
        const { quality } = this.state;

        const remote = this.context;

        this.client.add(movie.torrents.en[quality].url, { path: `${remote.app.getPath('temp')}/Creagle Movies` }, (torrent) => {
            const file = torrent.files.find(f => f.name.endsWith('.mp4'));

            file.renderTo('video#movie-player', {}, (error) => {
                if (error) {
                    logError('An error occured while attempting to use the file.renderTo method.');
                }
            });

            this.interval = setInterval(() => {
                logInfo(`Torrent Progress: ${(torrent.progress * 100).toFixed(1)}%`);
            }, 1000);

            torrent.on('error', () => {
                logError('There was an error with this torrent.');

                clearInterval(this.interval);
            });

            torrent.on('done', () => {
                clearInterval(this.interval);
            });
        });
    }

    cancelDownload = () => {
        const { movie } = this.props;
        const { quality } = this.state;

        if (!quality) { return; }

        const magnetUrl = movie.torrents.en[quality].url;
        const torrentExists = !!this.client.get(magnetUrl);

        if (torrentExists) {
            this.client.remove(magnetUrl, (err) => {
                if (err) {
                    logError('There was an error while attempting to remove this torrent.');
                } else {
                    logSuccess('Removed torrent.');
                }

                clearInterval(this.interval);
            });
        }
    }

    render () {
        const { movie } = this.props;

        return (
            <VideoPresenter movie={movie} />
        );
    }
}

export default Video;
