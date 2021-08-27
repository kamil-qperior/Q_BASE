import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Suspense, useState } from 'react';
import {
    useRecoilState
} from 'recoil';
import { chosenRefsState, searchQueryState } from "./../../store/statesRef";
//import Deposits from './Deposits';
import ReferenceResultTable from './referenceResultTable';








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
