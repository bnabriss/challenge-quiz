import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  progress: {
    height: 20,
    background: '#e0e0e0',
    position: 'relative'
  },
  progressBar: {
    height: 20,
    background: '#e0e0e0',
    position: 'absolute',
    left: 0,
    top: 0,
    transition : 'width .2s'
  }
}));

const StackProgress = ({stacks}) => {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      {stacks.map((stack, key) => (
        <div className={classes.progressBar} key={key} style={{ width: stack.value + '%', background: stack.color }} ></div>
      ))}
    </div>
);
}

export default StackProgress;