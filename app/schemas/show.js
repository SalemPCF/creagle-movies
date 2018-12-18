/* Node */
import { schema } from 'normalizr';

const showSchema = new schema.Entity('shows', {}, {
    idAttribute: '_id',
});

export default showSchema;
