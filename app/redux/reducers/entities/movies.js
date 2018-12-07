/* Relative */
import { MOVIES } from '../../actions/movies';
import { MOVIE } from '../../actions/movie';

const moviesReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIES.LOAD.SUCCESS:
        case MOVIE.LOAD.SUCCESS:
            return {
                ...state,
                ...action.payload.data.entities.movies,
            };

        default:
            return state;
    }
};

export default moviesReducer;
