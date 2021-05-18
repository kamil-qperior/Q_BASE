import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// import certificationFilter from "../../data/certificationFilter.json";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { filterLevelData } from "../../../store/states";
import { useRecoilState } from "recoil";

import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "20rem",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  rootDeep: {
    "min-width": "17rem;",
  },
  search: { "text-align": "center;", "margin-top": "1rem;" },
  list: {
    "overflow-y": "overlay;",
    margin: "0.5rem 1rem 0.5rem 1rem;",
  },
  footerDialog: {
    "border-top": "outset;",
    "text-align": "end;",
  },
  okFont: {
    color: "#d61313;",
    "font-weight": "bold;",
    "font-size": "inherit;",
  },
}));

export default function CheckboxList() {
  const classes = useStyles();
  // const [checked, setChecked] = React.useState([0]);
  // const [filteredArray, setFilteredArray] = React.useState(
  //   certificationFilter.certificates
  // );

  const [filteredArray, setFilteredArray] = useRecoilState(filterLevelData);

  const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);

    let setSelection = filteredArray.map((el) => {
      if (el.Position === value) {
        // el.selected = !el.selected;
        return { Position: el.Position, selected: !el.selected };
      }
      return el;
    });
    setFilteredArray(setSelection);
  };

  const handleOnChanges = (event) => {
    console.log(event.target.value);
    // setFilteredArray(() => {
    //   let filteredValues = certificationFilter.certificates.filter((word) =>
    //     word.toLowerCase().includes(event.target.value.toLowerCase())
    //   );
    //   if (filteredValues.length > 0) {
    //     return filteredValues;
    //   } else {
    //     return ["No Value Found"];
    //   }
    // });
  };

  return (
    <div className={classes.rootDeep}>
      <div className={classes.search}>
        <Input
          placeholder="Suchen"
          // value={values.weight}
          onChange={handleOnChanges}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </div>
      <List className={[classes.root, classes.list]}>
        {filteredArray.map((value) => {
          const labelId = `checkbox-list-label-${value.Position}`;
          return (
            <ListItem
              key={value.Position}
              role={undefined}
              dense
              button
              onClick={handleToggle(value.Position)}
            >
              <Checkbox
                edge="start"
                // checked={checked.indexOf(value.Position) !== -1}
                checked={value.selected}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
              <ListItemText id={labelId} primary={value.Position} />
            </ListItem>
          );
        })}
      </List>
      <div className={classes.footerDialog}>
        <Button className={classes.okFont}>OK</Button> <Button>Zurück</Button>
      </div>
    </div>
  );
}
