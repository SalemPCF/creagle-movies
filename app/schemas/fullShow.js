/* Node */
import { schema } from 'normalizr';
import episodeSchema from './episode';

const fullShowSchema = new schema.Entity('fullShows', {
    episodes: [episodeSchema],
}, {
    idAttribute: '_id',
});

export default fullShowSchema;
