/* Relative */
import { MOVIES } from '../../actions/movies';
import { flatten } from '../../../helpers';

export const initialState = {
    loading: false,
    page: 0,
    pages: {},
    searchPage: 0,
    searchPages: {},
    scrollPosition: 0,
    params: {
        sort: 'trending',
        order: -1,
        genre: 'all',
        keywords: '',
    },
    hasMore: true,
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIES.LOAD.INITIAL:
            return {
                ...state,
                loading: true,
            };

        case MOVIES.LOAD.FAILURE:
            return {
                ...state,
                loading: false,
            };

        case MOVIES.LOAD.SUCCESS: {
            // Array of all existing IDs
            // pages || searchPages
            const flattened = flatten(Object.values(`${action.payload.type}s`));

            // Array of new IDs. We run it through a set and back to
            // an array to remove any duplicate IDs - just in case.
            const newIds = [...new Set(action.payload.data.result)];

            const page = newIds.filter(id => !flattened.includes(id));

            return {
                ...state,
                loading: false,
                // page || searchPage
                [action.payload.type]: action.payload.page,
                // pages || searchPages
                [`${action.payload.type}s`]: {
                    // ...state['pages'] || ...state['searchPages']
                    ...state[`${action.payload.type}s`],
                    [action.payload.page]: page,
                },
                hasMore: action.payload.hasMore,
            };
        }

        case MOVIES.SCROLL:
            return {
                ...state,
                scrollPosition: action.payload.scrollPosition,
            };

        // When we search for some movies, we'll reset most variables
        // so the app thinks we're starting again but we'll still have our
        // non-searched pages and the current non-searched page
        case MOVIES.SEARCH.SAVE:
            return {
                ...initialState,
                params: action.payload.params,
                pages: state.pages,
                page: state.page,
            };

        case MOVIES.SEARCH.RESET:
            return {
                ...initialState,
                pages: state.pages,
                page: state.page,
            };

        default:
            return state;
    }
};

export default moviesReducer;
