import React from 'react';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {searchQueryState, searchQueryTagState} from "../store/statesRef"
import {technologies, projectNames, policies, status} from "./consts"



const useStyles = makeStyles((theme) => ({
  datePicker: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),

  }
}));

export default function ReferenceSearch() {

  
  const classes = useStyles()
  const style = { width: 140 }
  
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  //search query to obj or array seachquery.name = 

  
  return (
    
        
    <Container  >

      <Grid container direction="row" spacing={3} >

        <Grid item >
          <Autocomplete
            fullWidth={true}
            style={style}
            id="name"
            onChange={handleChange}
            //value={searchQuery?.value}
            options={projectNames.map((option) => option.title)}
            freeSolo
            disableClearable
            renderInput={createTextField("Reference Name")}
          />
        </Grid>


        <Grid item>
          <Autocomplete

            id="status"
            style={style}
            onChange={handleChange}
            //value={searchQuery?.value}
            options={status.map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("Status")}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="country"
            style={style}
            onChange={handleChange}
            //value={searchQuery?.value}
            options={["DE", "CH"].map((option) => option)} // map to metadata
            freeSolo
            disableClearable
            renderInput={createTextField("Country")}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            id="industry"
            style={style}
            onChange={handleChange}
            //value={searchQuery?.value}
            options={projectNames.map((option) => option.title)}
            freeSolo
            disableClearable
            renderInput={createTextField("Industry")}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="policy"
            style={style}
            //value={setSearchQuery.value}

            onChange={handleChange}
            options={policies.map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("Policy")}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            id="technologyTag"
            style={style}
            //value={setSearchQuery.value}

            onChange={handleChange}
            options={technologies.map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("Technology")}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            id="processTag"
            style={style}
            //value={setSearchQuery.value}

            onChange={handleChange}
            options={technologies.map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("Procedures")}
          />
        </Grid>


      </Grid>

      <Grid container direction="row" spacing={3} >
        <Grid item>

          <TextField
            id="projectBegin"
            className={classes.datePicker}
            label="Project Start"
            type="date"
            onChange={handleChange}
            defaultValue="2020-01-01"
            InputLabelProps={{
              shrink: true,
            }}
            />

        </Grid>

        <Grid item><TextField
          id="projectEnd"
          className={classes.datePicker}
          label="Project End"
          type="date"
          onChange={handleChange}
          defaultValue="2018-01-01"
          InputLabelProps={{
            shrink: true,
          }}
        /></Grid>

      </Grid>

    </Container>
  );
  
  function handleChange(event) {
      setSearchQuery({
        value: event.target.value,
        param: event.target.id
      });
}


function handleChangeTag() {
  return (e, newValue) => {
    setSearchQuery({
      value: newValue,
      param: "technologyTag"
    });
  };
}

}



export function createTextField(label) {
  return (params) => (
    <TextField
      {...params}
      label={label}
      margin="normal"
      variant="outlined"
      InputProps={{ ...params.InputProps, type: 'search' }} />
  );
}






//from https://material-ui.com/components/autocomplete/#search-input