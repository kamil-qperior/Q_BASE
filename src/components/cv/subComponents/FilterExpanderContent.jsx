import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { useRecoilState } from "recoil";
import DeleteIcon from "@material-ui/icons/Delete";
import { VariableSizeList } from "react-window";
import { switchFilterLogic } from "../../../store/states";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    height: 400,
    // maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  rootDeep: {
    // "min-width": "17rem;",
    // "max-width": "18rem;",
    width: "100%",
  },
  search: {
    "text-align": "initial;",
    "margin-top": "1rem;",
    "margin-left": "32px",
  },
  list: {
    // "overflow-y": "overlay;",
    margin: "0.5rem 1rem 0.2rem 1rem;",
    // "background-color": "red",
  },
  xxx: {
    scrollbarWidth: "none" /* Firefox */,

    // "&::-webkit-scrollbar": {
    //   width: 12,
    // } /* Chrome */,
    "&::-webkit-scrollbar": {
      width: 5,
      height: 8,
      // "background-color": "#aaa",
      /* or add it to the track */
    },
    "&::-webkit-scrollbar-thumb": { background: "#3f51b5" },
  },
  algiment: {
    "align-self": "center;",
    width: "100%;",
    "text-align": "center;",
  },
  footerDialog: {
    // "border-top": "outset;",
    "text-align": "end;",
    display: "flex;",
  },
  okFont: {
    color: "#d61313;",
    // "font-weight": "bold;",
    "font-size": "inherit;",
  },
}));

export default function FilterExpanderContent({ theState, customSwitchOn }) {
  const classes = useStyles();

  const [filteredArray, setFilteredArray] = useRecoilState(theState);

  const [theSwitchFilterLogic, setSwitchFilterLogic] =
    useRecoilState(switchFilterLogic);
  const ref = React.useRef();
  const handleToggle = (value) => () => {
    let setSelection = filteredArray.filter(Boolean).map((el) => {
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
    setTimeout(() => {
      ref.current.resetAfterIndex(0);
    }, 1);
  };

  const onHandleDeleteSelections = () => {
    let setSelection = filteredArray.map((el) => {
      return { data: el.data, selected: false, visible: el.visible };
    });
    setFilteredArray(setSelection);
  };
  const toggleSwitchFilter = (event) => {
    setSwitchFilterLogic(event.target.checked);
  };
  let visibleFilteredArray;
  if (theState.key === "filterLevelData") {
    visibleFilteredArray = filteredArray
      .filter((el) => el.visible)
      .filter((el) => el.data.length > 2);
  } else {
    visibleFilteredArray = filteredArray
      .filter((el) => el.visible)
      .filter((el) => el.data.length > 2)
      .sort((a, b) => {
        return a.data.toUpperCase().trim() > b.data.toUpperCase().trim()
          ? 1
          : -1;
      });
  }

  const Switchi = (customSwitchOn) => {
    if (customSwitchOn) {
      return (
        <div>
          Oder
          <Switch
            checked={theSwitchFilterLogic}
            onChange={toggleSwitchFilter}
          ></Switch>
          Und
        </div>
      );
    }
  };
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
    return size <= 1
      ? 50
      : size === 2
      ? 56
      : size === 3
      ? 76
      : 76 + 20 * (Math.round(size) - 3); // size === 4 ? 96 : size === 5 ? 116 : size === 6 ? 136 : size === 7 ? 136 : 156;
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
          ref={ref}
          className={classes.xxx}
          height={400}
          width={257}
          itemSize={getItemSize}
          overscanCount={1}
          itemCount={visibleFilteredArray.length}
        >
          {Row}
        </VariableSizeList>
      </div>
      <div className={classes.footerDialog}>
        <div className={classes.algiment}>{Switchi(customSwitchOn)}</div>
        {/* <IconButton color="primary" onClick={onHandleDeleteSelections}>
          <DeleteIcon />
        </IconButton> */}
      </div>
    </div>
  );
}
