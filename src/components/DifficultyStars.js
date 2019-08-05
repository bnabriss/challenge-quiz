import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import StarRatings from 'react-star-ratings';

const DifficultyStars = ({level}) => {
  const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#ccc',
    },
    barColorPrimary: {
      backgroundColor: {
        easy: 'green',
        medium: 'orange',
        hard: 'red'
      }[level],
    },
  })(LinearProgress);
  return (
    <StarRatings numberOfStars={3} rating={{ easy: 1, medium: 2, hard: 3 }[level]} />
  );
}

export default DifficultyStars;