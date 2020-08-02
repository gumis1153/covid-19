import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chart from 'chart.js';
import style from './modal.module.scss';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: 750,
    margin: '0 auto',
    zIndex: 2,
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

export default function SimpleCard(props) {
  // console.log(props);
  const classes = useStyles();
  const [countryApi, setCountryApi] = React.useState([]);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const getCountryApi = () => {
    // fetch(
    //   `https://api.covid19api.com/country/${
    //     props.modalCountry
    //   }?from=2020-03-01T00:00:00Z&to=${new Date()}
    //     `,
    //   requestOptions
    // )
    fetch(
      `https://api.covid19api.com/country/Afghanistan?from=2020-03-01T00:00:00Z&to=${new Date()}
        `,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // setCountryApi(result);
        createChart(result);
      })
      .catch((error) => console.log('error', error));
  };

  const createChart = (data) => {
    console.log(data);
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Total active',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['transparent'],
            borderColor: ['#6C63FF'],
            borderWidth: 1,
          },
          {
            label: 'Total confirmed',
            data: [3, 192, 3, 5, 22, 3],
            backgroundColor: ['transparent'],
            borderColor: ['#3F3D56'],
            borderWidth: 2,
          },
          {
            label: 'Total deaths',
            data: [3, 22, 5, 3, 22, 3],
            backgroundColor: ['transparent'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  React.useEffect(() => {
    getCountryApi();
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h5">
          {props.modalCountry}
          Afghanistan
        </Typography>
        <div className={style.chartContainer}>
          <canvas id="myChart"></canvas>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.closeModal}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
