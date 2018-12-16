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
    SEARCH: {
        SAVE: 'MOVIES:SEARCH:SAVE',
        RESET: 'MOVIES:SEARCH:RESET',
    },
};

const loadMoviesInitial = () => ({ type: MOVIES.LOAD.INITIAL });

const loadMoviesSuccess = (data, page, hasMore) => ({
    type: MOVIES.LOAD.SUCCESS,
    payload: {
        data,
        page,
        hasMore,
    },
});

const loadMoviesFailure = () => ({ type: MOVIES.LOAD.FAILURE });

export const loadMovies = () => async (dispatch, getState, { api }) => {
    const { movies } = getState().pages;
    const { params, hasMore } = movies;

    // If we're loading or the previous request returned no data,
    // We don't want to send another request.
    if (movies.loading || !hasMore) { return; }

    dispatch(loadMoviesInitial());

    const page = movies.page + 1;

    api.get(`/movies/${page}`, { params })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [movieSchema]);

            const hasMoreData = data.length > 0;

            dispatch(loadMoviesSuccess(normalized, page, hasMoreData));
        })
        .catch(() => {
            logError('There was a problem loading movies.');

            dispatch(loadMoviesFailure());
        });
};

export const preserveScroll = scrollPosition => ({
    type: MOVIES.SCROLL,
    payload: { scrollPosition },
});

export const saveMoviesSearch = params => ({
    type: MOVIES.SEARCH.SAVE,
    payload: {
        params,
    },
});

export const resetMoviesSearch = () => ({ type: MOVIES.SEARCH.RESET });
