import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        flexGrow: 1,
    },
    icon: {
        flexGrow: 1,
    },
    icon: {
        flexGrow: '1',
      },
      appbar_link:{
        marginRight: theme.spacing(2),
        textDecoration: "none",
        color: "white",
        '&:hover': {
            color: "rgb(208, 207, 209)",
          },  
      },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

export default function Navbar(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <div className={classes.icon}>
                        <img src="https://img.icons8.com/bubbles/50/000000/robot.png"/>
                    </div>
                    <Link onClick={() => {window.location.href="/"}} className={classes.appbar_link}>Home</Link>
                    <Link onClick={() => {window.location.href="/robotList"}} className={classes.appbar_link}>Robots</Link>
                     
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>

        </React.Fragment>


    );
}
