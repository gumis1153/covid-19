import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chart from 'chart.js';
import style from './modal.module.scss';
import Select from '../../components/select/Select';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100vh',
    // minHeight: 750,
    margin: '0 auto',
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
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
  const [countryName, setCountryName] = React.useState('');
  const [countryInfo, setCountryInfo] = React.useState([]);
  // const [interval, setInterval] = React.useState('');

  // console.log(props);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  // console.log(new Date().)
  const getCountryApi = (interval) => {
    let now = moment().format('YYYY-MM-DD');
    let lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
    let lastWeek = moment().subtract(1, 'weeks').format('YYYY-MM-DD');

    fetch(
      `https://api.covid19api.com/summary
        `,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        result.Countries.forEach((country) => {
          if (country.Slug === props.modalCountry) {
            setCountryInfo(country);
            console.log(country);
          }
        });
        // setCountryInfo(result);
        // console.log(result.Countries);
      })
      .catch((error) => console.log('error', error));

    if (interval === 'month') {
      fetch(
        `https://api.covid19api.com/country/${props.modalCountry}?from=${lastMonth}&to=${now}
          `,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          createChart(result);
        })
        .catch((error) => console.log('error', error));
    } else if (interval === 'week') {
      fetch(
        `https://api.covid19api.com/country/${props.modalCountry}?from=${lastWeek}&to=${now}
        `,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          createChart(result);
        })
        .catch((error) => console.log('error', error));
    } else {
      fetch(
        `https://api.covid19api.com/country/${props.modalCountry}?from=2020-03-01T00:00:00Z&to=${now}
      `,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          createChart(result);
        })
        .catch((error) => console.log('error', error));
    }
  };

  const createChart = (data) => {
    // console.log(data[0].Country);
    let totalActiveAsix = [];
    let totalConfirmedAsix = [];
    let totalDeathsAsix = [];
    let labels = [];
    setCountryName(data[0].Country);

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
        events: ['onHover'],
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

  const setTimeInterval = (interval) => {
    // setInterval(interval);
    getCountryApi(interval);
  };

  React.useEffect(() => {
    getCountryApi();
  }, []);

  return (
    <Card className={classes.root}>
      <div className={style.container}>
        <CardContent>
          <Typography variant="h5" component="h5">
            {countryName}
          </Typography>
          <Select className={style.select} setTimeInterval={setTimeInterval} />
          <div className={style.chartContainer}>
            <canvas id="myChart"></canvas>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.closeModal}>
            Close
          </Button>
        </CardActions>
      </div>
      <div className={style.container}>
        <ul>
          <li>{`Total confirmed: ${countryInfo.TotalConfirmed}`}</li>
          <li>{`New confirmed: +${countryInfo.NewConfirmed}`}</li>
          <li>{`Total deaths: ${countryInfo.TotalDeaths}`}</li>
          <li>{`New deaths: +${countryInfo.NewDeaths}`}</li>
          <li>{`Total recovered: ${countryInfo.TotalRecovered}`}</li>
          <li>{`New Recovered: +${countryInfo.NewRecovered}`}</li>
        </ul>
      </div>
    </Card>
  );
}
