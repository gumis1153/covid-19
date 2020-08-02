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

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const getCountryApi = () => {
    fetch(
      `https://api.covid19api.com/country/${
        props.modalCountry
      }?from=2020-03-01T00:00:00Z&to=${new Date()}
        `,
      requestOptions
    )
      // fetch(
      //   `https://api.covid19api.com/country/Afghanistan?from=2020-03-01T00:00:00Z&to=${new Date()}
      //     `,
      //   requestOptions
      // )
      .then((response) => response.json())
      .then((result) => {
        createChart(result);
      })
      .catch((error) => console.log('error', error));
  };

  const createChart = (data) => {
    // console.log(data);
    let totalActiveAsix = [];
    let totalConfirmedAsix = [];
    let totalDeathsAsix = [];
    let labels = [];

    data.forEach((item) => {
      totalActiveAsix.push(item.Active);
      totalConfirmedAsix.push(item.Confirmed);
      totalDeathsAsix.push(item.Deaths);
      labels.push(item.Date.slice(0, -10));
    });

    new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total active',
            data: totalActiveAsix,
            backgroundColor: ['transparent'],
            borderColor: ['#6C63FF'],
            borderWidth: 2,
          },
          {
            label: 'Total confirmed',
            data: totalConfirmedAsix,
            backgroundColor: ['transparent'],
            borderColor: ['#3F3D56'],
            borderWidth: 2,
          },
          {
            label: 'Total deaths',
            data: totalDeathsAsix,
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
