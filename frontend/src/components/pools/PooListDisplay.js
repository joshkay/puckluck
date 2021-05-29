import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

const PoolListDisplay = ({ 
  slug, name, description, year, 
  league, type, image 
}) => 
{
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link href={`/pool/${slug}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image && image.url}`}
            alt={`${name} Pool Image`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${league} - ${year} ${type}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link> 
    </Card>
  );
}

export default PoolListDisplay;