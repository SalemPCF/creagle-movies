import React from 'react';
import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import RoundPlayArrow from 'react-md-icon/dist/RoundPlayArrow';
import RoundArrowDropDown from 'react-md-icon/dist/RoundArrowDropDown';

import styles from './styles';

class WatchButton extends React.Component {
    state = { expanded: false }

    toggleMenu = (e) => {
        e.preventDefault();

        this.setState(prev => ({ expanded: !prev.expanded }));
    }

    render () {
        const { movie, resolution, primary } = this.props;

        return (
            <div className={css(styles.container, primary && styles.container_primary)}>
                <Link to={`/movies/${movie._id}/watch?resolution=${resolution}`} className={css(styles.button)}>
                    <RoundPlayArrow className={css(styles.playIcon)} />
                    <span>Watch Now</span>
                </Link>

                <a href="#" onClick={this.toggleMenu} className={css(styles.dropDownContainer)}>
                    <RoundArrowDropDown className={css(styles.dropDown, primary && styles.dropDown_primary)} />
                </a>
            </div>
        );
    }
}

export default WatchButton;
