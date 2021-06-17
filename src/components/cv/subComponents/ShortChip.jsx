import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

export default function ShortChip({ input, classes }) {
  return (
    <Tooltip disableFocusListener title={input.length > 52 ? input : ""}>
      <Chip
        className={classes.smallMargin}
        label={input.length > 52 ? `${input.substr(0, 52)}…` : input}
      ></Chip>
    </Tooltip>
  );
}
