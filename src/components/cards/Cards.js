import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { render } from '@testing-library/react';

const useStyles = makeStyles({
  root: {
    // width: 300,
    // maxWidth: 300,
    minHeight: 300,
    margin: '20px 20px 0 0',
    padding: 30,
  },
  small: {
    fontSize: 14,
    opacity: 0.9,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const Location = () => {
    return (
      <>
        <Fab variant="extended">
          <NavigationIcon className={classes.extendedIcon} />
          Navigate
        </Fab>
      </>
    );
  };

  const Cases = (covidAPIGlobal, percentOfDeaths) => {
    const globalData = covidAPIGlobal;
    console.log(globalData);
    return (
      <>
        <Typography variant="h5" component="h2">
          {globalData.TotalConfirmed}
        </Typography>
        <Typography className={classes.small} variant="h5" component="h2">
          + {globalData.NewConfirmed}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Total confirmed cases
        </Typography>
        <Typography variant="h5" component="h2">
          {globalData.TotalDeaths}
        </Typography>
        <Typography className={classes.small} variant="h5" component="h2">
          + {globalData.NewDeaths}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Total deaths
        </Typography>
        <Typography variant="h5" component="h2">
          {Number(percentOfDeaths).toFixed(2)}%
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Percent of deaths
        </Typography>{' '}
      </>
    );
  };

  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;

  React.useEffect(() => {}, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Cases />
      </CardContent>
    </Card>
  );
}
