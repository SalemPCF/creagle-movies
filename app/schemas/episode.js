/* Node */
import { schema } from 'normalizr';

const episodeSchema = new schema.Entity('episodes', {}, {
    idAttribute: 'tvdb_id',
});

export default episodeSchema;
