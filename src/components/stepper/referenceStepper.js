import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import Alert from '@material-ui/lab/Alert';
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeStepState, isReferenceSavedState } from "../../store/statesRef";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  appBarSpacer: theme.mixins.toolbar,
  navigationButtons: {
    padding: "2rem",
    "vertical-align": "bottom;",
  },
  navigationButtons2: {
    padding: "2rem",
  },
}));

export default function HorizontalLinearReferenceStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const isReferenceSaved = useRecoilValue(isReferenceSavedState);
  const steps = props.getSteps();

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
      <Stepper activeStep={activeStep}>
        {steps?.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.navigationButtons}>
        {activeStep === steps.length ? (
          <div>
            <Alert variant="outlined" severity={isReferenceSaved ? "success": "info"}>
              You have captured all necessery data. Click "save reference" to
              capture it permanently.
              
            </Alert>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
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
