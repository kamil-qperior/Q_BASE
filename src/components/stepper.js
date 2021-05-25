import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ImageUploadCard from "./imageUpload"
import ContentForm from "./contentForm"
import ReferenceBasicInfoTextFields from './referenceForm';


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

function getSteps() {
    return ['Basic Project Info', 'Goals', 'Procedures', 'Results', "Images"];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Enter Information';
        case 1:
            return 'Enter Information';
        case 2:
            return 'Finish saving reference';
        case 3:
            return 'Enter results of the project';
        case 4:
            return 'Upload Images';
        default:
            return 'Unknown step';
    }
}

function getStepForms(step, useStyles) {
    switch (step) {
        case 0:
            return (<ReferenceBasicInfoTextFields></ReferenceBasicInfoTextFields>)
        case 1:
            return (<ContentForm title="Goals"></ContentForm>)
        case 2:
            return (<ContentForm title="Procedures"></ContentForm>)
        case 3:
            return (<ContentForm title="Results"></ContentForm>)
            case 4:
                return (
                    <div>
                    <ImageUploadCard></ImageUploadCard>
                    </div>
                )

        default:
            return 'Unknown step';
    }
 
    
}




export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

 

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
                {steps.map((label, index) => {
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
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
              </Button>

                            <div>
                                {getStepForms(activeStep)}
                            </div>

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
