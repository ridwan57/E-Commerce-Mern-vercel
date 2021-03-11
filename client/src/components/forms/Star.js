
import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ numberOfStars }) => (
    <>
        <StarRating

            numberOfStars={numberOfStars}
            starDimension="20px"
            starSpacing="2px"
            starHoverColor="red"
            starEmptyColor="red"
        />
        <br />
    </>
);

export default Star;