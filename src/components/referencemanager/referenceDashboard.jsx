import * as React from 'react';
import { useState, Suspense } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

//import Deposits from './Deposits';
import ReferenceResultTable from './referenceResultTable';


import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import {searchQueryState, chosenRefsState} from "./../../store/statesRef"



function Copyright(props) {
    return (
        <Typography variant="body2" color="secondary" align="center" {...props}>
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




export default function ReferenceDashboard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [chosenRefs] = useRecoilState(chosenRefsState);

 
  
        return (
            <Box sx={{ display: 'flex' }} >
                    {/* Separate Results Table */}                
                       
                            <Toolbar >
                                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                    Project References
                            </Typography>
                            </Toolbar>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ReferenceResultTable   /> 
                            </Suspense>
            </Box >
        );

    }
