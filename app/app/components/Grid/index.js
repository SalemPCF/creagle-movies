import React, { Component, createRef } from 'react';
import { Grid as VirtualizedGrid } from 'react-virtualized';

import propTypes from './propTypes';

/**
 * Planned usage:
 *
 * <Grid
 *   items={movies}
 *   loadMore={loadMovies}
 *   renderItem={() => ()}
 * />
 */

class Grid extends Component {
    static propTypes = propTypes;

    /**
     * Ref to the underlying grid.
     */
    grid = createRef();

    handleScroll = (event) => {
        const { loadMore, onScroll } = this.props;
        const { scrollHeight, scrollTop, clientHeight } = event;

        const distanceToBottom = scrollHeight - scrollTop;

        // If we're close to the bottom of the page, and we have a
        // loadMore function, fire it.
        if (distanceToBottom <= (clientHeight + 250) && loadMore) {
            loadMore();
        }

        // If the user provided an onScroll handler,
        // then fire it with the same event we had.
        if (onScroll) {
            onScroll(event);
        }
    }

    scrollTo = (scrollTop) => {
        this.grid.current.scrollToPosition({ scrollTop });
    }

    /**
     * Determines the number of columns to show.
     * Can be overriden by this.props.getColumnCount.
     *
     * @param {int} width - The current width of the grid.
     * @returns {int} - How many columns to show.
     */
    getColumnCount = (width) => {
        const { getColumnCount } = this.props;

        if (getColumnCount) {
            return getColumnCount(width);
        }

        if (width <= 525) return 2;
        if (width <= 960) return 4;
        if (width <= 1392) return 5;

        return 10;
    }

    /**
     * Determines the height of each row.
     * Can be overriden by this.props.getCellHeight.
     *
     * @param {int} width - The width of a column.
     * @returns {int} - The height of the cell.
     */
    getCellHeight = (width) => {
        const { getCellHeight } = this.props;

        if (getCellHeight) {
            return getCellHeight(width);
        }

        // There's no math we could possibly do here,
        // so we just go for an aspect ratio.
        return Math.round(width * 1.66);
    }

    /**
     * Gets all the necessary data for the grid.
     *
     * @returns {object}
     */
    getGridData = () => {
        const { items, width, height } = this.props;

        const data = { width, height };

        // We need to figure out how many columns we want
        data.columnCount = this.getColumnCount(width);

        // To determine the width of each column, we take the entire
        // width of the container, subtract the width of the scrollbar,
        // and then divide that by how many columns there are.
        data.columnWidth = data.width / data.columnCount;

        // We decide on a cell height using the width.
        data.rowHeight = this.getCellHeight(data.columnWidth);

        // The amount of rows we need is the amount of movies we have,
        // divided by the amount of columns we have, rounded up to ensure
        // every movie is fit in on the end.
        data.rowCount = Math.ceil(items.length / data.columnCount);

        return data;
    }

    /**
     * Gets the key for the given item. Attempts
     * to get the key from this.props.getKey, but
     * falls back to the key given to us by react-virutalized.
     *
     * @param {mixed} item - The item to get a key for
     * @param {string} key - The default fallback key
     */
    getKey = (item, key) => {
        const { getKey } = this.props;

        if (getKey) {
            return getKey(item) || key;
        }

        return key;
    }

    /**
     * Renders a cell.
     *
     * @param {object} obj - Object containing everything we need from react-virualized.
     * @returns {mixed} - React elements to render.
     */
    renderCell = ({ columnIndex, rowIndex, style, key }) => {
        const grid = this.getGridData();
        const { items, renderItem } = this.props;
        const item = items[columnIndex + (rowIndex * grid.columnCount)];

        return (
            <div key={item ? this.getKey(item, key) : key} style={style}>
                {item ? renderItem(item, {
                    // isFirstRow: rowIndex === 0,
                    // isLastRow: rowIndex === (grid.rowCount - 1),
                    // isFirstColumn: columnIndex === 0,
                    // isLastColumn: columnIndex === (grid.columnCount - 1),
                }) : null}
            </div>
        );
    }

    /**
     * Renders the component.
     *
     * @returns {mixed} - React elements
     */
    render () {
        const { className } = this.props;
        const grid = this.getGridData();

        return (
            <VirtualizedGrid
                className={className}
                ref={this.grid}
                onScroll={this.handleScroll}
                columnCount={grid.columnCount}
                columnWidth={grid.columnWidth}
                rowCount={grid.rowCount}
                rowHeight={grid.rowHeight}
                height={grid.height}
                width={grid.width}
                cellRenderer={this.renderCell}
            />
        );
    }
}

export default Grid;
