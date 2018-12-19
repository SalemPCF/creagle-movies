/* Node */
import { normalize } from 'normalizr';

/* Relative */
import showSchema from '../../schemas/show';
import { logError } from '../../helpers';

export const SHOWS = {
    LOAD: {
        INITIAL: 'SHOWS:LOAD:INITIAL',
        SUCCESS: 'SHOWS:LOAD:SUCCESS',
        FAILURE: 'SHOWS:LOAD:FAILURE',
    },
    SCROLL: 'SHOWS:SCROLL',
    SEARCH: {
        SAVE: 'SHOWS:SEARCH:SAVE',
        RESET: 'SHOWS:SEARCH:RESET',
    },
};

const loadShowsInitial = () => ({ type: SHOWS.LOAD.INITIAL });

const loadShowsSuccess = (data, page, hasMore) => ({
    type: SHOWS.LOAD.SUCCESS,
    payload: {
        data,
        page,
        hasMore,
    },
});

const loadShowsFailure = () => ({ type: SHOWS.LOAD.FAILURE });

export const loadShows = () => async (dispatch, getState, { api }) => {
    const { shows } = getState().pages;
    const { params, hasMore } = shows;

    // If we're loading or the previous request returned no data,
    // We don't want to send another request.
    if (shows.loading || !hasMore) { return; }

    dispatch(loadShowsInitial());

    const page = shows.page + 1;

    api.get(`/shows/${page}`, { params })
        .then(res => res.data)
        .then((data) => {
            const normalized = normalize(data, [showSchema]);

            const hasMoreData = data.length > 0;

            dispatch(loadShowsSuccess(normalized, page, hasMoreData));
        })
        .catch(() => {
            logError('There was a problem loading shows.');

            dispatch(loadShowsFailure());
        });
};

export const preserveScroll = scrollPosition => ({
    type: SHOWS.SCROLL,
    payload: { scrollPosition },
});

export const saveShowsSearch = params => ({
    type: SHOWS.SEARCH.SAVE,
    payload: {
        params,
    },
});

export const resetShowsSearch = () => ({ type: SHOWS.SEARCH.RESET });
