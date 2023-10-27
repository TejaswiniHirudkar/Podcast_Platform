import React from "react";
import PodcastCard from "./PodcastCard" // Assuming you've defined PodcastCard
import { useSelector } from "react-redux";

function UserPodcastGrid({podcasts}) {
  // const podcasts = useSelector((state) => state.podcasts.podcasts);
    console.log(podcasts);
  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          id={podcast.id}
          title={podcast.title}
          displayImage={podcast.displayImage}
        />
      ))}
    </div>
  );
}

export default UserPodcastGrid;
