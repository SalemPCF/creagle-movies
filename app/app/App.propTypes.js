/* Node */
import PropTypes from 'prop-types';
import { remote } from 'electron';

export default {
    initiating: PropTypes.bool.isRequired,
    remote: PropTypes.oneOf([remote]).isRequired,
};
