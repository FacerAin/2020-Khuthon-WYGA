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
/*
TODO: 문제파일 작성
임시 문제 파일임.
실제 문제 제작은 따로 problem.json에 작성하여
컴포넌트 시작시 불러올것
*/
let init_question =
    [
      {
        'No': 0,
        'QuestionText': '(인공지능 == 딥러닝)이라고 할 수 있다.',
        'A_Answer_txt': '맞다',
        'A_Answer_sub_txt': '둘이 같은거 아닌가…?',
        'B_Answer_txt': '아니다',
        'B_Answer_sub_txt': '대충 같은건 아닌 것 같은데…?',
        'Answer': 'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 1,
        'QuestionText': '유진 구스트만(Eugene Goostman)은 튜링테스트를 통과했다.',
        'A_Answer_txt': '맞다',
        'A_Answer_sub_txt': '어…? 최초로 통과했다는 갸 아니여?',
        'B_Answer_txt': '아니다',
        'B_Answer_sub_txt': '아녀... 사람 안 같은디...',
        'Answer': 'A',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 2,
        'QuestionText': '로봇 청소기가 지도를 만들때 쓰는 기술은?',
        'A_Answer_txt': 'SLAM',
        'A_Answer_sub_txt': '지도 그리는거 SLAM 아님…?',
        'B_Answer_txt': 'SPAM',
        'B_Answer_sub_txt': 'SLAM? SPAM아님??',
        'Answer': 'A',
        'A_img_src': '',
        'B_img_src': '',
    },
    {
        'No': 3,
        'QuestionText': '인공지능을 위한 데이터셋에는 정답라벨이 반드시 존재해야한다.',
        'A_Answer_txt': '맞다',
        'A_Answer_sub_txt': '원래 컴퓨터는 멍청하기 때문이다.',
        'B_Answer_txt': '아니다',
        'B_Answer_sub_txt': '컴퓨터라면 답을 알아서 맞출 줄 알아야 한다.',
        'Answer': 'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 4,
        'QuestionText': '다음 네트워크 중 정치성향이 없는 네트워크는?',
        'A_Answer_txt': 'Cable News Network',
        'A_Answer_sub_txt': '케이블 뉴스 네트워크는 유선 방송망 등을 통해 뉴스 프로그램을 24시간 동안 보도하는 미국의 생방송 뉴스 전문 텔레비전 방송사이다.',
        'B_Answer_txt': 'Convolutional Neural Network',
        'B_Answer_sub_txt': '인공신경망이란, 인간의 뉴런 구조를 본떠 만든 기계학습 모델이다. 인간의 시신경 구조를 모방해 만든 인공신경망 모델을 CNN이라 한다 ',
        'Answer': 'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 5,
        'QuestionText': '다음 설명으로 옳은 것은?',
        'A_Answer_txt': '인공 신경회로망은 학습 데이터에 따라 연결 가중치를 변화시킨다.',
        'A_Answer_sub_txt': '대충 그럴 것 같은 내용이긴 한데...',
        'B_Answer_txt': 'sigmoid 활성함수는 불연속 함수이다.',
        'B_Answer_sub_txt': 'sigmoid 그래프가 뭐더라…?',
        'Answer': 'A',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 6,
        'QuestionText': '조건명제 p->q가 참일 때 명제 p 또는 q의 진위값에 따른 연역추론 결과가 올바른 것은?',
        'A_Answer_txt': 'p가 거짓이면 q가 참이다.',
        'A_Answer_sub_txt': '명제와 연역추론이 ',
        'B_Answer_txt': 'q가 거짓이면 p가 거짓이다.',
        'B_Answer_sub_txt': '기억나질 않아요 ㅜㅜ',
        'Answer':'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 7,
        'QuestionText': '자연어이해를 위한 처리과정 중 문장 구성요소들을 문법적을 분석하여 적합한 문법 모형을 찾는 과정은?',
        'A_Answer_txt': '구조분석',
        'A_Answer_sub_txt': '문법이면 구조 아닌가…?',
        'B_Answer_txt': '형태분석',
        'B_Answer_sub_txt': '문법모형이면 형태인가…?',
        'Answer': 'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 8,
        'QuestionText': '퍼셉트론 학습에 대한 올바른 설명은?',
        'A_Answer_txt': '비지도 학습을 한다.',
        'A_Answer_sub_txt': 'Busy Do ??',
        'B_Answer_txt': '가중치 조정 할 때 델타 규칙에 따라 학습한다.',
        'B_Answer_sub_txt': '그런데 델타 규칙이 뭐였지…?.',
        'Answer': 'B',
        'A_img_src': '',
        'B_img_src': '',
      },
      {
        'No': 9,
        'QuestionText': 'AI의 Full sentence는?',
        'A_Answer_txt': 'Artificial Intelligence',
        'A_Answer_sub_txt': '인공지능!',
        'B_Answer_txt': 'Avian Influenza',
        'B_Answer_sub_txt': '조류독감!',
        'Answer': 'X',
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