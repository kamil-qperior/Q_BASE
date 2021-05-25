import React from 'react';
import { useState } from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ImageUploadCard from "./imageUpload"

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';
  
  import { todoListState } from "../store/statesRef"



import TodoList from "./stepperUtil/contentList"

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
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    appBarSpacer: theme.mixins.toolbar,
    textField: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),

    },
}));

export default function ContentForm(props) {
    const classes = useStyles()

    const todoList = useRecoilValue(todoListState);
    console.log('todoList', todoList);
    return (
        <div className={classes.root}>


            <TodoList/>


            <TextField
                autoFocus
                className={classes.textField}

                id="date"
                label="Content"
  /*               value={value}
                onChange={onChange} */
                fullWidth
                xs={6}
            />
            <Grid container >
                <FormControl component="legend">
                    <FormLabel component="legend">Language</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1"  >
                        <FormControlLabel value="EN" control={<Radio />} label="english" />
                        <FormControlLabel value="DE" control={<Radio />} label="german" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="legend">
                    <FormLabel component="legend">Category</FormLabel>
                    <RadioGroup aria-label="gender" name="category"  >
                        <FormControlLabel value="EN" control={<Radio />} label="technical" />
                        <FormControlLabel value="DE" control={<Radio />} label="business" />
                    </RadioGroup>
                </FormControl>

            </Grid>

            <Button className={classes.button}
                onClick={e => {
                    /*     console.log('conts', contents);
                        console.log('cont', content);
                        contents.push(content)
                        setContents(contents) */
                }}
            > Add to list</Button>


            <div className={classes.demo}>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
                <List >
                    {
                        todoList.map((item) => {
                            return (
                                <ListItem>
                                    <ListItemText
                                      primary={item.text}
                                    />
                                </ListItem>
                            )
                        })}


                </List>
            </div>
        </div>
    );
}

export const contentList = ["Placeholder Goal"]

function handleChange(setContent, content) {
    return (e, newValue) => {
        console.log('in handle', content);
        console.log('in newValue', newValue);
        console.log(' newValue', e);
        setContent(content);

    };
}

function handleChange2(setContent, setContents, content, contents) {
    return (e, newValue) => {
        setContent(newValue)

        console.log('content', content);
        console.log('contents', contents);
        contents.push(content)
        setContents(contents);
    };
}