/* Node */
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import propTypes from './Search.propTypes';
import styles from './Search.styles';

const SearchPresenter = ({
    handleGeneric,
    keywords,
    handleSubmit,
    type,
}) => (
    <div className={css(styles.container)}>
        <div className={css(styles.inputContainer)}>
            <input type="text" onChange={e => handleGeneric('keywords', e.target.value)} value={keywords} className={css(styles.input)} />
            <label className={css(styles.label)}>Name</label>
        </div>

        <button type="submit" onClick={handleSubmit}>
            {`Find me ${type}!`}
        </button>
    </div>
);

SearchPresenter.propTypes = propTypes.presenter;

export default SearchPresenter;
