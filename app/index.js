/* Node */
import React, { Component } from 'react';
import Truncate from 'react-truncate';
import ReactDOM from 'react-dom';

/* Local */
import { api } from './services/api';

class App extends Component {
    constructor () {
        super();

        this.state = {
            page: 1,
            data: [],
        };
    }

    componentDidMount = () => {
        this.getData();
    }

     // Retrieve our data
     getData = () => {
         const { page } = this.state;

         api.get(`/movies/${page}`)
             .then(({ data }) => {
                 this.setState((current) => {
                     const next = { ...current };

                     next.data = next.data.concat(data);

                     return next;
                 });
             })
             .catch((err) => {
                 console.log(err);
             });
     }

    renderItem = (item) => {
        const {
            _id: id, title, year, images, torrents,
        } = item;

        const { poster: image } = images;

        const qualities = Object.keys(torrents.en);

        if (qualities.length < 0) {
            return null;
        }

        return (
            <li key={id} id={id} className="card">
                {qualities.includes('1080p') && (
                    <i className="material-icons hd-icon">hd</i>
                )}

                <img className="card-image" src={image} />

                <div className="card-footer">
                    <p className="text primary">
                        <Truncate lines={1} ellipsis="...">{title}</Truncate>
                    </p>

                    <p className="text secondary">
                        {year}
                    </p>
                </div>
            </li>
        );
    }

    // Update our current API page then load more content
    loadMore = () => {
        this.setState((current) => {
            const next = { ...current };

            next.page += 1;

            return next;
        }, this.getData);
    }

    handleBottomReached = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        // If we're at the bottom of the page, send out another request and get more content!
        if (distanceToBottom === clientHeight) {
            this.loadMore();
        }
    }

    render () {
        const { data } = this.state;

        return (
            <ul className="list" onScroll={this.handleBottomReached}>
                <div className="items">
                    {data.map(this.renderItem)}
                </div>
            </ul>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
