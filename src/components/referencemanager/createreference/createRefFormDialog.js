import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createNewReference } from "../../../services/referenceService";
import { languageCode } from "../../../store/states";
import {
  activeStepState,
  contentListsState,
  formOpenState,
  isReferenceSavedState,
  refTextFieldsState
} from "../../../store/statesRef";
import { i18n } from "../../../utils/i18n/i18n";
import PaperRefCreate from "./PaperRefCreate";
import ReferenceBasicInfoTextFields from "./paperReferenceForm";
import HorizontalLinearReferenceStepper from "../../stepper/referenceStepper";



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

function getStepContent(step, lng) {
  switch (step) {
    case 0:
      return i18n(lng, "Reference.steps.enterMeta") //"Enter Project Metadata Information";
    case 1:
      return i18n(lng, "Reference.steps.enterContent") // "Enter Reference Content";

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
export default function CreateRefFormDialog() {
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

          <div style={ activeStep!==2 ? {display: "none"} : {}}>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Reset
          </Button>
          <Button  variant="contained" style={{margin:"1rem"}}
          disabled={activeStep!==2}
          
            onClick={(e) => {
              createNewReference(refs, goals, procedures, results, title);
              setOpen(false);
              setIsRefernceSaved(true);
            }}
            color="primary"
          >
            Save Reference
          </Button>
          </div>
        </Grid>
      </div>

    </div>
  );
}
