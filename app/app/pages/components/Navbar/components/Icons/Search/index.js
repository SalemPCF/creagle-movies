/* Node */
import TwotoneSearch from 'react-md-icon/dist/TwotoneSearch';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import propTypes from './propTypes';
import styles from '../styles';

class SearchIcon extends Component {
    static propTypes = propTypes;

    render () {
        const { type } = this.props;

        return (
            <Link to={`/search/${type}`} className={css(styles.icon, styles.search)} onClick={this.handleClick} title="Search">
                <TwotoneSearch />
            </Link>
        );
    }
}

export default SearchIcon;
