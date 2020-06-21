import React from "react";
import PropTypes from "prop-types";

const Card = ({ screenshot, title, author, onClick }) => {
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
        <div className="hb-author">
          <img
            src={author.photoURL}
            width="24"
            height="24"
            alt=""
            className="hb-author__avatar"
          />
          {author.displayName}
        </div>
      </div>
    </a>
  );
};

export default Card;

const AuthorShape = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired
});

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([PropTypes.string, AuthorShape]).isRequired,
  screenshot: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
