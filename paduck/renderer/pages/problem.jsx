import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProblemCard from '../components/ProblemCard'
import problem from "../public/questions/problem.json"


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
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      margin: 'auto',
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


  const onAnswer_A = (e) => { //A 정답을 제출했을 시
    console.log('A')
    if (P_data['Answer'] == 'A') {
      console.log('정답')
      goNextProblem();
    } else {
      console.log('오답')
      goFail()
    }
  }
  const onAnswer_B = (e) => {//B 정답을 제출했을 시
    console.log('B')
    if (P_data['Answer'] == 'A') {
      console.log('오답')
      goFail()
    } else {
      console.log('정답')
      goNextProblem();
    }
  }

  const goNextProblem = () => { //다음 문제로, 마지막 문제라면 success로 넘어감
    console.log(P_data.length)
    console.log(problemIdx)
    if (problemList.length - 1<= problemIdx)
    {
      console.log('문제 종료')
      Router.push('/success')
    } else {
      setProblemIdx(problemIdx + 1)
    }
  }

  const goFail = () => {//실패 fail 페이지로 넘어감
    console.log('실패')
    Router.push('/fail')
  }


  useEffect(async () => {
    await setProblemList(problem);
    if (problemList[0]['No'] == 0) {
      setProblemIdx(0)
      setisReady(true)
    }
  }, [])

  const classes = useStyles({});
  let P_data = problemList[problemIdx]
  console.log(P_data)

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
                <Typography>{P_data['QuestionText']}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <ProblemCard onAnswer={onAnswer_A} name='A' Answer_txt={P_data['A_Answer_txt']} Answer_sub_txt={P_data['A_Answer_sub_txt']} Img_src={P_data['A_img_src']} />
            </Grid>

            <Grid item xs={6}>
              <ProblemCard onAnswer={onAnswer_B} name='B' Answer_txt={P_data['B_Answer_txt']} Answer_sub_txt={P_data['B_Answer_sub_txt']} Img_src={P_data['B_img_src']} />
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