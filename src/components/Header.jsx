import { Divider, ListItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";



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
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
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
          <Button color="inherit">Login</Button>
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
                        <DashboardIcon />
                      </ListItemIcon>
                      <Link to="/" onClick={toggleDrawer}> References </Link>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ShoppingCartIcon > 
                          </ShoppingCartIcon > 
                      </ListItemIcon>
                        <Link   to="/cv" onClick={toggleDrawer}>
                        CVs
                        </Link> 
                        
     
                    </ListItem>

                    </Drawer> 
                
    </div>
  );
};

export default Header;
