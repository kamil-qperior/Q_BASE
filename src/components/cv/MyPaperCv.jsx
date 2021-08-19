import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { i18n } from "../../utils/i18n/i18n";
import {
  languageCode,
  filterLanguagesData,
  CVsDataSelected,
  CVsData,
} from "../../store/states";
import { useRecoilState } from "recoil";
import PaperCV from "./subComponents/PaperCV";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    minHeight: 200,
    "padding-top": "24px",
    "overflow-x": "initial",
  },
}));

export default function MyCV() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [filterLanguages] = useRecoilState(filterLanguagesData);
  const [lng] = useRecoilState(languageCode);
  const [CVsDataSelectedRaw] = useRecoilState(CVsDataSelected);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <PaperCV theCVsDataState={CVsData} index={66} modus="edit" />
    </div>
  );
}
