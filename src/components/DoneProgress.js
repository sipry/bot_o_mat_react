import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../App.css';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: "green"
    }

}));


export default function DoneProgress() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={100} classes={{ bar: classes.bar}} />
        </div>
    );

}
