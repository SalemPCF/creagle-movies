/* Node */
import React, { forwardRef } from 'react';
import { css } from 'aphrodite';

/* Relative */
import SizeTracker from '../../components/SizeTracker';
import propTypes from './Movies.propTypes';
import Grid from '../../components/Grid';
import TitleBar from '../../components/TitleBar';
import Movie from './components/Movie';
import styles from './Movies.styles';

const MoviesPresenter = forwardRef(({
    movies,
    loadMore,
    onScroll,
    handleParams,
    keywords,
    isSearching,
    handleKeywords,
    handleSearchClick,
    searchShown,
}, ref) => (
    <div className={css(styles.container)}>
        <TitleBar title="Movies" type="movie" handleSearch={handleSearchClick} />

        <div className={css(styles.searchContainer, searchShown ? null : styles.collapsed)}>
            <div className={css(styles.inputContainer)}>
                <input
                    type="text"
                    onChange={e => handleKeywords(e.target.value)}
                    value={keywords}
                    className={css(styles.input)}
                />
                <label className={css(styles.label, keywords ? styles.labelActive : null)}>Name</label>
            </div>
        </div>

        <SizeTracker className={css(styles.tracker)} key={isSearching}>
            {({ width, height }) => (
                <Grid
                    className={css(styles.grid)}
                    ref={ref}
                    width={width}
                    height={height}
                    items={movies}
                    loadMore={loadMore}
                    onScroll={onScroll}
                    overscan={2}
                    renderItem={movie => (
                        <Movie movie={movie} />
                    )}
                />
            )}
        </SizeTracker>
    </div>
));

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
