import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 'auto'
  },
  img: {
    height: 300,
    objectFit: 'cover',
  },
});
/*
questionData={
  'Answer_txt': '맞다',
  'Answer_sub_txt': '왜냐하면 맞기 때문이다.',
  'Img_src': './img/paduck'
}
*/


export default function ProblemCard({ onAnswer, name, Answer_txt, Answer_sub_txt, Img_src }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} >
      <CardActionArea  onClick={(e) => { onAnswer(e, name) }}>
        <CardMedia
          className={classes.img}
          image={Img_src}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {Answer_txt}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Answer_sub_txt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}