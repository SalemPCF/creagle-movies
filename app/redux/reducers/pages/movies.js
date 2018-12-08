/* Relative */
import { MOVIES } from '../../actions/movies';
import { flatten } from '../../../helpers';

const initialState = {
    loading: false,
    page: 0,
    pages: {},
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

        case MOVIES.LOAD.SUCCESS:
            return {
                ...state,
                loading: false,
                page: action.payload.page,
                pages: {
                    ...state.pages,
                    [action.payload.page]: action.payload.data.result.filter(
                        id => !flatten(
                            Object.values(
                                state.pages,
                            ),
                        ).includes(id),
                    ),
                },
            };

        default:
            return state;
    }
};

export default moviesReducer;
