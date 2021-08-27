import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeStepState,
  chosenRefsState,
  referenceVariantIdsFromResult,
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

/* function getSteps() {
  return ["reference name", "test"];
} */

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Pick Reference Content Language";

    default:
      return "Enter Information";
  }
}

//right now is used as overview page, could be maybe deleted
export default function OverviewDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);

  //selected via add in main dashboard
  const chosenRefs = useRecoilValue(chosenRefsState);
  //id resulting from saving variant selections
  const referenceVariantIds = useRecoilValue(referenceVariantIdsFromResult);

  const getChosenRefsLabels = () => {
    let i = 1;
    return ["Language"].concat(chosenRefs.map((r) => `Reference ${i++}`));
  };

  const handleClose = () => {
    //TODO add more clean  up
    setOpen(false);
    setActiveStep(0);
  };

  if (chosenRefs.length === 0) {
    return (
      <ScopedCssBaseline>
        <Typography id="simple-dialog-title">
          Add references from the list first!{" "}
        </Typography>
      </ScopedCssBaseline>
    );
  }

  return (
    <ScopedCssBaseline>
      <Suspense fallback={<div>Loading...</div>}>
        <HorizontalLinearVariantStepper
          getStepContent={getStepContent}
          getSteps={getChosenRefsLabels}
          refIds={chosenRefs.map((r) => r.referenceID)}
        >
          <Typography variant="h5">{chosenRefs[0]?.name}</Typography>
        </HorizontalLinearVariantStepper>
      </Suspense>
    </ScopedCssBaseline>
  );
}
