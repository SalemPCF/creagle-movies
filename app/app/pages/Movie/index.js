import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WebTorrent from 'webtorrent';
import { remote } from 'electron';

import { movieShape } from './shape';

class Movie extends Component {
    client = new WebTorrent();

    componentDidMount () {
        const { loadMovie, id } = this.props;

        loadMovie(id);

        this.client.on('error', (error) => {
            console.log(error);
        });
    }

    static propTypes = movieShape;

    handleClick = (e) => {
        e.preventDefault();

        const { movie } = this.props;

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
            <div className="movie-container">
                <img className="movie-background" src={movie ? movie.images.fanart : null} alt="" />

                <div className="movie-background-overlay" />

                <div className="movie-inner-container">
                    {/* TODO: Change these styles and text to a close/back icon */}
                    <Link to="/" style={{ color: 'white', margin: '5px', lineHeight: '25px' }}>Go Back</Link>

                    <button type="submit" onClick={this.handleClick}>press me</button>

                    {movie ? (
                        <div className="movie-inner-container" />
                    ) : (
                        // TODO: Change this to a spinner
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Movie;
