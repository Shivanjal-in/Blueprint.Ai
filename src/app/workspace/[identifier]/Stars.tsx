import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface StarProps {
  rating: number | null;
  setRating: (value: number | null) => void;
}

const Stars: React.FC<StarProps> = ({ rating, setRating }) => {
  return (
    <Box>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </Box>
  );
};



export default Stars;
