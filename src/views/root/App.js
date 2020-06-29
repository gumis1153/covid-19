import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import MainTable from '../../../src/components/mainTable/MainTable';
import CardAllCases from '../../components/cardAllCases/CardAllCases';

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
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <CardAllCases />
        <Fab variant="extended">
          <NavigationIcon color="primary" />
          Find me
        </Fab>
      </header>
      <MainTable />
    </>
  );
}

export default App;
