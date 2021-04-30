import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ReferenceSearch({ setSearchQuery, searchQuery} ) {

 

  //TODO connect options to meta data
  //TODO empty input resets filter
  return (
    <div style={{ width: 300 }}>

      <Autocomplete
        id="referenceSearch"
        onChange={handleChange(setSearchQuery, "name")}
        value={searchQuery?.value}
        options={projectNames.map((option) => option.title)}
        freeSolo
        disableClearable
        renderInput={createTextField("Reference Name")}
      />

      <Autocomplete
        id="referenceSearchStatus"
        onChange={handleChange(setSearchQuery, "status")}
        value={searchQuery?.value}
        options={status.map((option) => option)}
        freeSolo
        disableClearable
        renderInput={createTextField("Status")}
      />

      <Autocomplete
        id="referenceSearchCountry"
        onChange={handleChange(setSearchQuery, "country")}
        value={searchQuery?.value}
        options={["DE","CH"].map((option) => option)}
        freeSolo
        disableClearable
        renderInput={createTextField("country")}
        />


    <Autocomplete
        id="referenceSearchIndustry"
        onChange={handleChange(setSearchQuery, "industry")}
        value={searchQuery?.value}
        options={projectNames.map((option) => option.title)}
        freeSolo
        disableClearable
        renderInput={createTextField("industry")}
      />
    <Autocomplete
        id="referenceSearchPolicy"
        value={setSearchQuery.value}
       
        onChange={handleChange(setSearchQuery, "policy")}
        options={policies.map((option) => option.title)}
        freeSolo
        disableClearable
        renderInput={createTextField("policy")}
      />

  < form  noValidate>
      <TextField
        id="date"
        label="Project Start"
        type="date"
        defaultValue="2017-01-01"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>

  {//className={classes.container}}
  }
    < form  noValidate>
      <TextField
        id="date"
        label="Project End"
        type="date"
        defaultValue="2018-01-01"
        //    className={classes.textField}

        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>

   
    </div>
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

const status  = [
  "approved",
  "declined",
]



//from https://material-ui.com/components/autocomplete/#search-input