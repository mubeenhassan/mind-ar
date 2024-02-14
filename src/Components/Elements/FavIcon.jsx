import React, { useEffect, useState } from "react";
const FavIcon = ({ id, targetId, toggleSave }) => {
  const [fav, setFav] = useState(false);

  const handleFavClick = () => {
    toggleSave(id);
    isFav();
  };
  const isFav = () => {
    const existingFav = JSON.parse(localStorage.getItem("savedDataNew")) ?? [];
    const existingIndex = existingFav.findIndex(
      (item) => item.markerID === targetId
    );
    if (
      existingIndex !== -1 &&
      existingFav[existingIndex].slideIDs.includes(id)
    ) {
      setFav(true);
    } else {
      setFav(false);
    }
  };

  useEffect(() => {
    isFav();
  }, []);
  return (
    <div className="star-icon" onClick={handleFavClick}>
      {fav ? (
        <img src="/images/icon/star.svg" />
      ) : (
        <img src="/images/icon/star_inactive.svg" />
      )}
    </div>
  );
};

export default FavIcon;
