import * as React from 'react';
import { useState, Suspense } from 'react'
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
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
//import Deposits from './Deposits';
import RefTable from './referencesTable';
import ReferenceSearch from './searchField';
import FormDialog from './formDialog';
import SlideDialog from './variant/slideDialog';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import {searchQueryState, chosenRefsState} from "../store/statesRef"



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.q-perior.com/en/">
                Q_PERIOR
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
    title: {
        flex: '1 1 100%',
    },

}));




export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [chosenRefs] = useRecoilState(chosenRefsState);

 
  
        return (
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />

                {/* <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
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
                        <Button onClick={e => {
                            fetchAllReferenceData().then(res => {
                                setReferences(res)
                            })
                        }}
                            variant="contained" color="primary" download>
                            Reset Filter</Button>
    
                        <FormDialog  ></FormDialog>
                    </Toolbar>
    
                </AppBar> */}
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
                        <Grid container  alignItems="center" justify="center" spacing={2}  style={{margin: 10   }}>
                            <Grid item>
                                <Button onClick={e => {setSearchQuery(null)}}
                                    variant="contained" color="primary" download>
                                    Reset Filter
                                </Button> 
                            </Grid>
                            <Grid item>
                                <FormDialog / >
                            </Grid>
                            <Grid item>
                    {/*             <Button  variant="contained" color="secondary">
                                    
                                </Button> */}
                                    <SlideDialog></SlideDialog>
                        
                            </Grid>
                        </Grid>
                 
                    
                            
    
                <Grid alignItems="center" justify="center" container spacing={2} >
    
                    {/* ReferenceSearch */}
                    <Grid xs={10} className={classes.container} item  >
                        <Paper >
                            <Toolbar >
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Search filters
                            </Typography>
                            </Toolbar>
                            {<ReferenceSearch />}
                        </Paper>
    
                    </Grid>
    
                    <div className={classes.appBarSpacer} />
                    {/* Separate Results Table */}
                    <Grid item>
                        <Paper >
                            <Toolbar >
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Project References
                            </Typography>
                            </Toolbar>
                            
                            <Suspense fallback={<div>Loading...</div>}>
                                <RefTable   /> 
                            </Suspense>
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
    
    
    
            </Box >
        );
    

    }
