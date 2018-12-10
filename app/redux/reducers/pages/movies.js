/* Relative */
import { MOVIES } from '../../actions/movies';
import { flatten } from '../../../helpers';

const initialState = {
    loading: false,
    page: 0,
    pages: {},
    scrollPosition: 0,
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
            const flattened = flatten(Object.values(state.pages));

            // Array of new IDs. We run it through a set and back to
            // an array to remove any duplicate IDs - just in case.
            const newIds = [...new Set(action.payload.data.result)];

            const page = newIds.filter(id => !flattened.includes(id));

            return {
                ...state,
                loading: false,
                page: action.payload.page,
                pages: {
                    ...state.pages,
                    [action.payload.page]: page,
                },
            };
        }

        case MOVIES.SCROLL:
            return {
                ...state,
                scrollPosition: action.payload.scrollPosition,
            };

        default:
            return state;
    }
};

export default moviesReducer;
