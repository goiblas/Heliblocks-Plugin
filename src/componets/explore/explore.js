import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  connectStateResults,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

import { ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME, ALGOLIA_SEARCH_API_KEY} from './../../config';

const searchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY,
);

// https://www.algolia.com/press/?section=brand-guidelines
const Explore = ({ onChoose }) => (
  <div>

    <div className="container">
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <div className="search-panel">
          <div className="search-panel__results">
            <SearchBox
              className="searchbox"
              translations={{
                placeholder: '',
              }}
            />
            <Hits hitComponent={ (props) => <Hit {...props} onChoose={ onChoose } /> }/>
            <ResultNotFound />
            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  </div>
);

const Hit = props => {
  const { title, description, screenshot, tags, objectID, source } = props.hit;
  const onClick = ev => {
    ev.preventDefault();
    props.onChoose(source)
  }
  return (
    <>
    <a href="#" onClick={ onClick } key={ objectID } className="card">
      <div className="card__preview">
      <img src={screenshot} className="card__photo" />
      </div>
      <div className="card__body">
        <div class="card__title">{title}</div>
        <p>{description}</p>
      </div>
    </a>
    </>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

const ResultNotFound = connectStateResults(props => {
  const { searchResults, searchState } = props;

  if (
    searchResults &&
    searchResults.hits.length === 0 &&
    searchState.query !== undefined
  ) {
    return <p>No se han encontrado resutados para {searchState.query}</p>;
  }

  return null;
});

export default Explore;
