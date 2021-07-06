import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

export default function ShortChip({ input, classes, isSelected }) {
  return (
    <Tooltip disableFocusListener title={input.length > 52 ? input : ""}>
      <Chip
        className={classes.smallMargin}
        label={input.length > 52 ? `${input.substr(0, 52)}…` : input}
        color={isSelected ? "primary" : ""}
        deleteIcon={<DoneIcon />}
        onDelete={
          isSelected
            ? (val) => {
                console.log(val);
              }
            : ""
        }
      ></Chip>
    </Tooltip>
  );
}
