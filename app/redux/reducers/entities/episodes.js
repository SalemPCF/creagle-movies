/* Relative */
import { SHOW } from '../../actions/show';

const episodesReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW.LOAD.SUCCESS:
            return {
                ...state,
                ...action.payload.data.entities.episodes,
            };

        default:
            return state;
    }
};

export default episodesReducer;
