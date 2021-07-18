import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Progress from './Progress'
import DoneProgress from './DoneProgress';
import Simplemodal from './Modal';
import Lottie from "lottie-react";
// animations
import aeronautical from './animations/aeronautical.json';
import unipedal from './animations/unipedal.json';
import bipedal from './animations/bipedal.json';
import quadrupedal from './animations/quadrupedal.json';
import arachnid from './animations/arachnid.json';
import radial from './animations/radial.json';

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
    color: {
        color: "#3f51b5"
    },
}));


export default function Task({ match: { params: { id } } }) {
    const classes = useStyles();
    const [robot, setRobot] = useState();
    const [animationData, setAnimationData] = useState();
    const [show, setShow] = useState([true, true, true, true, true]);

    // avatar animation 
    useEffect(() => {
        if (robot) {
            setAnimationData(require(`./animations/${robot.type.avatar}.json`))
        }
    }, [robot])

    useEffect(() => {
        fetchRobot();
    }, [])

    // GET del robot especifico
    const fetchRobot = () => {
        fetch(`http://127.0.0.1:8000/robots/${id}/`).then(response => {
            return response.json();
        }).then(data => {
            setRobot(data);
        });
    }

    // muestra la barra azul mientras hace la tarea, muestra la barra verde cuando termina
    function handleChange(i) {
        setShow((old_show) => {
            let new_array = [...old_show]
            new_array[i] = false
            return new_array
        })
    }

    // ejecuta la funcion despues de cierto perido de tiempo (tiempo que tiene que tardar en cada tarea)
    function handleTask(time, i) {
        setTimeout(() => { handleChange(i) }, time)
    }

    // verifica si todas las tareas estan realizadas
    function checkShow(show) {
        return show === false
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        {robot ?
                            <>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    Relax, <span className={classes.color}>{robot.name}</span> is doing everything for you.
                                </Typography>
                                {show.every(checkShow) ? <Simplemodal /> : null}
                            </>
                            : null}
                        {robot ?
                            robot.task.map((t, i) => (
                                <>
                                    <h2 key={`h2_${t.id}`}>{t.description}</h2>
                                    {show[i] ? handleTask(t.time, i) : null}
                                    {show[i] ? <Progress key={`prog_${t.id}`} /> : <DoneProgress key={`dprog_${t.id}`} />}
                                </>

                            ))

                            :
                            <CircularProgress color="secondary" />
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        {robot ?

                            < div className={classes.img}>
                                <Lottie animationData={animationData} />

                            </div>
                            :
                            <CircularProgress color="secondary" />
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );

}
