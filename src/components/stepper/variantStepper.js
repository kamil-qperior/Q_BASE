import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Suspense from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Paper, FormLabel, FormGroup, FormControlLabel, Checkbox}from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
//import FormControl from '@material-ui/core/FormControl';
import StepFormVariant from '../variant/stepFormVariant'
import LanguagePicker from '../variant/languangePicker'
import {saveReferenceVariant} from '../../services/referenceService'

import {
    referenceVariantSelectionState,
    activeStepState,
  } from "../../store/statesRef";
  import {
    selector,
    useRecoilState,
    useRecoilValue,
  } from "recoil";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
            return (
            <LanguagePicker/>
            )
    
        default:
            return (               
                <StepFormVariant  step={step}>
                </StepFormVariant>
            )  
    }
}



export default function HorizontalLinearVariantStepper( props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);
    //const [saveVariantState, setSaveVariantState] = useRecoilState(saveVariantState);
    const referenceVariantSelection  = useRecoilValue(referenceVariantSelectionState);
    let counter = 0
    const refIds = props.refIds;
    
    //is relevant only for variant stepper
    if(refIds && refIds.length > 0 && counter === 0 ) {
        counter++
        //setRefIdForVariantState(refIds[activeStep])
        
    }
    
    const steps = props.getSteps();
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);   
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1, );
    };
   

    const handleReset = () => {
        setActiveStep(0);
    };

    const  handleSaveVariant = async () => {
      console.log('we save this  variant:' , referenceVariantSelection);

      for await (const referenceVariant of referenceVariantSelection) {

          console.log('saving variant', await saveReferenceVariant(referenceVariant))
      }

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
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={ handleSaveVariant} className={classes.button}>
                            Save Reference Variant
                        </Button>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{props.getStepContent(activeStep)}</Typography>
                        <div>
                            <div>
                        
                            {getStepForms(activeStep)}


                            </div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                                >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
               
        </div>
    );
}
