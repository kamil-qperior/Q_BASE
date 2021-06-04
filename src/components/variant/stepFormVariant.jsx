/* eslint-disable no-undef */
import React from "react";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "./checkboxgroup";
import { Typography, Button } from "@material-ui/core";
import { useRecoilState } from "recoil";

import {
  filteredReferenceContents,
  refIdForVariantState,
} from "../../store/statesRef";

export default function StepFormVariant(props) {
 
  const placeHolderVariantName = `Reference variant ${props.step}`
  //shows content for currently selected ref id 
  const [refContents] = useRecoilState(filteredReferenceContents);
 
  //get content for Ref id
  console.log("refContents in stepform variant", refContents, "refid", placeHolderVariantName);

  if(refContents.length === 0) {
    return (
      <Typography wrap ="true"> No Content Found add references from the list.</Typography>
    )
  }


    //TODO make language dependent
    const rcTitle = refContents.find((rc) => rc.type === "title");
    const referenceId = refContents[0]?.referenceId
    const goals = refContents.filter((rc) => rc.type === "goal");
    const results = refContents.filter((rc) => rc.type === "result");
    const procedures = refContents.filter((rc) => rc.type === "procedure");
  
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid style={{ width: 300 }} item>
          <Typography wrap ="true">{rcTitle?.content ?? "No title found in reference contents."}</Typography>
        </Grid>
        <Grid item>
          <CheckboxesGroup title="Goals" content={goals} variantName={placeHolderVariantName} refId={referenceId}/>
        </Grid>
        <Grid item>
          <CheckboxesGroup title="Procedures" content={procedures} variantName={placeHolderVariantName} refId={referenceId}/>
        </Grid>
        <Grid item>
          <CheckboxesGroup title="Results" content={results} variantName={placeHolderVariantName} refId={referenceId}/>
        </Grid>
  
       
  
      </Grid>
    );
  
}
