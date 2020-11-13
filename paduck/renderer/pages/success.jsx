import React from 'react';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
      background: '#FFF44F'
    },
  })
);

const Success = () => {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Paduck</title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          성공
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          축하합니다. 당신은 고라파덕의 선택을 받았습니다.
        </Typography>
        <Typography gutterBottom>
          <Link href="/home">다시하기</Link>
        </Typography>

      </div>
    </React.Fragment>
  );
};

export default Success;
