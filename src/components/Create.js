import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Lottie from "lottie-react";
import robot_playing from './animations/robot-playing-computer.json'


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

    TextField: {
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(6),
    },
    btn: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
    animation: {
        width: "70%",
        height: "70%",
    }
}));




export default function Create() {
    const classes = useStyles();
    const [robot, setRobot] = useState({});
    const [robot_name, setInput] = useState('');
    const [type_id, settype_select] = React.useState(1);
    let bol = false


    // POST request
    async function createRobot() {
        const values = { name: robot_name, type: type_id }
        const response = await fetch('http://127.0.0.1:8000/robots/', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        fetchRobots(data.id);
    };

    // Hace el get del robot para pasarle el id al task
    const fetchRobots = async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/robots/${id}/`)
        const robot = await response.json()
        setRobot(robot)
        window.location.href = `/task/${robot.id}`
    }


    const type_dropdown = [
        {
            value: 1,
            label: 'Unipedal',
        },
        {
            value: 2,
            label: 'Bipedal',
        },
        {
            value: 3,
            label: 'Quadrupedal',
        },
        {
            value: 4,
            label: 'Arachnid',
        },
        {
            value: 5,
            label: 'Radial',
        },
        {
            value: 6,
            label: 'Aeronautical',
        },
    ];

    const handleChange = (event) => {
        settype_select(event.target.value);
    };
  
    return (
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div>
                            <TextField
                                className={classes.TextField}
                                name="Robot name"
                                {...robot_name === "" ? bol=true : bol=false}
                                error = {bol}
                                helperText={robot_name === "" ? 'This field is required' : ' '}
                                onInput={e => setInput(e.target.value)}
                                value={robot_name}
                                label="Robot name"
                                color="secondary" />
                            <TextField
                                className={classes.TextField}
                                id="sleect robot type"
                                select
                                label="Robot type"
                                value={type_id}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select robot type"
                            >
                                {type_dropdown.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={() => {
                            createRobot();
                        }}>
                            Create
                        </Button>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Lottie animationData={robot_playing} className={classes.animation} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}
