import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  select: {
    marginLeft: '20px',
    // width: 120,
    // margin: '0 auto 20px',
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [selectName, setSelectName] = React.useState('');
  const [open, setOpen] = React.useState(false);

  //   console.log(props.setTimeInterval);

  const handleChange = (event) => {
    props.setTimeInterval(event.target.value);
    setSelectName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.select}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          {selectName === '' ? <span>From begining</span> : selectName}
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectName}
          onChange={handleChange}
        >
          <MenuItem value="begin">From begining</MenuItem>
          <MenuItem value="month">Last month</MenuItem>
          <MenuItem value="week">Last week</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
