import RobotCard from './Robot_card';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';


export default function RobotList() {
    const [robots, setRobots] = useState([]);

    // Hace el GET de todos los robots en la base de datos
    const fetchRobots = () => {
        fetch(`http://127.0.0.1:8000/robots/`).then(response => {
            return response.json();
        }).then(data => {
            setRobots(data);
        });
    }

    useEffect(() => {
        fetchRobots();
    }, [])



    return (   
            <Grid container >
                {
                    robots.map((robot) => (

                        <RobotCard robot={robot} />
                    ))
                }
            </Grid>
    );
}