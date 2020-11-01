import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";

const OwnCard = ({ screenshot, title, lastUpdate, onClick }) => {
  const handleClick = ev => {
    ev.preventDefault();
    onClick();
  };
  return (
    <a href="#" className="hb-card" onClick={handleClick}>
      <div className="hb-card__header">
        <img src={screenshot} alt="" width="305" height="176" />
      </div>
      <div className="hb-card__body">
        <div className="hb-card__title">{title}</div>
        <div className="hb-author"><TimeAgo date={lastUpdate._seconds * 1000} /></div>
      </div>
    </a>
  );
};

export default OwnCard;


OwnCard.propTypes = {
  title: PropTypes.string.isRequired,
  lastUpdate: PropTypes.shape({
      _seconds: PropTypes.number.isRequired,
      _nanoseconds: PropTypes.number.isRequired
    }),
  screenshot: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
