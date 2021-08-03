import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import React, { Suspense } from 'react';
import {
  useRecoilState,
  useRecoilValue
} from "recoil";
import { getDeck } from '../../services/slidedeck/slideDeckServ';
import {
  chosenRefsState, 
  activeStepState, 
  referenceVariantIdsFromResult
} from "../../store/statesRef";
import HorizontalLinearVariantStepper from "../stepper/variantStepper";




const useStyles = makeStyles((theme) => ({
  root: {
    background: "grey",
  },
  input: {
    display: "none",
  },
}));

function getSteps() {
  return ["reference name", "test"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Pick Reference Content Language";
  
    default:
      return "Enter Information";
  }

}





export default function SlideDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);

  //selected via add in main dashboard
  const chosenRefs = useRecoilValue(chosenRefsState);
  //id resulting from saving variant selections
  const referenceVariantIds = useRecoilValue(referenceVariantIdsFromResult);

  
  const getChosenRefsLabels = () => {
    let i = 1
    return ["Language"].concat(chosenRefs.map(r => `Reference ${i++}`));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //TODO add more clean  up
    setOpen(false);
    setActiveStep(0)
  };

  if(chosenRefs.length===0) {
    return(
      <ScopedCssBaseline>
        <Typography id="simple-dialog-title">Add references from the list first! </Typography>
      </ScopedCssBaseline>
      
    )
  }

  return (
    <ScopedCssBaseline>

        <Suspense fallback={<div>Loading...</div>}>

          <HorizontalLinearVariantStepper
            
            getStepContent={getStepContent}
            getSteps={getChosenRefsLabels}
            refIds={chosenRefs.map (r => r.referenceID)}
          >
            <Typography variant="h5">{chosenRefs[0]?.name}</Typography>
          </HorizontalLinearVariantStepper>
        </Suspense>

    </ScopedCssBaseline>
  );
}
