import React from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import './layout.css';

import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Avatar from '@mui/material/Avatar';


const drawerWidth = 240;

const useStyles = makeStyles((theme) =>{
    return {
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            // width: drawerWidth
            width: () => {
                if(window.innerWidth > 600){
                    return 240;
                } else {
                    return 200;
                }
            }
        },
        drawerPaper: {
            //width: drawerWidth
            width: () => {
                if(window.innerWidth > 600){
                    return 240;
                } else {
                    return 200;
                }
            }
        },
        root: {
            display: 'flex'
        },
        active: {
            backgroundColor: 'grey'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: 'white'
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: 15
        }
        
    }
})
    
const Layout = ({ children }) => {
    const classes = useStyles();

    const history = useHistory()

    const location = useLocation()

    const menuItems = [
        {
            text: "My Note",
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: "Create",
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/create'
        },
        
    ];
    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar 
                className={classes.appbar} 
                // sx={{width: `calc(100% - ${drawerWidth}px)`}} 
                elevation={5}
            >
                <Toolbar>               
                    <Typography 
                        className={classes.date}
                        color='primary' 
                        textAlign='center' 
                        variant='h5' 
                        sx={{color: "green"}}
                    >
                        { format(new Date(), 'do MMMM Y') }
                    </Typography>
                    <Typography >
                        Shine
                    </Typography>
                    <Avatar src='/logo.png' className={classes.avatar}/>
                </Toolbar>
            </AppBar>



            {/* side draw */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant='h5' className={classes.title} > S Note </Typography>
                </div>

                {/* list / links */}
                <List >
                    { menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname !== item.path ? classes.active : null}
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} id='sideDraw-ListItemText' />
                        </ListItem>
                    ))}
                </List>
            </Drawer>



            <div className={classes.page}> 
                <div className={classes.toolbar}></div>
                {children} 
            </div>
        </div>
    )
}

export default Layout