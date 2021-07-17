import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lottie from "lottie-react";
// eslint-disable-next-line
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
  btn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function Generate() {
  const classes = useStyles();
  const [robot, setRobot] = useState({});
  const [animationData, setAnimationData] = useState();

  useEffect(() => {
    generateRobot();
  }, [])

  // generate the random robot with random tasks
  let names = ['Lary', 'Marcia', 'Sim', 'Ucar', 'Olive', 'Sofia', 'Samy', 'Yaya'];
  async function generateRobot() {
    var random_name = names[Math.floor(Math.random() * names.length)];
    const values = { name: random_name }
    const response = await fetch('http://127.0.0.1:8000/robots/', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    fetchRobots(data.id);
  };

  const fetchRobots = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/robots/${id}/`)
    setRobot(await response.json())
  }

  // avatar animation 
  useEffect(() => {
    if (robot.id) {
      setAnimationData(require(`./animations/${robot.type.avatar}.json`))
    }
  }, [robot])

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {robot ?
              <>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  Awsome
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  You'r robot name is <span className={classes.color}>{robot.name}</span>!
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  Press start to give <span className={classes.color}>{robot.name} </span> some tasks.
                </Typography>
                <Button onClick={() => { window.location.href = `/task/${robot.id}`; }} className={classes.btn} variant="contained" color="secondary">
                  Start
                </Button>
              </>
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
    </div>
  );

}
