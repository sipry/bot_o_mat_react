import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Confetti from 'confetti-react';
import { useWindowSize } from "react-use";


const useStyles = makeStyles((theme) => ({
    icon: {
        animationName: "$blinky",
        animationDuration: "0.95s",
        animationDirection: "alternate",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite"
      },
      done: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: theme.spacing(10),
        width: "100%",
        borderRadius: theme.spacing(0.5),
        marginBottom: theme.spacing(2),
        fontSize: theme.spacing(8),
        color: theme.palette.primary.main,
        animationName: "$bg",
        animationDuration: "1s",
        animationFillMode: "forwards"
      }
}));


export default function Done() {
    const classes = useStyles();
    const { width, height } = useWindowSize();


    return (
        <div className={classes.root}>
        <Confetti width={width} height={height} />
          
        </div>
    );

}
