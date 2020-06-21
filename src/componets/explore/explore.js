import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import {
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_SEARCH_API_KEY
} from "./../../config";

import InfinityResults from "./infinity-results";
import AmountResults from "./amount-results";
import SearchBox from "./search-box";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

const Explore = ({ onChoose }) => (
  <div style={{ margin: "0 auto 4rem", maxWidth: "1340px" }}>
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure hitsPerPage={16} />
      <div style={{ padding: "1rem 0 3rem" }}>
        <SearchBox />
      </div>
      <AmountResults />
      <InfinityResults minHitsPerPage={16} onChoose={onChoose} />
    </InstantSearch>
  </div>
);

export default Explore;
