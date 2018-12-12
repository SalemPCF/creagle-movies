/* Node */
import OutlineSettings from 'react-md-icon/dist/OutlineSettings';
import TwotoneSettings from 'react-md-icon/dist/TwotoneSettings';
import OutlineLiveTv from 'react-md-icon/dist/OutlineLiveTv';
import OutlineMovie from 'react-md-icon/dist/OutlineMovie';
import TwotoneMovie from 'react-md-icon/dist/TwotoneMovie';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
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
                return true;

            // Anywhere else: No.
            default:
                return false;
        }
    }

    renderMovieIcon = () => {
        const { location } = this.props;

        const Icon = location.pathname === '/' ? TwotoneMovie : OutlineMovie;

        return <Icon className={css(styles.icon)} />;
    }

    renderTvIcon = () => {
        const { location } = this.props;

        const Icon = location.pathname === '/shows' ? TwotoneMovie : OutlineLiveTv;

        return <Icon className={css(styles.icon)} />;
    }

    renderSettingsIcon = () => {
        const { location } = this.props;

        const Icon = location.pathname === '/settings' ? TwotoneSettings : OutlineSettings;

        return <Icon className={css(styles.icon, styles.bottom)} />;
    }

    render () {
        if (!this.shouldRender()) { return null; }

        return (
            <div className={css(styles.container)}>
                {this.renderMovieIcon()}
                {this.renderTvIcon()}
                {this.renderSettingsIcon()}
            </div>
        );
    }
}

export default withRouter(Navbar);
