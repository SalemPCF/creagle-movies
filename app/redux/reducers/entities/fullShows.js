/* Relative */
import { SHOW } from '../../actions/show';

const fullShowsReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW.LOAD.SUCCESS:
            return {
                ...state,
                ...action.payload.data.entities.fullShows,
            };

        default:
            return state;
    }
};

export default fullShowsReducer;
