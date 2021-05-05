import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 10
    },
    button: {
        marginRight: theme.spacing(1),
        color: "blue",
        margin: 15
    },

    appBarSpacer: theme.mixins.toolbar,
    textField: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),

    },
}));




export default function ReferenceBasicInfoTextFields() {
    const classes = useStyles()



    return (
        <div>
            <Grid direction="row" container justify="center" spacing={1} >

                {textFields.map(param => {

                    return (
                        <Grid item xs={5}>
                            <TextField
                                //margin="dense"
                                className={classes.textField}
                                id={param}
                                key={param}
                                label={param}
                                fullWidth />

                        </Grid>

                    )
                })}

        </Grid>
        </div>

    )


}

export const textFields = [
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
]