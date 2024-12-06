import React, { useRef, useState } from "react";
import Rating from "./RatingTable/RatingTable";
import "./RatingTable/RatingTable.css";

interface WatchedProps {
  watched: boolean;
  handleWatched: () => void;
}

const Watched = ({ watched, handleWatched }: WatchedProps) => {
  return (
    <>
      <Rating />
    </>
  );
};

export default Watched;
