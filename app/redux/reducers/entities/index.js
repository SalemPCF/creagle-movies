/* Node */
import { combineReducers } from 'redux';

/* Relative */
import movies from './movies';
import shows from './shows';

export default combineReducers({
    movies,
    shows,
});
