import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FilterDialogList from "./FilterDialogList";
import Badge from "@material-ui/core/Badge";
import PaperCV from "./PaperCV";
import { showCVPopover } from "../../../store/states";

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

export default function DialogCV({ theCVsDataState, index, modus }) {
  //   const [anchorEl, setAnchorEl] = React.useState(null);

  const [theShowCVPopover, setShowCVPopover] = useRecoilState(showCVPopover);

  const handleClose = () => {
    setShowCVPopover(!theShowCVPopover);
  };

  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Popover
            open={theShowCVPopover}
            // anchorEl={anchorEl}
            // anchorOrigin={{ vertical: 0, horizontal: 0 }}
            onClose={handleClose}
            // {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <PaperCV
              theCVsDataState={theCVsDataState}
              index={index}
              modus={modus}
            />
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
