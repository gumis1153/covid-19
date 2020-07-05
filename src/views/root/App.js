import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import MainTable from '../../../src/components/mainTable/MainTable';
import Cards from '../../components/cards/Cards';
import AppBar from '../../components/appBar/AppBar';

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: '50px auto 0',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});

function App() {
  const [covidAPIGlobal, setCovidAPIGlobal] = React.useState([]);
  React.useEffect(() => {
    fetchCovidApi();
    console.log(covidAPIGlobal);
  }, []);

  const classes = useStyles();
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const fetchCovidApi = () => {
    return fetch('https://api.covid19api.com/summary', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCovidAPIGlobal(data.Global);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const percentOfDeaths = `${
    (covidAPIGlobal.TotalDeaths / covidAPIGlobal.TotalConfirmed) * 100
  }`;

  return (
    <>
      <AppBar />
      <section className={classes.root}>
        <Cards
          covidAPIGlobal={covidAPIGlobal}
          percentOfDeaths={percentOfDeaths}
        />
        <Cards />
        <Fab variant="extended">
          <NavigationIcon color="primary" />
          Find me
        </Fab>
      </section>
      <MainTable />
    </>
  );
}

export default App;
