import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';


export default function ReferenceSearch({ setSearchQuery, searchQuery }) {

  const style = { width: 150 }

  //TODO connect options to meta data
  //TODO empty input resets filter
  //<div style={{ width: 300 }}>
  return (
    <Container  >

      <Grid container direction="row" spacing={3} >

        <Grid item >
          <Autocomplete
            fullWidth={true}
            style={style}
            id="referenceSearch"
            onChange={handleChange(setSearchQuery, "name")}
            value={searchQuery?.value}
            options={projectNames.map((option) => option.title)}
            freeSolo
            disableClearable
            renderInput={createTextField("Reference Name")}
          />
        </Grid>


        <Grid item>
          <Autocomplete

            id="referenceSearchStatus"
            style={style}
            onChange={handleChange(setSearchQuery, "status")}
            value={searchQuery?.value}
            options={status.map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("Status")}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="referenceSearchCountry"
            style={style}
            onChange={handleChange(setSearchQuery, "country")}
            value={searchQuery?.value}
            options={["DE", "CH"].map((option) => option)}
            freeSolo
            disableClearable
            renderInput={createTextField("country")}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            id="referenceSearchIndustry"
            style={style}
            onChange={handleChange(setSearchQuery, "industry")}
            value={searchQuery?.value}
            options={projectNames.map((option) => option.title)}
            freeSolo
            disableClearable
            renderInput={createTextField("industry")}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="referenceSearchPolicy"
            style={style}
            value={setSearchQuery.value}

            onChange={handleChange(setSearchQuery, "policy")}
            options={policies.map((option) => option.title)}
            freeSolo
            disableClearable
            renderInput={createTextField("policy")}
          />
        </Grid>


      </Grid>

      <Grid container direction="row" spacing={3} >
        <Grid item>

          <TextField
            id="date"
            style={style}
            label="Project Start"
            type="date"
            defaultValue="2017-01-01"
            InputLabelProps={{
              shrink: true,
            }}
          />

        </Grid>

        {//className={classes.container}}
        }
        <Grid item><TextField
          id="date"
          style={style}
          label="Project End"
          type="date"
          defaultValue="2018-01-01"
          //    className={classes.textField}

          InputLabelProps={{
            shrink: true,
          }}
        /></Grid>

      </Grid>

    </Container>
  );
}


function handleChange(setSearchQuery, param) {
  return (e, newValue) => {
    setSearchQuery({
      value: newValue,
      param: param
    });
  };
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

const supportedSearchTerms = [
  "name",
  "status",
  "country",
  "client",
  "policy",
  "projectBegin",
  "projectEnd",
  "industry"
]


const projectNames = [
  { title: 'Project Name 1', year: 1994 },
  { title: 'Project Name 2', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
]

const policies = [
  { title: "pm contact approved - on request" },
]

const status = [
  "approved",
  "declined",
]



//from https://material-ui.com/components/autocomplete/#search-input