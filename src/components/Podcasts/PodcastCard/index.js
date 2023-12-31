import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function PodcastCard({ id, title, displayImage, createdBy }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} />
        <p className="title-podcast">{title}</p>
        <p className="createdBy-podcast">Created By:- {createdBy}</p>
      </div>
    </Link>
  );
}

export default PodcastCard;
