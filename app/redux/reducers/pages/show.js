/* Relative */
import { SHOW } from '../../actions/show';

const initialState = {
    loading: false,
    data: null,
};

const showReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW.LOAD.INITIAL:
            return {
                ...state,
                loading: true,
            };

        case SHOW.LOAD.SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };

        case SHOW.LOAD.UNLOAD:
            return {
                ...state,
                loading: false,
                data: null,
            };

        default:
            return state;
    }
};

export default showReducer;
