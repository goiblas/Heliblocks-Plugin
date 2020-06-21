import React, { useEffect, useRef, useCallback } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import Card from "./card";

const InfinityResults = ({ hits, hasMore, refine, onChoose }) => {
  const sentinel = useRef();

  const onSentinelIntersection = useCallback(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore) {
          refine();
        }
      });
    },
    [refine, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onSentinelIntersection);
    return () => observer.disconnect();
  }, [onSentinelIntersection]);

  return (
    <>
      <div className="hb-grid-cards">
        {hits.map(
          ({ title, description, screenshot, objectID, author, source }) => (
            <Card
              key={objectID}
              title={title}
              screenshot={screenshot}
              author={author}
              onClick={() => onChoose(source)}
            />
          )
        )}
      </div>
      <div ref={sentinel} />
    </>
  );
};

InfinityResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired
};

export default connectInfiniteHits(InfinityResults);
