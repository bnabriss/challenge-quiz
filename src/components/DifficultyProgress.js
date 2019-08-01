import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const DifficultyProgress = ({level}) => {
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
    <ColorLinearProgress variant="determinate" value={{ easy: 33, medium: 66, hard: 100 }[level]} />
  );
}

export default DifficultyProgress;