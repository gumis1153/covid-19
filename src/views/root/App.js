import React from 'react';
import './App.css';
import Countries from '../../components/countries/Countries';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import PublicIcon from '@material-ui/icons/Public';
import Home from '../../components/home/Home';
import MyLocation from '../../components/myLocation/MyLocation';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 auto',
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
});

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <Router>
      <Switch>
        <Route path="/covid-19/countries">
          <Countries />
        </Route>
        <Route path="/covid-19/mylocation">
          <MyLocation />
        </Route>
        <Route exact path="/covid-19/">
          <Home />
        </Route>
      </Switch>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <Link to="/covid-19">
          <BottomNavigationAction label="Home" showLabel icon={<HomeIcon />} />
        </Link>
        <Link to="/covid-19/countries">
          <BottomNavigationAction
            label="Countries"
            showLabel
            icon={<PublicIcon />}
          />
        </Link>
        <Link to="/covid-19/mylocation">
          <BottomNavigationAction
            label="My location"
            showLabel
            icon={<LocationOnIcon />}
          />
        </Link>
      </BottomNavigation>
    </Router>
  );
}

export default App;
