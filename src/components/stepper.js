import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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
            return 'Upload Images';
        default:
            return 'Unknown step';
    }
}

function getStepForms(step) {
    switch (step) {
        case 0:
            return getReferenceBasicInfoTextFields()
        case 1:
            return getGoalsFields()
        case 2:
            return (<TextField
                autoFocus
                margin="normal"
                id="date"
                label="date"
                type="date"
                fullWidth
            />)
        case 3:
            return (<TextField
                autoFocus
                margin="normal"
                id="date"
                label="date"
                type="date"
                fullWidth
            />)
        default:
            return 'Unknown step';
    }

    function getGoalsFields() {
        return (
            <div>
                <TextField
                    autoFocus
                    margin="normal"
                    id="date"
                    label="content"
                    xs={6}
                />
                <FormControl component="legend">
                    <FormLabel component="legend">Language</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1"  >
                        <FormControlLabel value="EN" control={<Radio />} label="english" />
                        <FormControlLabel value="DE" control={<Radio />} label="german" />
                    </RadioGroup>
                </FormControl>

            </div>
        );
    }
    function getReferenceBasicInfoTextFields() {

        return [
            "Name",
            "Status",
            "Client Id",
            "Client Name",
            "Industry",
            "Country",
            "City",
            "Project Partner Id",
            "Project Partner Name",
            "Project Lead Id",
            "Project Lead Name",
            "Client Contact Id",
            "Client Contact Name",
            "Policy",
            "Project Begin",
            "Project End",
            "Person Days Total",
            "Person Days Q_PERIOR Total",
            "Person Days Q_PERIOR Intern",
            "Technology Tag",
            "Process Tags",
        ].map(param => {

            return (
                <div>

                    <Grid direction="row" style={{ "flex-wrap": "wrap"} } container spacing={1} >
                        <Grid item xs={5}>
                            <TextField

                                //margin="dense"
                                id={param}
                                key={param}
                                label={param}
                                fullWidth />

                        </Grid>
                        <Grid item> </Grid>
                    </Grid>
                </div>

            )
        })

    }
}




export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
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
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
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
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classes.button}
                                >
                                    Skip
                                </Button>
                            )}

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
