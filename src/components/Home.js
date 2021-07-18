import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import welcome_robot from './animations/welcome_robot.json'
import Lottie from "lottie-react";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        boxShadow: "none",
        background: "transparent",
        height: "100%",
    },
    grid: {
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        backgrondSize: "cover",
        minHeight: "100vh",
    },

    btn: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                Welcome to robotic fields!
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                Let a robot help you with some tasks.
                            </Typography>
                            <Button onClick={() => { window.location.href = "/create" }} className={classes.btn} variant="contained" color="secondary">
                                Create
                            </Button>
                            <Button onClick={() => { window.location.href = "/generate" }} className={classes.btn} variant="contained" color="secondary">
                                Generate
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Lottie animationData={welcome_robot} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}
