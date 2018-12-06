/* Node */
import { combineReducers } from 'redux';

/* Relative */
import movies from './movies';
import movie from './movie';

export default combineReducers({
    movies,
    movie,
});
