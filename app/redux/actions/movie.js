/* Node */
import { normalize } from 'normalizr';

/* Relative */
import movieSchema from '../../schemas/movie';
import { logError } from '../../helpers';

export const MOVIE = {
    LOAD: {
        INITIAL: 'MOVIE:LOAD:INITIAL',
        SUCCESS: 'MOVIE:LOAD:SUCCESS',
        FAILURE: 'MOVIE:LOAD:FAILURE',
        CACHED: 'MOVIE:LOAD:CACHED',
    },
};

const loadMovieInitial = () => ({ type: MOVIE.LOAD.INITIAL });

const loadMovieCached = id => ({
    type: MOVIE.LOAD.CACHED,
    payload: { id },
});

const loadMovieSuccess = data => ({
    type: MOVIE.LOAD.SUCCESS,
    payload: { data },
});

const loadMovieFailure = () => ({ type: MOVIE.LOAD.FAILURE });

export const loadMovie = id => (dispatch, getState, { api }) => {
    dispatch(loadMovieInitial());

    const { movies } = getState().entities;

    if (movies[id]) {
        dispatch(loadMovieCached(id));
    } else {
        api.get(`/movie/${id}`)
            .then(res => res.data)
            .then((data) => {
                const normalized = normalize(data, movieSchema);

                dispatch(loadMovieSuccess(normalized));
            })
            .catch(() => {
                logError('There was a problem loading this movie.');

                dispatch(loadMovieFailure());
            });
    }
};
