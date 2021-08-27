import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageCode } from "../../store/states";
import { activeStepState, isReferenceSavedState } from "../../store/statesRef";
import { TabPanel } from "../referencemanager/MyReferenceDashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  appBarSpacer: theme.mixins.toolbar,
  navigationButtons: {
    padding: "2rem",
    
    
  },
  navigationButtons2: {
   
    padding: "2rem",
    
  },
  tabContentTableView: {
    
    "display": "none"
  },

}));

//has been adjusted to fit the switchable tab view
export default function HorizontalLinearReferenceStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const isReferenceSaved = useRecoilValue(isReferenceSavedState);
  const steps = props.getSteps();
  const [lng] = useRecoilState(languageCode);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div >
        {activeStep === steps.length ? (
          <div  className={classes.navigationButtons}>
            <Alert variant="outlined" severity={isReferenceSaved ? "success": "info"}>
            Great. You have entered all necessary data. Click "save reference" to store it permanently.    
            </Alert>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>

        <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleNext} //fix
        className={classes.tabContentTableView}
      >
         <TabPanel className={classes.tabContentTable} value={activeStep} index={0}>
            </TabPanel>
            </SwipeableViews>
            <Typography className={classes.instructions}>
              {props.getStepContent(activeStep)}
            </Typography>

            <div>{props.getStepForms(activeStep)}</div>
            <div className={classes.navigationButtons2}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
