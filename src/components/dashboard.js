import * as React from 'react';
import { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { mainListItems, secondaryListItems } from './listItems';
//import Deposits from './Deposits';
import RefTable from './referencesTable';
import ReferenceSearch from './searchField';
import FormDialog from './formDialog';
import { fetchAllReferenceData } from '../services/referenceService';
import { getDeck, token } from '../services/slidedeck/slideDeckServ.js'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    container: {
        height: "30%"
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
}));




export default function Dashboard({ references, setReferences, setQuery, searchQuery, setSearchQueryTag, searchQueryTag }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [isLoading, setIsLoading] = useState([]);


    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Reference Management
          </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            <HowToVoteIcon />
                        </Badge>
                    </IconButton>
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
                <List>{mainListItems}</List>
                {/*                 <Divider />
                <List>{secondaryListItems}</List> */}
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}  >
                    <Grid direction="row" container spacing={1} >

                        <Grid container justify="flex-start" alignItems="center" spacing={3} item xs={12} md={4} lg={3} >
                            {/* Buttons */}
                            <Grid item>
                                <Button onClick={e => {
                                    fetchAllReferenceData().then(res => {
                                        setReferences(res)
                                    })
                                }}
                                    variant="contained" color="primary" download>
                                    Reset filter</Button>
                            </Grid>
                            {/*               TODOmove later to end of variant creation   
                                   <Grid item>
                                <Button onClick={getDeck} variant="contained" color="primary" download>
                                    Download Slides</Button>
                                    
                            </Grid> */}
                            <Grid item >
                                <FormDialog variant="contained" ></FormDialog>
                            </Grid>
                        </Grid>

                        {/* ReferenceSearch */}
                        <Grid container className={classes.container} item xs={12} md={4} lg={3} variant="contained" >
                            <Paper alignItems="center"
                                sx={{ p: 7, display: 'flex', flexDirection: 'row', height: 240, }}
                            >
                                {<ReferenceSearch setSearchQuery={setQuery} value={searchQuery}
                                    setSearchQueryTag={setSearchQueryTag} searchQueryTag={searchQueryTag}
                                />}
                            </Paper>

                        </Grid>

                    </Grid>

                    <Divider />

                    {/* Separate Results Table */}
                    <Grid item xs={12} >

                        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                            <RefTable isLoading={isLoading} references={references} setSearchQueryTag={setSearchQueryTag}
                                searchQueryTag={searchQueryTag} />
                        </Paper>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box >
    );
}