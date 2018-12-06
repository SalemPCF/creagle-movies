import { normalize } from 'normalizr';
import movieSchema from '../../schemas/movie';

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

    if (moviesPage.loading) return;

    dispatch(loadMoviesInitial());

    const page = moviesPage.page + 1;

    api.get(`/movies/${page}`)
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [movieSchema]);

            dispatch(loadMoviesSuccess(normalized, page));
        })
        .catch((err) => {
            console.dir(err);

            dispatch(loadMoviesFailure());
        });
};
