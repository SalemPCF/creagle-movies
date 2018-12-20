/* Node */
import { combineReducers } from 'redux';

/* Relative */
import movies from './movies';
import shows from './shows';
import fullShows from './fullShows';
import episodes from './episodes';

export default combineReducers({
    movies,
    shows,
    fullShows,
    episodes,
});
