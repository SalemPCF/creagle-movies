/* Node */
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';

/* Relative */
import { logError, logInfo, logSuccess } from '../../../helpers';
import RemoteContext from '../../components/RemoteContext';
import VideoPresenter from './Video.presenter';
import propTypes from './Video.propTypes';

class Video extends Component {
    constructor (props) {
        super(props);

        this.state = {
            url: decodeURIComponent(props.match.params.url),
            background: decodeURIComponent(props.match.params.background),
            status: 'Initializing...',
            started: false,
        };
    }

    static contextType = RemoteContext;

    static propTypes = propTypes.container;

    client = new WebTorrent();

    progressInterval = null;

    componentDidMount () {
        const { match: { params: { type } } } = this.props;

        this.client.on('error', () => {
            logError(`There was an error loading this ${type}`);
        });

        window.addEventListener('keydown', this.handleKeyEvent);

        this.startDownload();
    }

    componentWillUnmount () {
        this.cancelDownload();

        clearInterval(this.progressInterval);

        window.removeEventListener('keydown', this.handleKeyEvent);
    }

    handleKeyEvent = (e) => {
        // If we're pressing space
        if (e.which === 32) {
            this.togglePlay();
        }
    }

    startDownload = () => {
        const { url } = this.state;
        const remote = this.context;

        this.setState({ status: 'Starting Download...' }, () => {
            this.client.add(url, { path: `${remote.app.getPath('temp')}/Creagle Movies` }, (torrent) => {
                const element = document.getElementById('movie-player');
                const file = torrent.files.find(f => f.name.endsWith('.mp4') || f.name.endsWith('mkv'));

                if (!file) {
                    this.setState({ status: 'An error occured - ERR_FORMAT_NOT_SUPPORTED' });

                    return;
                }

                file.renderTo('video#movie-player', {}, (error) => {
                    if (error) {
                        logError('An error occured while attempting to use the file.renderTo method.');
                    }
                });

                this.progressInterval = setInterval(() => this.logProgress(
                    element,
                    (torrent.progress * 100).toFixed(1),
                ), 1000);

                torrent.on('error', () => {
                    logError('There was an error with this torrent.');

                    clearInterval(this.progressInterval);
                });

                torrent.on('done', () => {
                    clearInterval(this.progressInterval);
                });
            });
        });
    }

    logProgress = (element, progress) => {
        const { started } = this.state;

        logInfo(`Torrent Progress: ${progress}%`);

        // 4 - HAVE_ENOUGH_DATA
        if (element.readyState === 4 && !started) {
            this.setState({ status: 'Ready', started: true });
        }
    }

    cancelDownload = () => {
        const { started, url } = this.state;

        if (!started) { return; }

        const torrentExists = !!this.client.get(url);

        if (torrentExists) {
            this.client.remove(url, err => (
                err
                    ? logError('There was an error while attempting to remove this torrent.')
                    : logSuccess('Removed torrent.')
            ));
        }
    }

    togglePlay = () => {
        const element = document.getElementById('movie-player');

        element[element.paused ? 'play' : 'pause']();
    }

    render () {
        const { status, background } = this.state;

        return <VideoPresenter background={background} status={status} togglePlay={this.togglePlay} />;
    }
}

export default Video;
