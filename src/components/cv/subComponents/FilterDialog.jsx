import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FilterDialogList from "./FilterDialogList";
import Badge from "@material-ui/core/Badge";
import {
  filterLevelData,
  filterTopicChapterData,
  filterCertificationData,
  filterConsultingEmphasisData,
  filterITCompetenciesData,
  filterLanguagesData,
  filterFunctionalAndMethodCompetenciesData,
  filterIndustryKnowHowData,
  filterEmployeeNamesData,
} from "../../../store/states";

import { filterStatusData } from "../../../store/filter";

import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  div: {
    "text-align": "center;",
  },
}));

export default function PopoverPopupState({ dialogKey, customSwitchOn }) {
  let theRightState = undefined;
  switch (dialogKey) {
    case "level":
      theRightState = filterLevelData;
      break;
    case "topicChapter":
      theRightState = filterTopicChapterData;
      break;
    case "certification":
      theRightState = filterCertificationData;
      break;

    case "consultingEmphasis":
      theRightState = filterConsultingEmphasisData;
      break;

    case "ITCompetencies":
      theRightState = filterITCompetenciesData;
      break;

    case "languages":
      theRightState = filterLanguagesData;
      break;

    case "functionalAndMethodCompetencies":
      theRightState = filterFunctionalAndMethodCompetenciesData;
      break;

    case "industryKnowHow":
      theRightState = filterIndustryKnowHowData;
      break;

    case "employeeNames":
      theRightState = filterEmployeeNamesData;
      break;
    case "status":
      theRightState = filterStatusData;
      break;

    default:
      theRightState = filterTopicChapterData;
  }

  const [filteredArray, setFilteredArray] = useRecoilState(theRightState);
  const countSelectedFilter = filteredArray.filter((el) => el.selected).length;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFilteredArray(
      filteredArray.map((el) => {
        return {
          data: el.data,
          selected: el.selected,
          visible: true,
        };
      })
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton color="primary" onClick={handleClick}>
            <Badge badgeContent={countSelectedFilter} color="primary">
              <FilterListIcon />
            </Badge>
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            // {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <FilterDialogList
              theState={theRightState}
              customSwitchOn={customSwitchOn}
            />
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
