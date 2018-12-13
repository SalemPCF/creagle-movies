/* Relative */
import { SHOW } from '../../actions/show';

const initialState = {
    loading: false,
    id: null,
};

const showReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW.LOAD.INITIAL:
            return {
                ...state,
                loading: true,
            };

        case SHOW.LOAD.CACHED:
            return {
                ...state,
                loading: false,
                id: action.payload.id,
            };

        case SHOW.LOAD.SUCCESS:
            return {
                ...state,
                loading: false,
                id: action.payload.data.result,
            };

        default:
            return state;
    }
};

export default showReducer;
