import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { technologies, policies, status, industires, countries, cities, procedures } from "./consts"
import MultiSelect from "@antlerengineering/multiselect"
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from "recoil";

import { refTextFieldsState } from "../store/statesRef";


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
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    formControl: {

        minWidth: "100%",
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));



//TODO add language support
export default function ReferenceBasicInfoTextFields() {
    const classes = useStyles()

    const [refState, setRefState] = useRecoilState(refTextFieldsState);

    return (
        <div>
            <Grid direction="row" container justify="center" spacing={1} >

                {referenceTextFields.map(rtf => {

                    if (rtf.apiParam === "country" ||rtf.apiParam === "city" ) {

                        return (<Grid item xs={5} >
                            <FormControl className={classes.formControl}>

                                <InputLabel id={rtf.label}>{rtf.label}</InputLabel>
                                <Select
                                    value={refState[rtf.apiParam]}

                                    key={rtf.apiParam}
                                    name={rtf.apiParam}
                                    //onChange={handleChange} was not performant enough
                                    //on focusing away from field
                                    onChange={handleChange}
                                    label={rtf.label}
                                    fullWidth >
                                     {rtf?.options?.map(option => <MenuItem value={option[0]}> {option[1]["EN"]}</MenuItem>)} {/* make multilangual */}
                                </Select>
                            </FormControl>
                        </Grid>)
                    }
                    if (isSelect(rtf)) {
                        return (<Grid item xs={5} >
                            <FormControl className={classes.formControl}>

                                <InputLabel id={rtf.label}>{rtf.label}</InputLabel>
                                <Select
                                    value={refState[rtf.apiParam]}

                                    key={rtf.apiParam}
                                    name={rtf.apiParam}
                                    //onChange={handleChange} was not performant enough
                                    //on focusing away from field
                                    onChange={handleChange}
                                    label={rtf.label}
                                    fullWidth >
                                     {rtf?.options?.map(option => <MenuItem value={option}>{option}</MenuItem>)} 
                                </Select>
                            </FormControl>
                        </Grid>)
                    }
                    if (rtf.apiParam === "projectBegin"
                        || rtf.apiParam === "projectEnd") {
                        return (
                            <Grid item xs={5}>
                                <TextField
                                    id={rtf.apiParam}
                                    //className={classes.datePicker}
                                    name={rtf.apiParam}
                                    value={refState[rtf.apiParam]}
                                    onChange={handleChange}
                                    label={rtf.label}
                                    type="date"
                                    //defaultValue="2017-01-01"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        )
                    }

                    if (rtf.apiParam === "technologyTag"
                        || rtf.apiParam === "processTag") {
                        return (
                            <Grid item xs={5}>
                                <FormControl className={classes.formControl}>
                                    <MultiSelect
                                        value={refState[rtf.apiParam]}
                                        onChange={(e) => handleMultiChangeTech(e, rtf.apiParam)}
                                        options={rtf.options}
                                        label={rtf.label}
                                        labelPlural={rtf.label}
                                    />
                                </FormControl>
                            </Grid>
                        )
                    }

                    return (
                        <Grid item xs={5}>
                            <TextField
                                //margin="dense"
                                className={classes.textField}
                                id={rtf.apiParam}
                                name={rtf.apiParam}
                                //     value={refState[param]} this lock the whole field with onBlur
                                defaultValue={refState[rtf.apiParam]} //this may not work properly 
                                key={rtf.apiParam}

                                //on focusing away from field
                                onBlur={handleChange}
                                label={rtf.label}
                                fullWidth />
                        </Grid>
                    )
                })}


            </Grid>
        </div>

    )
    function handleMultiChangeTech(event, param) {
        if (!refState[param]) {
            refState[param] = []
        }
        setRefState(obj => ({
            ...obj,
            [param]: event
        }))

    }


    function handleChange(event) {
        console.log('event.target.value', event.target.value);
        setRefState(obj => ({
            ...obj,
            [event.target.name]: event.target.value
        })) 
        

    }


}


export const referenceTextFields = [
    { label: "Name", apiParam: "name" },
    { label: "Industry", apiParam: "industry", options: industires },
    { label: "Client Id", apiParam: "clientId" },
    { label: "Client Name", apiParam: "clientName" },
    { label: "Country", apiParam: "country", options: Object.entries(countries) },
    { label: "City", apiParam: "city", options: Object.entries(cities) },  
    { label: "Project Partner Id", apiParam: "projectPartnerId" },
    { label: "Project Partner Name", apiParam: "projectPartnerName" },
    { label: "Project Lead Id", apiParam: "projectLeadId" },
    { label: "Project Lead Name", apiParam: "projectLeadName" },
    { label: "Client Contact Id", apiParam: "clientContactId" },
    { label: "Client Contact Name", apiParam: "clientContactName" },
    { label: "Status", apiParam: "status", options: status },
    { label: "Policy", apiParam: "policy", options: policies },
    { label: "Project Begin", apiParam: "projectBegin" },
    { label: "Project End", apiParam: "projectEnd" },
    { label: "Person Days Total", apiParam: "personDaysTotal" },
    { label: "Person Days Q_PERIOR Total", apiParam: "personDaysQTotal" },
    { label: "Person Days Q_PERIOR Intern", apiParam: "personDaysQIntern" },
    { label: "Technology Tag", apiParam: "technologyTag", options: technologies, default: [] },
    { label: "Process Tags ", apiParam: "processTag", options: procedures, default: [] },


]

function isSelect(rtf) {
    return rtf.apiParam === "status"
        || rtf.apiParam === "industry"
        || rtf.apiParam === "policy"
        ;
}
