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
    SCROLL: 'MOVIES:SCROLL',
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

const loadMoviesFromServer = async (api, dispatch, page) => {
    api.get(`/movies/${page}`, {
        params: {
            sort: 'trending',
            order: -1,
            genre: 'all',
            keywords: '',
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

export const loadMovies = () => async (dispatch, getState, { api }) => {
    const moviesPage = getState().pages.movies;

    if (moviesPage.loading) { return; }

    dispatch(loadMoviesInitial());

    const page = moviesPage.page + 1;

    // We're sending two requests here. (e.g. page 1 and page 2)
    // This helps keep the app scrolling more fluid because we've got more data
    await loadMoviesFromServer(api, dispatch, page);
    await loadMoviesFromServer(api, dispatch, page + 1);
};

export const preserveScroll = scrollPosition => ({
    type: MOVIES.SCROLL,
    payload: { scrollPosition },
});
