//TODO: 종료 페이지 제작 <-
//TODO: 문제 페이지 디자인 다듬기
//TODO: 정답 표시는 어떻게?
//TODO: 문제 데이터셋 양식 만들기
//TODO: 인수인계 작업 (주석, 수정할 것 정리)

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
let init_question = [{
  'No': 0, //Init Value
  'QuestionText': '자연어처리는 재미 없다.',
  'A_Answer_txt': '맞다',
  'A_Answer_sub_txt': '왜냐하면 맞기 때문이다.',
  'B_Answer_txt': '아니다',
  'B_Answer_sub_txt': '왜냐하면 아니기 때문이다.',
  'Answer': 'A',
  'A_img_src': '',
  'B_img_src': '',
},
{
  'No': 1, //Init Value
  'QuestionText': '자연어처리는 재미 있다.',
  'A_Answer_txt': '맞다',
  'A_Answer_sub_txt': '왜냐하면 맞기 때문이다.',
  'B_Answer_txt': '아니다',
  'B_Answer_sub_txt': '왜냐하면 아니기 때문이다.',
  'Answer': 'A',
  'A_img_src': '',
  'B_img_src': '',
}
]


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



  const onAnswer_A = (e) => { //코드 개선 요망
    console.log('A')
    if (P_data['Answer'] == 'A') {
      console.log('정답')
      goNextProblem();
    } else {
      console.log('오답')
      goFail()
    }
  }
  const onAnswer_B = (e) => {
    console.log('B')
    if (P_data['Answer'] == 'A') {
      console.log('오답')
      goFail()
    } else {
      console.log('정답')
      goNextProblem();
    }
  }

  const goNextProblem = () => {
    console.log(P_data.length)
    console.log(problemIdx)
    if (problemList.length - 1<= problemIdx)//문제 종료
    {
      console.log('문제 종료')
      Router.push('/success')
    } else {
      setProblemIdx(problemIdx + 1)
    }

  }

  const goFail = () => {
    console.log('실패')
    Router.push('/fail')
  }
  useEffect(() => {
    //Init Problem State
    if (problemList[0]['No'] == 0) {
      //For Testing
      setProblemList(init_question);
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