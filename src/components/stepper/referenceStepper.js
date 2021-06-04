import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Suspense from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepFormVariant from '../variant/stepFormVariant'

import {
    refIdForVariantState,
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





export default function HorizontalLinearReferenceStepper( props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);
     
    
    const steps = props.getSteps();
    

    const handleNext = () => {
        //setRefIdForVariantState(refIds[activeStep+1])
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        
        
    };
    
    const handleBack = () => {
        //setRefIdForVariantState(refIds[activeStep-1])
        setActiveStep((prevActiveStep) => prevActiveStep - 1, );
        
    };
   

    const handleReset = () => {
        setActiveStep(0);
        //setRefIdForVariantState(refIds[0])
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
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
            </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{props.getStepContent(activeStep)}</Typography>
                        <div>
                            <div>
                            
                                 {props.getStepForms(activeStep)} 
                        
                


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
