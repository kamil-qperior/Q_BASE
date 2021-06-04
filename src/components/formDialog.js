
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HorizontalLinearReferenceStepper from './stepper/referenceStepper';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {createNewReference} from '../services/referenceService'
import { refTextFieldsState,contentListsState } from "../store/statesRef";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploadCard from "./imageUpload"
import ContentForm from "./contentForm"
import ContentTitleForm from "./refcontent/contentTitle"
import ReferenceBasicInfoTextFields from './referenceForm';





const useStyles = makeStyles((theme) => ({
  root: {
    background:"grey"
  },
  input: {
    display: 'none',
  },
}));



function getSteps() {
  return ['Basic Project Info','Title', 'Goals', 'Procedures', 'Results', "Images"];
}

function getStepContent(step) {
  switch (step) {
      case 0:
          return 'Enter Information';
      case 1:
          return 'Enter single title of the project';
      case 2:
          return 'Enter goals of the project';
      case 3:
          return 'Enter procedures of the project';
      case 4:
          return 'Enter results of the project';
      case 5:
          return 'Upload Images';
      default:
          return 'Unknown step';
  }
}

function getStepForms(step, useStyles) {
  switch (step) {
      case 0:
          return (<ReferenceBasicInfoTextFields></ReferenceBasicInfoTextFields>)
          //bevore adding new forms adjust state atom
      case 1:
          return (<ContentTitleForm title="title"></ContentTitleForm>)
      case 2:
          return (<ContentForm title="goals"></ContentForm>)
      case 3:
           return (<ContentForm title="procedures"></ContentForm>)
      case 4:
          return (<ContentForm title="results"></ContentForm>)
      case 5:
          return (
              <div>
              <ImageUploadCard></ImageUploadCard>
              </div>
          )

      default:
          return 'Unknown step';
  }

  
}




export default function FormDialog() {
  const classes  =useStyles()
  const [open, setOpen] = React.useState(false);


  const refs = useRecoilValue(refTextFieldsState);
  const title  = useRecoilValue(contentListsState("title"));
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
          <HorizontalLinearReferenceStepper 
          getStepForms= {getStepForms}
          getStepContent= {getStepContent}
          getSteps= {getSteps}
          
          >

          </HorizontalLinearReferenceStepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={e => {
                            createNewReference(refs,goals, procedures, results, title)
                            
                            console.log('on click goals in form dialog', goals);
                            console.log('on click results in form dialog', results);
                            console.log('on click procedures in form dialog', procedures);
                        }}
            color="primary">
            Save Reference
          </Button>
        </DialogActions>
      </Dialog>
       </ScopedCssBaseline>
    </div>
  );
}

