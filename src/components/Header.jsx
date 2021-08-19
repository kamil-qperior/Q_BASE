import { Divider, ListItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Links from "@material-ui/core/Link";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { languageCode } from "../store/states";
import { useRecoilState } from "recoil";
import { i18n } from "../utils/i18n/i18n";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  languages: {
    color: "#FFFFFF",
    "padding-left": "20px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [lng, setLng] = useRecoilState(languageCode);
  const toggleDrawer = () => {
    console.log("closed drowers");
    setOpen(!open);
  };
  const handleChangeLanguage = (event) => {
    setLng(event.target.text.toLowerCase());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Q_BASE
          </Typography>
          <Links
            className={classes.languages}
            href="#"
            onClick={handleChangeLanguage}
          >
            DE
          </Links>
          <Links
            className={classes.languages}
            href="#"
            onClick={handleChangeLanguage}
          >
            EN
          </Links>
          <Links className={classes.languages} href="#">
            {i18n(lng, "Base.header.login")}
          </Links>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <ListItem button>
          <ListItemIcon>
            <HomeIcon></HomeIcon>
          </ListItemIcon>
          <Link to="/" onClick={toggleDrawer}>
            Home
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link to="/refs" onClick={toggleDrawer}>
            {" "}
            References{" "}
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link to="/referencemanager" onClick={toggleDrawer}>
            {" "}
            New References{" "}
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link to="/referenceSearch" onClick={toggleDrawer}>
            {" "}
            Reference Search{" "}
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link to="/createReference" onClick={toggleDrawer}>
            {" "}
            Create Reference{" "}
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon></AccountBoxIcon>
          </ListItemIcon>
          <Link to="/mypapercv" onClick={toggleDrawer}>
            Mein CV
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FindInPageIcon></FindInPageIcon>
          </ListItemIcon>
          <Link to="/mycv" onClick={toggleDrawer}>
            Beratersuche
          </Link>
        </ListItem>
      </Drawer>
    </div>
  );
};

export default Header;
