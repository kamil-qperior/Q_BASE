import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createNewReference } from "../services/referenceService";
import {
  activeStepState, contentListsState,
  formOpenState,
  isReferenceSavedState,
  refTextFieldsState
} from "../store/statesRef";
import ReferenceBasicInfoTextFields from "./referenceForm";
import PaperRefCreate from "./referencemanager/PaperRefCreate";
import HorizontalLinearReferenceStepper from "./stepper/referenceStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    minHeight: "70rem",
    "justify-content": "center",
  },
  input: {
    display: "none",
  },
  rootPaper: {
    "text-align": "-webkit-center;",
    justifyContent: "center",
    minHeight: "65rem",
    marginTop: "2rem",
    width: "10%",
    "min-width": "94rem",
    display: "flex",
  },
}));

function getSteps() {
  return [
    "Basic Project Info",
    "Project Content",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Enter Project Metadata Information";
    case 1:
      return "Enter Reference Content";
/*     case 2:
      return "Enter goals of the project";
    case 3:
      return "Enter procedures of the project";
    case 4:
      return "Enter results of the project"; */
/*     case 2:
      return "Upload Images"; */
    default:
      return "Unknown step";
  }
}

function getStepForms(step, useStyles) {
  switch (step) {
    case 0:
      return <ReferenceBasicInfoTextFields></ReferenceBasicInfoTextFields>;
    //bevore adding new forms adjust state atom
     case 1:
      return <PaperRefCreate></PaperRefCreate>; 
  /*   case 1:
      return <ContentTitleForm title="title"></ContentTitleForm>; */
/*     case 2:
      return <ContentForm title="goal"></ContentForm>;
    case 3:
      return <ContentForm title="procedure"></ContentForm>;
    case 4:
      return <ContentForm title="result"></ContentForm>; */
/*     case 2:
      return (
        <div>
          <ImageUploadCard></ImageUploadCard>
        </div>
      ); */

    default:
      return "Unknown step";
  }
}

//create reference form

export default function FormDialog() {
  const classes = useStyles();

  const [open, setOpen] = useRecoilState(formOpenState);
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [isReferenceSaved, setIsRefernceSaved] = useRecoilState(isReferenceSavedState);

  const refs = useRecoilValue(refTextFieldsState);
  //change the fields to accomodate using field names (addes s)
  const title = useRecoilValue(contentListsState("title"));
  const goals = useRecoilValue(contentListsState("goals"));
  const results = useRecoilValue(contentListsState("results"));
  const procedures = useRecoilValue(contentListsState("procedures"));

  //console.log('currentList in form dialog', currentList);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //TODO add more clean up
    setOpen(false);
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.rootPaper}>
        <Grid >
          {/* <Typography>Enter new Reference Basic Information</Typography> */}
          <HorizontalLinearReferenceStepper
            getStepForms={getStepForms}
            getStepContent={getStepContent}
            getSteps={getSteps}
          ></HorizontalLinearReferenceStepper>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              //TODO make sure is not possible before last page
              createNewReference(refs, goals, procedures, results, title);
              setOpen(false);
              setIsRefernceSaved(true);
            }}
            color="primary"
          >
            Save Reference
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}
