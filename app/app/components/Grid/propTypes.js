import PropTypes from 'prop-types';

export default {
    // Required
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    // Optional
    loadMore: PropTypes.func,
    getColumnCount: PropTypes.func,
    getCellHeight: PropTypes.func,
    onScroll: PropTypes.func,
    getKey: PropTypes.func,
    overscan: PropTypes.number,
};
