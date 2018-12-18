/* Node */
import { combineReducers } from 'redux';

/* Relative */
import movies from './movies';
import movie from './movie';
import shows from './shows';
import show from './show';

export default combineReducers({
    movies,
    movie,
    shows,
    show,
});
