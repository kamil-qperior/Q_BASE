
import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HorizontalLinearStepper from '../stepper/stepper';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {createNewReference} from '../../services/referenceService'
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import  CheckboxesGroup from './checkboxgroup';

import { refTextFieldsState,contentListsState, chosenRefsState } from "../../store/statesRef";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background:"grey"
  },
  input: {
    display: 'none',
  },
}));



function getSteps() {
  return ["reference name", "test"];
}

function getStepContent(step) {
  switch (step) {
      case 0:
          return 'Enter Information';
      case 1:
          return 'Enter single title of the project';

      default:
          return 'Unknown step';
  }
}

function getStepForms(step, useStyles) {
  switch (step) {
      case 0:
          return (
          <Grid container spacing={2}>
            <Grid item>
            </Grid>
            <Grid item>
              <CheckboxesGroup title ="Goals"/>
            </Grid>
            <Grid item>
              <CheckboxesGroup title ="Procedures"/>
            </Grid>
            <Grid item>
              <CheckboxesGroup title ="Results"/>
            </Grid>
            </Grid>)
          //bevore adding new forms adjust state atom


      case 1:
          return (
              <div>
             
              </div>
          )

      default:
          return 'Unknown step';
  }

  
}





export default function SlideDialog() {
  const classes  =useStyles()
  const [open, setOpen] = React.useState(false);


  const chosenRefs = useRecoilValue(chosenRefsState);

  //use one feteched from backend
  const goals  = useRecoilValue(contentListsState("goals"));
  const results  = useRecoilValue(contentListsState("results"));
  const procedures  = useRecoilValue(contentListsState("procedures"));
  
  //console.log('currentList in form dialog', currentList);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    
       <ScopedCssBaseline>

      <Button variant="contained"  color="primary" onClick={handleClickOpen}>
        Create Slides
      </Button>
      <Badge badgeContent={chosenRefs.length} color="secondary">
        <HowToVoteIcon />
      </Badge>
      <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="slide-dialog-title">
        <DialogTitle id="slide-dialog-title">Choose Slide Content</DialogTitle>
        <DialogContent >
          
        <HorizontalLinearStepper 
          getStepForms= {getStepForms}
          getStepContent= {getStepContent}
          getSteps= {getSteps}
          
          >
            <Typography variant="h5" >{chosenRefs[0]?.name}</Typography>

          </HorizontalLinearStepper> 
          
       

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={e => {
                            
                            
                            console.log('on click goals in form dialog', goals);
                            console.log('on click results in form dialog', results);
                            console.log('on click procedures in form dialog', procedures);
                        }}
            color="primary">
            generate slides
          </Button>
        </DialogActions>
      </Dialog>
       </ScopedCssBaseline>
  
  );
}

