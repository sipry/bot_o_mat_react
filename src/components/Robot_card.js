import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Lottie from "lottie-react";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DoneIcon from '@material-ui/icons/Done';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        },

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
        maxWidth: '80%',
    },
    link: {
        textDecorationLine: 'none',

    },
    description: {
        color: theme.palette.text.secondary,
    },
    cardContent:
    {
        display: 'flex',
    },
    title: {
        alignContent: 'center',
        display: 'grid',
        minWidth: '50%',
        justifyContent: 'center',
    },
    modalDescription: {
        justifyContent: 'center',
        display: 'grid',
        alignContent: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    description_task: {
        textIndent: '10px',
        color: theme.palette.text.secondary,
    },
    modalanimation: {
        justifyContent: 'center',
        display: 'flex',
    },
}));


export default function SimpleCard({ robot }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [animationData, setAnimationData] = useState();

    // animation
    useEffect(() => {
        if (robot.id) {
            setAnimationData(require(`./animations/${robot.type.avatar}.json`))
        }
    }, [robot])

    // close and open the modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* card prev */}
            <Grid item xs={12} sm={6} md={4}>
                <Link className={classes.link} onClick={handleOpen}>
                    <Card className={classes.root}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.title}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    {robot.name}
                                </Typography>
                            </div>
                            <div>
                                <h3 className={classes.description}>Personality: {robot.type.personality} </h3>
                                <h3 className={classes.description}>Type: {robot.type.name}</h3>
                                <h3 className={classes.description}>Tasks completed:{(robot.task).length}</h3>
                            </div>
                        </CardContent>

                    </Card>
                </Link>
            </Grid>
            {/* card prev */}


            {/* card modal info */}
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid container className={classes.grid}>
                            <Grid item xs={12} sm={6} className={classes.modalDescription}> {/* robot description grid */}
                                <div className={classes.modalDescription}>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                        {robot.name}
                                    </Typography>
                                    <div >
                                        <h3 className={classes.description}>Personality: {robot.type.personality} </h3>
                                        <h3 className={classes.description}>Type: {robot.type.name}</h3>
                                        <h3 className={classes.description}>Tasks completed:</h3>
                                        {
                                            robot.task.map((t) => (
                                                <h3 className={classes.description_task}><DoneIcon />{t.description}</h3>

                                            ))
                                        }
                                    </div >
                                    <Button onClick={() => { window.location.href = `/task/${robot.id}`; }} className={classes.btn} variant="contained" color="secondary">
                                        Redo tasks
                                    </Button>
                                </div>
                            </Grid> {/* robot description grid */}

                            <Grid item xs={12} sm={6} className={classes.modalanimation}> {/* robot animation grid*/}
                                <div className={classes.modalanimation}>
                                    <Grid item xs={6} sm={6} className={classes.modalanimation}>
                                        <Lottie className={classes.animation} animationData={animationData} />
                                    </Grid>
                                </div>
                            </Grid>{/* robot animation grid */}
                        </Grid>
                    </div>
                </Fade>
            </Modal>
            {/* card modal info */}
        </>
    );
}
