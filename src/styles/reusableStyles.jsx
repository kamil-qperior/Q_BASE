
//used for search view and search tables, only saving the object so it can be overwritten
export const sharedSearchBoxView = theme => ({
    root: {
       //width: "10%",
      marginTop: theme.spacing(3),
      overflowX: "initial",
      display: "flex",
    },
    table: {
      minWidth: 700,
      color: "green",
    },
    smallMargin: {
      margin: "0px 4px 2px 0px",
    },
    algiment: {
      display: "flex;",
    },
    footer: {
      left: 0,
      bottom: 0, // <-- KEY
      zIndex: 2,
      position: "sticky",
      "background-color": "aliceblue",
    },
    hierachieTransition: {
      transition: "height 1s",
      overflow: "hidden",
    },
    tableHeader: {
      "align-self": "center;",
      "font-size": "large;",
      // color: "darkslategray;",
    },
    customTableContainer: {
      // overflowX: "initial",
      // padding: 5,
      "overflow-x": "initial",
    },
    leftSearchBar: {
            width: "10%",

    },
  })

