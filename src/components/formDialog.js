
import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HorizontalLinearStepper from './stepper';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background:"grey"
  },
  input: {
    display: 'none',
  },
}));


export default function FormDialog() {
  const classes  =useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div>
       <ScopedCssBaseline>

      <Button variant="contained"  onClick={handleClickOpen}>
        Create Reference
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Reference</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new Reference Basic Information
          </DialogContentText>
          <HorizontalLinearStepper>

          </HorizontalLinearStepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save Reference
          </Button>
        </DialogActions>
      </Dialog>
       </ScopedCssBaseline>
    </div>
  );
}
