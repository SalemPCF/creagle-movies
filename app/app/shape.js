import PropTypes from 'prop-types';
import { remote } from 'electron';

export const appShape = {
    remote: PropTypes.oneOf([remote]).isRequired,
};
