import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

let init_question = [{
  'No': 0, //Init Value
  'QuestionText': '자연어처리는 재미 없다.',
  'A_AnswerText': '맞다',
  'B_AnswerText': '아니다',
  'Answer': 'A',
  'A_img': '',
  'B_img': '',
}]


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(4),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    text_question: {
      padding: theme.spacing(5),
    },
    btn_ans_A: {
      padding: theme.spacing(5),
    },
    btn_ans_B: {
      padding: theme.spacing(5),
    }
  })
);

const Problem = () => {
  const [problemList, setProblemList] = useState(init_question);
  const [problemIdx, setProblemIdx] = useState(0);
  const [isReady, setisReady] = useState(false);

  useEffect(() => {
    console.log(problemList[problemIdx]['QuestionText'])
    //Init Problem State
    if (problemList[0]['No'] == 0) {
      //For Testing
      setProblemList(init_question);
      setProblemIdx(0)
      setisReady(true)
    }
  },[])

  const classes = useStyles({});

  return (
    !isReady ? 
    <CircularProgress color="secondary" /> //For loading
    :
    <React.Fragment>
      <Head>
        <title>Paduck</title>
      </Head>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={clsx(classes.paper, classes.text_question)}>
              <Typography>Q.</Typography>
              <Typography>{problemList[problemIdx]['QuestionText']}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={clsx(classes.paper, classes.btn_ans_A)}>
              <Typography>A_image</Typography>
              <Typography>{problemList[problemIdx]['A_AnswerText']}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper, classes.btn_ans_B}>
              <Typography>B_image</Typography>
              <Typography>{problemList[problemIdx]['B_AnswerText']}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
  <Paper className={classes.paper}><Typography>{problemList[problemIdx]['No']}</Typography></Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>

  )

}

export default Problem;