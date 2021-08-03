import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { saveReferenceVariant } from "../../services/referenceService";
import {
  activeStepState,
  referenceVariantIdsFromResult,
  referenceVariantSelectionState,
} from "../../store/statesRef";
import LanguagePicker from "../variant/languangePicker";
//import FormControl from '@material-ui/core/FormControl';
import StepFormVariant from "../variant/stepFormVariant";
import { getDeck } from '../../services/slidedeck/slideDeckServ';
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
}));

export function getStepForms(step) {
  switch (step) {
    case 0:
      return <LanguagePicker />;

    default:
      return <StepFormVariant step={step}></StepFormVariant>;
  }
}

export default function HorizontalLinearVariantStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [referenceVariantIds, setReferenceVariantIds] = useRecoilState(
    referenceVariantIdsFromResult
  );
  //const [saveVariantState, setSaveVariantState] = useRecoilState(saveVariantState);
  const referenceVariantSelection = useRecoilValue(
    referenceVariantSelectionState
  );
  let counter = 0;
  const refIds = props.refIds;

  //is relevant only for variant stepper
  if (refIds && refIds.length > 0 && counter === 0) {
    counter++;
    //setRefIdForVariantState(refIds[activeStep])
  }

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

  const handleSaveVariant = async () => {
    const resultingIds = [];

    for await (const referenceVariant of referenceVariantSelection) {
      const res = await saveReferenceVariant(referenceVariant);

      resultingIds.push(res?.id);

      console.log("saving variant", res);
      console.log("resultingIds", resultingIds);
    }
    setReferenceVariantIds(resultingIds);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you can now generete slides from your
              references.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            <Button
              onClick={(e) => {
                getDeck(referenceVariantIds);
              }}
              color="primary"
            >
              generate slides
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {props.getStepContent(activeStep)}
            </Typography>
            <div>
              <div>{getStepForms(activeStep)}</div>
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
                onClick={
                  activeStep === steps.length - 1
                    ? handleSaveVariant
                    : handleNext
                } //last step is saving variant
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
