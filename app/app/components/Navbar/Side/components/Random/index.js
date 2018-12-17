/* Node */
import TwotoneAllInclusive from 'react-md-icon/dist/TwotoneAllInclusive';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import { logError } from '../../../../../../helpers';
import { api } from '../../../../../../services/api';
import propTypes from './propTypes';
import styles from '../../styles';

class RandomIcon extends Component {
    static propTypes = propTypes;

    handleClick = () => {
        const { location, history } = this.props;

        const type = location.pathname === '/shows' ? 'show' : 'movie';

        api.get(`/random/${type}`)
            .then(res => res.data)
            .then((data) => {
                history.push(`/${type}s/${data._id}`);
            })
            .catch(() => {
                logError(`There was a problem loading this ${type}.`);
            });
    }

    shouldRender = () => {
        const { location } = this.props;

        const allowed = ['/', '/shows'];

        return allowed.includes(location.pathname);
    }

    render () {
        if (!this.shouldRender()) { return null; }

        return (
            <div className={css(styles.icon)} onClick={this.handleClick} title="Random">
                <TwotoneAllInclusive />
            </div>
        );
    }
}

export default withRouter(RandomIcon);
