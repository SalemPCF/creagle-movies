/* Relative */
import { MOVIE } from '../../actions/movie';

const initialState = {
    loading: false,
    id: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE.LOAD.INITIAL:
            return {
                ...state,
                loading: true,
            };

        case MOVIE.LOAD.CACHED:
            return {
                ...state,
                loading: false,
                id: action.payload.id,
            };

        case MOVIE.LOAD.SUCCESS:
            return {
                ...state,
                loading: false,
                id: action.payload.data.result,
            };

        default:
            return state;
    }
};

export default movieReducer;
