/* Node */
import OutlineSettings from 'react-md-icon/dist/OutlineSettings';
import TwotoneSettings from 'react-md-icon/dist/TwotoneSettings';
import OutlineLiveTv from 'react-md-icon/dist/OutlineLiveTv';
import TwotoneLiveTv from 'react-md-icon/dist/TwotoneLiveTv';
import TwotoneSearch from 'react-md-icon/dist/TwotoneSearch';
import OutlineMovie from 'react-md-icon/dist/OutlineMovie';
import TwotoneMovie from 'react-md-icon/dist/TwotoneMovie';
import { withRouter, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import RandomIcon from './components/Random';
import propTypes from './propTypes';
import styles from './styles';

class SideNavbar extends Component {
    static propTypes = propTypes;

    shouldRender = () => {
        const { location } = this.props;

        const showOn = ['/', '/shows', '/settings', '/search/movie', '/search/show', '/random/show', '/random/movie'];

        return showOn.includes(location.pathname);
    }

    renderIcon = (pathname, activeComponent, inactiveComponent, title, pushToBottom = false) => {
        const { location } = this.props;

        const Icon = location.pathname === pathname ? activeComponent : inactiveComponent;

        return (
            <Link
                to={pathname}
                className={css(styles.icon, pushToBottom && styles.bottom)}
                title={title}
            >
                <Icon />
            </Link>
        );
    }

    shouldRenderSearch = () => {
        const { location } = this.props;

        const allowed = ['/', '/shows', '/search/movie', '/search/show'];

        return allowed.includes(location.pathname);
    }

    render () {
        const { location } = this.props;

        if (!this.shouldRender()) { return null; }

        return (
            <div className={css(styles.container)}>
                {this.renderIcon('/', TwotoneMovie, OutlineMovie, 'Movies')}
                {this.renderIcon('/shows', TwotoneLiveTv, OutlineLiveTv, 'Shows')}

                {this.shouldRenderSearch()
                    ? this.renderIcon(`/search${location.pathname === '/shows' ? '/show' : '/movie'}`, TwotoneSearch, TwotoneSearch, 'Search')
                    : null}

                <RandomIcon />

                {this.renderIcon('/settings', TwotoneSettings, OutlineSettings, 'Settings', true)}
            </div>
        );
    }
}

export default withRouter(SideNavbar);
