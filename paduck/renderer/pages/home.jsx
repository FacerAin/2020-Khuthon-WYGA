import React from 'react';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

const Home = () => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  return (
    <React.Fragment>
      <Head>
        <title>Paduck</title>
      </Head>
      <div className={classes.root}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>주의사항</DialogTitle>
          <DialogContent>
            <DialogContentText>파덕?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              확인
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Paduck
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          AI 문제를 풀어봅시다.
        </Typography>
        <img src="/images/psyduck-icon-2.jpg" />
        <Typography gutterBottom>
          <Link href="/problem">문제 풀기</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          주의사항
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
