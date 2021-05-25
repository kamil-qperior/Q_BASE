import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useRecoilState } from "recoil";
import DeleteIcon from "@material-ui/icons/Delete";
import LazyLoad from "react-lazyload";
import { VariableSizeList } from "react-window";

import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  rootDeep: {
    "min-width": "17rem;",
    "max-width": "18rem;",
  },
  search: { "text-align": "center;", "margin-top": "1rem;" },
  list: {
    // "overflow-y": "overlay;",
    margin: "0.5rem 1rem 0.2rem 1rem;",
  },
  footerDialog: {
    "border-top": "outset;",
    "text-align": "end;",
  },
  okFont: {
    color: "#d61313;",
    // "font-weight": "bold;",
    "font-size": "inherit;",
  },
}));

let onOpen = true;
export default function CheckboxList({ theState }) {
  const classes = useStyles();

  const [filteredArray, setFilteredArray] = useRecoilState(theState);

  const handleToggle = (value) => () => {
    let setSelection = filteredArray.map((el) => {
      if (el.data === value) {
        return { data: el.data, selected: !el.selected, visible: el.visible };
      }
      return el;
    });
    setFilteredArray(setSelection);
  };

  const handleOnChanges = (event) => {
    let setSelection = filteredArray.map((el) => {
      if (el.data.toLowerCase().includes(event.target.value.toLowerCase())) {
        return { data: el.data, selected: el.selected, visible: true };
      }
      return { data: el.data, selected: el.selected, visible: false };
    });
    setFilteredArray(setSelection);
  };

  const onHandleDeleteSelections = () => {
    let setSelection = filteredArray.map((el) => {
      return { data: el.data, selected: false, visible: el.visible };
    });
    setFilteredArray(setSelection);
  };

  const visibleFilteredArray = filteredArray.filter((el) => el.visible);

  const Row = ({ index, style }) => (
    <div style={style}>
      <ListItem
        key={index}
        role={undefined}
        dense
        button
        onClick={handleToggle(visibleFilteredArray[index].data)}
      >
        <Checkbox
          edge="start"
          checked={visibleFilteredArray[index].selected}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          id={visibleFilteredArray[index].data}
          primary={visibleFilteredArray[index].data}
        />
      </ListItem>
    </div>
  );
  const getItemSize = (index) => {
    let size = Math.round(visibleFilteredArray[index].data.length / 18);
    return size <= 1 ? 50 : size === 2 ? 56 : size === 3 ? 76 : 96;
  };
  return (
    <div className={classes.rootDeep}>
      <div className={classes.search}>
        <Input
          placeholder="Suchen"
          onChange={handleOnChanges}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <div className={[classes.root, classes.list].join(" ")}>
        <VariableSizeList
          height={400}
          width={257}
          itemSize={getItemSize}
          overscanCount={10}
          itemCount={visibleFilteredArray.length}
        >
          {Row}
        </VariableSizeList>
      </div>
      <div className={classes.footerDialog}>
        <IconButton color="primary" onClick={onHandleDeleteSelections}>
          <DeleteIcon />
        </IconButton>
        {/* <Button className={classes.okFont}>Filter löschen</Button> */}
      </div>
    </div>
  );
}
