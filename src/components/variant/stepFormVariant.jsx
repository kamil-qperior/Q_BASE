/* eslint-disable no-undef */
import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "./checkboxgroup";
import { Typography, TextField,FormControl, FormLabel } from "@material-ui/core";
import { useRecoilState } from "recoil";

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
  const placeHolderVariantName = `Reference variant ${step}`;
  
  //get content for Ref id
  console.log(
    "refContents in stepform variant",
    refContents,
    "refid",
    placeHolderVariantName
  );

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
  const rcTitle = refContents.find((rc) => rc.type === "title");
  const referenceId = refContents[0]?.referenceId;
  const goals = refContents.filter((rc) => rc.type === "goal");
  const results = refContents.filter((rc) => rc.type === "result");
  const procedures = refContents.filter((rc) => rc.type === "procedure");

  return (
    <Grid container spacing={2} alignItems="center">
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
      <Grid item>
        <CheckboxesGroup
          title="Goals"
          content={goals}
          variantName={chooseName() }
          refId={referenceId}
        />
      </Grid>
      <Grid item>
        <CheckboxesGroup
          title="Procedures"
          content={procedures}
          variantName={chooseName()}
          refId={referenceId}
        />
      </Grid>
      <Grid item>
        <CheckboxesGroup
          title="Results"
          content={results}
          variantName={chooseName()}
          refId={referenceId}
        />
      </Grid>
    </Grid>
  );

  function chooseName() {
    return variantName === null ? placeHolderVariantName : variantName;
  }
}
