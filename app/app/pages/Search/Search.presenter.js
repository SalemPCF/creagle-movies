/* Node */
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { capitalize } from '../../../helpers';
import propTypes from './Search.propTypes';
import styles from './Search.styles';

const SearchPresenter = ({
    handleGeneric,
    keywords,
    handleSubmit,
    type,
}) => (
    <div className={css(styles.container)}>
        <Link to="/shows" className={css(styles.closeIcon)}>
            <RoundArrowBack />
        </Link>

        <div className={css(styles.innerContainer)}>
            <h1 className={css(styles.title)}>{`Searching ${capitalize(type)}s`}</h1>

            <div className={css(styles.inputContainer)}>
                <input type="text" onChange={e => handleGeneric('keywords', e.target.value)} value={keywords} className={css(styles.input)} />
                <label className={css(styles.label, keywords ? styles.labelActive : null)}>Name</label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: '100%', alignItems: 'center' }}>
                <div className={css(styles.button)} onClick={() => handleSubmit(false)}>
                    <span>{`Find me ${capitalize(type)}s!`}</span>
                </div>

                <div className={css(styles.button)} onClick={() => handleSubmit(true)}>
                    <span>{`Reset ${capitalize(type)}s search`}</span>
                </div>
            </div>
        </div>
    </div>
);

SearchPresenter.propTypes = propTypes.presenter;

export default SearchPresenter;
