/* Relative */
import { MOVIES } from '../../actions/movies';

const moviesReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIES.LOAD.SUCCESS:
            return {
                ...state,
                ...action.payload.data.entities.movies,
            };

        default:
            return state;
    }
};

export default moviesReducer;
