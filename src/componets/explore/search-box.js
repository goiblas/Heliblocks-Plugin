import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { i18n } from "../../utils";
const SearchBox = ({ currentRefinement, refine, ...props }) => {
  return (
    <div className="hb-search-box">
      <input
        className="hb-search-box__input"
        type="search"
        placeholder={i18n("Introduce id or search... ")}
        value={currentRefinement}
        onChange={e => {
          refine(e.target.value);
        }}
        {...props}
      />
      <div className="hb-search-box__logo">
        <img
          src={hb_assets.algolia}
          width="168"
          height="24"
          alt="Search by Algolia"
        />
      </div>
    </div>
  );
};

export default connectSearchBox(SearchBox);
