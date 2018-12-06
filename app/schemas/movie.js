/* Node */
import { schema } from 'normalizr';

const movieSchema = new schema.Entity('movies', {}, {
    idAttribute: '_id',
});

export default movieSchema;
