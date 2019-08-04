import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';

import shuffle from '../utils/shuffle';
import questions from '../questions.json';
import DifficultyProgress from './DifficultyStars';


const useStyles = makeStyles(theme => ({
 
  box: {
    padding: theme.spacing(4, 2),
  },
  diffculty: {
    width: 200
  },
  answer: {
    textAlign: 'center',
    padding: 20
  },
  nextButton: {
    textAlign: 'center',
    padding: theme.spacing(4, 2),

  }
}));

const Question = ({ index, setIndex, correctCount, setCorrectCount, answer, setAnswer }) => {
  const classes = useStyles();
  const [choices, setChoices] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedButtonProps, setSelectedButtonProps] = useState({});

  useEffect(() => {
    setChoices(shuffle([questions[index].correct_answer, ...questions[index].incorrect_answers]));
    setAnswer(null);
    setSelectedIndex(null);
  }, [index]);
  useEffect(() => {
    if (answer === questions[index].correct_answer) {
      setCorrectCount(correctCount + 1);
      setIsCorrect(true);
      setSelectedButtonProps({variant : "contained", color : "primary"});
    } else {
      setIsCorrect(false);
      setSelectedButtonProps({variant : "contained", color : "secondary"});
    }
  }, [answer]);

  const putAnswer = (str, key) => {
    if(!answer){
      setAnswer(str);
      setSelectedIndex(key);
    }
  }

  return (
    <Box className={classes.box}>
      <Typography variant="h4" component="h3" >
        Question {index + 1} of {questions.length}.
      </Typography>
      <Typography component="p" >
        {decodeURIComponent(questions[index].category)}.
      </Typography>
      <Grid container  >
        <Grid xs={4} item>
          <DifficultyProgress level={questions[index].difficulty} />
        </Grid>
      </Grid>
      <Box mt={5}>
        <Typography component="p" >
          {decodeURIComponent(questions[index].question)}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {
          choices.map((str, key) => (
            <Grid className={classes.answer} xs={6} item key={key}>
              <Button fullWidth 
              variant="outlined" 
              className={classes.button} 
              onClick={e => putAnswer(str, key)} 
              
              disabled={!!answer && key !== selectedIndex && str !== questions[index].correct_answer } 
              {...(key === selectedIndex ? selectedButtonProps : {})}
              {...(answer && str === questions[index].correct_answer ? {variant : "contained", color : "primary"} : {} )}
              >
                {decodeURIComponent(str)}
              </Button>
            </Grid>
          ))
        }
      </Grid>
      <Box mt={5}>
        <Typography component="p" variant="h5" align="center">
          {answer ? (isCorrect ? 'Correct!' : 'Sorry!') : '\u00A0'}
        </Typography>
      </Box>
      <Box mt={5} className={classes.nextButton}>
        <Button variant="contained" className={classes.button} onClick={e => setIndex(index + 1)} disabled={!answer}>
          {index == questions.length ? 'Finish Quiez' : 'Next question'}
        </Button>
      </Box>
    </Box>
  );
};

export default Question;