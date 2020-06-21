import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import { i18n } from "./../../utils";

const AmountResults = ({ searchResults }) => (
  <div
    style={{ marginBottom: "16px", fontSize: "13px", color: "#555d66" }}
    aria-live="polite"
    aria-atomic="true"
  >
    {searchResults && searchResults.nbHits} {i18n("result found")}
  </div>
);

export default connectStateResults(AmountResults);
