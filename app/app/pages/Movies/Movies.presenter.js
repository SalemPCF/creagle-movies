/* eslint-disable no-underscore-dangle */
/* Node */
import React, { forwardRef } from 'react';
import { Grid } from 'react-virtualized';

/* Relative */
import propTypes from './Movies.propTypes';
import Movie from './components/Movie';

const MoviesPresenter = forwardRef(({
    grid,
    movies,
    onScroll,
    getScrollPosition,
    saveScrollPosition,
}, ref) => (
    // We pass most props down to the Grid, which
    // handles all sizing and positioning for us
    <Grid
        ref={ref}
        onScroll={onScroll}
        columnCount={grid.columnCount}
        columnWidth={grid.columnWidth}
        rowCount={grid.rowCount}
        rowHeight={grid.rowHeight}
        height={grid.height}
        width={grid.width}

        // This is used to render each cell
        cellRenderer={({ columnIndex, rowIndex, style, key }) => {
            // We find the movie for this cell
            const movie = movies[columnIndex + (rowIndex * grid.columnCount)];

            // If we have a movie, we need to render it,
            // but because react-virtualized doesn't know
            // that we don't have enough movies to perfectly
            // fill the Grid, we need to render a div in
            // its place to complete the Grid.
            return movie ? (
                <Movie
                    key={movie._id}
                    style={style}
                    movie={movie}
                    getScrollPosition={getScrollPosition}
                    saveScrollPosition={saveScrollPosition}
                />
            ) : (
                <div key={key} style={style} />
            );
        }}
    />
));

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
