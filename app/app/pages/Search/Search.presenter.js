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
        <h1 className={css(styles.header)}>{`Searching ${type}`}</h1>

        <div className={css(styles.inputContainer)}>
            <input type="text" onChange={e => handleGeneric('keywords', e)} value={keywords} className={css(styles.input)} />
            <label className={css(styles.label)}>Name</label>
        </div>

        <button type="submit" onClick={() => handleSubmit(false)}>
            {`Find me ${type}!`}
        </button>

        <button type="submit" onClick={() => handleSubmit(true)}>
            {`Reset ${type} search`}
        </button>
    </div>
);

SearchPresenter.propTypes = propTypes.presenter;

export default SearchPresenter;
