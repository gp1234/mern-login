import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import CssBaseline from '@material-ui/core/CssBaseline';


import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import Content from "../../pages/content/index"

const drawerWidth = 240;
const useStyle = makeStyles((theme) => ({
    navBar: {
        backgroundColor: "#001c3c",
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        marginLeft: drawerWidth
        
    }
}))

export default function Dashboard() {

    const classes = useStyle();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.navBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" >FitnessApp</Typography>
                </Toolbar> 
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                        <ListItem component={Link} to="/dashboard/home" button>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <Divider />

                        <ListItem component={Link} to="/dashboard/trainers" button>
                            <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
                            <ListItemText primary={"Lista de Entrenadores"} />
                        </ListItem>

                </List>
            </Drawer>
            <main className={classes.content}>
            <Route path="/dashboard/:contentId" component={Content} />
            </main>
        </div>
    )
}
