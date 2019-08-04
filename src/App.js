import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import questions from './questions.json';

import StackProgress from './components/StackProgress';
import Question from './components/Question';
import shuffle from './utils/shuffle.js';

shuffle(questions);

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(0,  14),
    marginTop: 40
  },
  nextButton: {
    textAlign: 'center',
    padding: theme.spacing(4, 2),

  }
}));

function App() {
  const [index, setIndex] = useState(0);
  const classes = useStyles();
  const [correctCount, setCorrectCount] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [minScore, setMinScore] = useState(0);
  const [completed, setCompleted] = useState(0);
  let answeredCount = index;

  useEffect(() => {
    answeredCount = Math.min(questions.length, index + (answer ? 1 : 0));
    setCompleted(Math.min((answeredCount) * 100 / questions.length, 100));
    setScore(correctCount * 100 / (answeredCount));
    setMaxScore((questions.length - (answeredCount - correctCount)) * 100 / questions.length);
    setMinScore((correctCount) * 100 / questions.length);
  }, [index, answer, correctCount])

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <LinearProgress color="secondary" variant="determinate" value={completed} />
          <Box px={15}>
            {
              (index >= questions.length) ?
                <Box mt={5} className={classes.nextButton}>
                  <Typography variant="h4" component="h3" align="center">
                    Thanks for your time your final Score is : {(score).toFixed(0)} %
                  </Typography>
                </Box>
                :
                <Question index={index} setIndex={setIndex} correctCount={correctCount} setCorrectCount={setCorrectCount} answer={answer} setAnswer={setAnswer} />
            }
            <Box mt={5} className={classes.nextButton}>
              <Grid container direction="row" justify="space-between" >
                <Grid xs={6} style={{ textAlign: 'left' }} item>
                  {!answeredCount ? '' : <>Score : {(score).toFixed(0)} %</>}
                </Grid>
                <Grid xs={6} style={{ textAlign: 'right' }} item>
                  Max score : {(maxScore).toFixed()} %
              </Grid>
              </Grid>
            </Box>
            <StackProgress stacks={[
              { value: maxScore, color: 'orange' },
              { value: score, color: 'green' },
              { value: minScore, color: 'yellow' },
            ]} />
          </Box>
        </Paper>

      </Container>
    </div>
  )
}

export default App
