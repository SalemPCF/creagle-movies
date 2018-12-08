/* Node */
import { normalize } from 'normalizr';

/* Relative */
import movieSchema from '../../schemas/movie';
import { logError } from '../../helpers';

export const MOVIES = {
    LOAD: {
        INITIAL: 'MOVIES:LOAD:INITIAL',
        SUCCESS: 'MOVIES:LOAD:SUCCESS',
        FAILURE: 'MOVIES:LOAD:FAILURE',
    },
};

const loadMoviesInitial = () => ({ type: MOVIES.LOAD.INITIAL });

const loadMoviesSuccess = (data, page) => ({
    type: MOVIES.LOAD.SUCCESS,
    payload: {
        data,
        page,
    },
});

const loadMoviesFailure = () => ({ type: MOVIES.LOAD.FAILURE });

export const loadMovies = () => (dispatch, getState, { api }) => {
    const moviesPage = getState().pages.movies;

    if (moviesPage.loading) { return; }

    dispatch(loadMoviesInitial());

    const page = moviesPage.page + 1;

    api.get(`/movies/${page}`, {
        params: {
            sort: 'trending', order: -1, genre: 'all', keywords: '',
        },
    })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [movieSchema]);

            dispatch(loadMoviesSuccess(normalized, page));
        })
        .catch(() => {
            logError('There was a problem loading movies.');

            dispatch(loadMoviesFailure());
        });
};
