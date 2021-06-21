/* import React from 'react';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {searchQueryState} from "../store/statesRef"
import {technologies,industires,procedures, projectNames, policies, status} from "./consts"



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
            onChange={(e,v) => handleChange(e,v, "name")}
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
            onChange={(e,v) => handleChange(e,v, "status")}
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
            onChange={(e,v) => handleChange(e,v, "country")}
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
            onChange={(e,v) => handleChange(e,v, "industry")}
            //value={searchQuery?.value}
            options={industires.map((option) => option)} //TODO picking values from dropdown does not WORK wrong taget object?
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

            onChange={(e,v) => handleChange(e,v, "policy")}
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
            onChange={(e,v) => handleChange(e,v, "technologyTag")}
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
            onChange={(e,v) => handleChange(e,v, "processTag")}
            options={procedures.map((option) => option)}
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
  
  function handleChange(event, value, param) {
    
      setSearchQuery({
        value: value,
        param: param ?? event.target.id
      });
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

 */