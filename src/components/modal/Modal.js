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
import numeral from 'numeral';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%, -0%)',
    width: '80vw',
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(3),
      width: '95vw',
    },
    height: '100vh',
    // minHeight: 750,
    margin: '0 auto',
    zIndex: 2,
    display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, auto)',
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
  canvas: {
    height: '60%',
  },
  info: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  select: {
    margin: '0 0',
  },
  h5: {
    marginTop: '26px',
  },
}));

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
    let lastThreeMonths = moment().subtract(3, 'months').format('YYYY-MM-DD');
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

    if (interval === 'months') {
      fetch(
        `https://api.covid19api.com/country/${props.modalCountry}?from=${lastThreeMonths}&to=${now}
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

  const getPercent = (TotalConfirmed, TotalDeaths) => {
    return TotalDeaths / TotalConfirmed;
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
        <CardContent className={classes.info}>
          <Typography className={classes.h5} variant="h5" component="h5">
            {countryName}
          </Typography>
          <Select
            className={classes.select}
            setTimeInterval={setTimeInterval}
          />
        </CardContent>
        <div className={style.options}>
          <Button variant="outlined" size="medium" onClick={props.closeModal}>
            Close
          </Button>
        </div>
        {/* <CardActions> */}
        {/* </CardActions> */}
      </div>
      <div className={style.chartContainer}>
        <canvas id="myChart" className={classes.canvas}></canvas>
      </div>
      <div className={style.containerSmall}>
        <div>
          <h5>Total confirmed:</h5>
          <h4>{numeral(countryInfo.TotalConfirmed).format(0.0)}</h4>
        </div>
        <div>
          <h5>New confirmed:</h5>
          <h4>
            {countryInfo.NewConfirmed > 0 ? '+' : null}
            {numeral(countryInfo.NewConfirmed).format(0.0)}
          </h4>
        </div>
        <div>
          <h5>Total deaths:</h5>
          <h4>{numeral(countryInfo.TotalDeaths).format(0.0)}</h4>
        </div>
        <div>
          <h5>New deaths:</h5>
          <h4>
            {countryInfo.NewDeaths > 0 ? '+' : null}
            {numeral(countryInfo.NewDeaths).format(0.0)}
          </h4>
        </div>
        <div>
          <h5>Total recovered</h5>
          <h4>{numeral(countryInfo.TotalRecovered).format(0.0)}</h4>
        </div>
        <div>
          <h5>New Recovered:</h5>
          <h4>
            {countryInfo.NewRecovered > 0 ? '+' : null}
            {numeral(countryInfo.NewRecovered).format(0.0)}
          </h4>
        </div>
        <div>
          <h5>Mortality:</h5>
          <h4>
            {numeral(
              getPercent(countryInfo.TotalConfirmed, countryInfo.TotalDeaths)
            ).format('0.000%')}
          </h4>
        </div>
        <div>
          <h5>Percent of recovered:</h5>
          <h4>
            {numeral(
              getPercent(countryInfo.TotalConfirmed, countryInfo.TotalRecovered)
            ).format('0.000%')}
          </h4>
        </div>
      </div>
    </Card>
  );
}
