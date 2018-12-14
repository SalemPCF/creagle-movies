/* Node */
import TwotoneAllInclusive from 'react-md-icon/dist/TwotoneAllInclusive';
import OutlineSettings from 'react-md-icon/dist/OutlineSettings';
import TwotoneSettings from 'react-md-icon/dist/TwotoneSettings';
import OutlineLiveTv from 'react-md-icon/dist/OutlineLiveTv';
import TwotoneLiveTv from 'react-md-icon/dist/TwotoneLiveTv';
import TwotoneSearch from 'react-md-icon/dist/TwotoneSearch';
import OutlineSearch from 'react-md-icon/dist/OutlineSearch';
import OutlineMovie from 'react-md-icon/dist/OutlineMovie';
import TwotoneMovie from 'react-md-icon/dist/TwotoneMovie';
import { withRouter, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import { logError } from '../../../helpers';
import { api } from '../../../services/api';
import propTypes from './propTypes';
import styles from './styles';

class Navbar extends Component {
    static propTypes = propTypes;

    shouldRender = () => {
        const { location } = this.props;

        // Should we be showing a navbar?
        switch (location.pathname) {
            // Movies, Tv Shows: Yes.
            case ('/'):
            case ('/shows'):
            case ('/search'):
            case ('/settings'):
                return true;

            // Anywhere else: No.
            default:
                return false;
        }
    }

    renderIcon = (pathname, activeComponent, inactiveComponent, pushToBottom = false) => {
        const { location } = this.props;

        const Icon = location.pathname === pathname ? activeComponent : inactiveComponent;

        return (
            <Link to={pathname} className={css(styles.icon, pushToBottom && styles.bottom)}>
                <Icon />
            </Link>
        );
    }

    handleRandomRedirect = (type) => {
        const { history } = this.props;

        api.get(`/random/${type}`)
            .then(res => res.data)
            .then((data) => {
                history.push(`/${type}s/${data._id}`);
            })
            .catch(() => {
                logError(`There was a problem loading this ${type}.`);
            });
    }

    handleRandomPress = () => {
        const { location } = this.props;

        switch (location.pathname) {
            case ('/'):
                return this.handleRandomRedirect('movie');
            case ('/shows'):
                return this.handleRandomRedirect('show');
            default:
                return console.log('No route matched.');
        }
    }

    renderRandomIcon = () => (
        <TwotoneAllInclusive
            className={css(styles.icon)}
            onClick={this.handleRandomPress}
        />
    )

    render () {
        if (!this.shouldRender()) { return null; }

        return (
            <div className={css(styles.container)}>
                {this.renderIcon('/', TwotoneMovie, OutlineMovie)}
                {this.renderIcon('/shows', TwotoneLiveTv, OutlineLiveTv)}
                {this.renderIcon('/search', TwotoneSearch, OutlineSearch)}

                {this.renderRandomIcon()}

                {this.renderIcon('/settings', TwotoneSettings, OutlineSettings, true)}
            </div>
        );
    }
}

export default withRouter(Navbar);
