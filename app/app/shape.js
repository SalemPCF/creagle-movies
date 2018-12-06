import PropTypes from 'prop-types';
import { remote } from 'electron';

export const appShape = {
    initiating: PropTypes.bool.isRequired,
    remote: PropTypes.oneOf([remote]).isRequired,
};
