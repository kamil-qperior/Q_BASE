/* eslint-disable no-undef */
import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "./checkboxgroup";
import { Typography, TextField,FormControl, FormLabel, List, ListItem } from "@material-ui/core";
import { useRecoilState } from "recoil";
import Collapse from '@material-ui/core/Collapse';


import {
  filteredReferenceContents,
  variantNameState,
} from "../../store/statesRef";

export default function StepFormVariant(props) {
  const step = props.step;
  //shows content for currently selected ref id
  const [refContents] = useRecoilState(filteredReferenceContents);
  //has to be unique with current implementation
  const [variantName, setVariantName] = useRecoilState(variantNameState(step));

  //make editable later
  //const [variantTitle, setVariantTitle] = useRecoilState(variantTitleState(step));
  
//collapse state
const [open, setOpen] = useState(false);

  const placeHolderVariantName = `Reference variant ${step}`;
  

  if (refContents.length === 0) {
    return (
      <Typography wrap="true">
        {" "}
        No Content Found add references from the list.
      </Typography>
    );
  }

  const handleChange = (event) => {
    setVariantName(event.target.value, step);

 
  };

  //TODO make language dependent
  const rcTitle = refContents.find((rc) => rc.type === "title"); // TODO is being passed to goals als temp solution
  const referenceId = refContents[0]?.referenceId;
  const goals = refContents.filter((rc) => rc.type === "goal");
  const results = refContents.filter((rc) => rc.type === "result");
  const procedures = refContents.filter((rc) => rc.type === "procedure");

  return (
    <div>
        <List >
          <ListItem onClick={(e) =>setOpen(!open)}>Goals</ListItem>
          <Collapse
      /* className={classes.collapseStyle} */
      in={open} 
      timeout="auto"
      unmountOnExit
    >
      <List >
          <ListItem>
      <CheckboxesGroup
        title="Goals"
        rcTitle= {rcTitle}
        content={goals}
        variantName={chooseName() }
        refId={referenceId}
      />
                </ListItem>
          <ListItem>
      <CheckboxesGroup
        title="Goals"
        rcTitle= {rcTitle}
        content={goals}
        variantName={chooseName() }
        refId={referenceId}
      />
                </ListItem>

            </List>
        </Collapse>
          <ListItem>Procedures</ListItem>
          <ListItem>Results</ListItem>
      </List>
    <div>
    

    </div>
    <div>

   
    <Grid container spacing={2} alignItems="center" justify="center"
    direction ="column">
      <Grid container spacing={3} justify="center" alignItems="center">
          <Grid style={{ width: 250, margin: 20}}  item>
            <Typography  variant ="h8" wrap="true"> Title </Typography>
            <Typography  wrap="true">
              {rcTitle?.content ?? "No title found in reference contents."}
            </Typography>
          </Grid>
        <Grid style={{ width: 250 , margin: 20 }} item>
          <TextField

            id={"variantName"}
            name={"variantName"}
            
            //     value={refState[param]} this lock the whole field with onBlur
            defaultValue={placeHolderVariantName} //this may not work properly
            key={variantName}
            //on focusing away from field
            onBlur={handleChange}
            label={"Variant Name"}
            />
            </Grid>
          
      </Grid>

    
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12}>
        <CheckboxesGroup
          title="Procedures"
          content={procedures}
          variantName={chooseName()}
          refId={referenceId}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckboxesGroup
          title="Results"
          content={results}
          variantName={chooseName()}
          refId={referenceId}
        />
      </Grid>
    </Grid>
    </div>
    </div>
  );

  function chooseName() {
    return variantName === null ? placeHolderVariantName : variantName;
  }
}
