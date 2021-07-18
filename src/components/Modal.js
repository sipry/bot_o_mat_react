import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import Modal from '@material-ui/core/Modal';
import Done from './Done';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 30,
    },
    text: {
        fontSize: 20,
    },
    grid: {
        justifyContent: 'center',
        display: 'grid',
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: '#eaeaea',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));




export default function Simplemodal() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    return (

        <div className={classes.root} ref={rootRef}>

            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open
                className={classes.modal}
                container={() => rootRef.current}
            >

                <div className={classes.paper}>
                    <Done />
                    <Grid
                        className={classes.grid}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            All the tasks are finished!
                        </Typography>
                        <Typography className={classes.text} color="textSecondary" gutterBottom>
                            Have a good day!
                        </Typography>
                        <div>
                            <Button onClick={() => { window.location.href = "/" }} className={classes.btn} variant="contained" color="primary">
                                Home
                            </Button>
                        </div>
                    </Grid>


                </div>

            </Modal>
        </div>

    );
}

