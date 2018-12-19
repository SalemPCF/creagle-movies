/* Relative */
import { SHOWS } from '../../actions/shows';
import { SHOW } from '../../actions/show';

const showsReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOWS.LOAD.SUCCESS:
        case SHOW.LOAD.SUCCCESS:
            return {
                ...state,
                ...action.payload.data.entities.shows,
            };

        default:
            return state;
    }
};

export default showsReducer;
