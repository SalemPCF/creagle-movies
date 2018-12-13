/* Node */
import { normalize } from 'normalizr';

/* Relative */
import showSchema from '../../schemas/show';
import { logError } from '../../helpers';

export const SHOW = {
    LOAD: {
        INITIAL: 'SHOW:LOAD:INITIAL',
        SUCCESS: 'SHOW:LOAD:SUCCESS',
        FAILURE: 'SHOW:LOAD:FAILURE',
        CACHED: 'SHOW:LOAD:CACHED',
    },
};

const loadShowInitial = () => ({ type: SHOW.LOAD.INITIAL });

const loadShowCached = id => ({
    type: SHOW.LOAD.CACHED,
    payload: { id },
});

const loadShowSuccess = data => ({
    type: SHOW.LOAD.SUCCESS,
    payload: { data },
});

const loadShowFailure = () => ({ type: SHOW.LOAD.FAILURE });

export const loadShow = id => (dispatch, getState, { api }) => {
    dispatch(loadShowInitial());

    const { shows } = getState().entities;

    if (shows[id]) {
        dispatch(loadShowCached(id));
    } else {
        api.get(`/show/${id}`)
            .then(res => res.data)
            .then((data) => {
                const normalized = normalize(data, showSchema);

                dispatch(loadShowSuccess(normalized));
            })
            .catch(() => {
                logError('There was a problem loading this show.');

                dispatch(loadShowFailure());
            });
    }
};
