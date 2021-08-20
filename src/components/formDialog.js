import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createNewReference } from "../services/referenceService";
import { languageCode } from "../store/states";
import {
  activeStepState,
  contentListsState,
  formOpenState,
  isReferenceSavedState,
  refTextFieldsState,
} from "../store/statesRef";
import ReferenceBasicInfoTextFields from "./referencemanager/paperReferenceForm";
import PaperRefCreate from "./referencemanager/PaperRefCreate";
import HorizontalLinearReferenceStepper from "./stepper/referenceStepper";

import SwipeableViews from "react-swipeable-views";
import { i18n } from "../utils/i18n/i18n";

import StepLabel from "@material-ui/core/StepLabel";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    minHeight: 70,
    display: "flex",
    flexWrap: "wrap",
    "justify-content": "center",

    "overflow-x": "initial",
  },
  /*  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    minHeight: "70rem",
  }, */
  input: {
    display: "none",
  },
  rootPaper: {
    "text-align": "-webkit-center;",
    justifyContent: "center",
    minHeight: "65rem",
    marginTop: "0rem",
    width: "10%",
    "min-width": "94rem",
    display: "flex",
  },
}));

function getSteps() {
  return ["Basic Project Info", "Project Content"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Enter Project Metadata Information";
    case 1:
      return "Enter Reference Content";

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

    default:
      return "Unknown step";
  }
}

//create reference form

export default function FormDialog() {
  const classes = useStyles();

  const [open, setOpen] = useRecoilState(formOpenState);

  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [isReferenceSaved, setIsRefernceSaved] = useRecoilState(
    isReferenceSavedState
  );
  const [lng] = useRecoilState(languageCode);
  const refs = useRecoilValue(refTextFieldsState);
  //change the fields to accomodate using field names (addes s)
  const title = useRecoilValue(contentListsState("title"));
  const goals = useRecoilValue(contentListsState("goals"));
  const results = useRecoilValue(contentListsState("results"));
  const procedures = useRecoilValue(contentListsState("procedures"));



  const handleChange = (event, newValue) => {
    setActiveStep(newValue);
  };


  const handleClose = () => {
    //TODO add more clean up
    setOpen(false);
    setActiveStep(0);
  };
  //used to be surrounded by paper
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeStep}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="action tabs example"
          centered="true"
        >
          <Tab label={i18n(lng, "ReferenceSearch.header.enterBasicInfo")} />
          <Tab label={i18n(lng, "ReferenceSearch.header.slideContent")} />

          <Tab label={i18n(lng, "ReferenceSearch.header.shareContent")} />
        </Tabs>
      </AppBar>
      <div className={classes.rootPaper}>
        <Grid>
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
      </div>
      {/* <Paper className={classes.rootPaper}>
      </Paper> */}
    </div>
  );
}
