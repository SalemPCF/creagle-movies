/* Relative */
import { SHOWS } from '../../actions/shows';

const showsReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOWS.LOAD.SUCCESS:
            return {
                ...state,
                ...action.payload.data.entities.shows,
            };

        default:
            return state;
    }
};

export default showsReducer;
