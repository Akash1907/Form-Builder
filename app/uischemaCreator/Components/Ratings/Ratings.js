import React, { useState } from 'react';
import './Ratings.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Ratings = ({ defaultValue = 1, disabled = false, label }) => {
  const [rating, setRating] = useState(defaultValue);

  const handleClick = (index) => {
    if (!disabled) {
      setRating(index + 1);
    }
  };

  return (
    <div className="ui-rating">
      {label && <p style = {{fontSize: '10px'}}>{label}</p>}
      {/* <p>AKashhhhh</p> */}
      <div>
        {[...Array(5)].map((_, i) => (
          i < rating ? <StarRoundedIcon onClick = {() => handleClick(i)}  style={{ color: "#FFBE09", fontSize: "30px" }}/> : <StarOutlineRoundedIcon onClick = {() => handleClick(i)} style={{ color: "#FFBE09",fontSize: "30px" }} />
        ))}
      </div>
    </div>
  );
};

export default Ratings;
