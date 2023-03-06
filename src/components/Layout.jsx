import React from "react";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router-dom";
import format from "date-fns/format";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Avatar from "@mui/material/Avatar";
import useTheme from "@mui/system/useTheme";
import { green, purple } from "@mui/material/colors";
import logo from '../assets/kagura.jpg';
import { display } from "@mui/system";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3),
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
            },
        },
        drawerPaper: {

            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
            },
        },
        root: {
            display: "flex",
        },
        active: {
            backgroundColor: "grey",
        },
        title: {
            padding: theme.spacing(2),
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            display: "flex"
        },
        toolbar: theme.mixins.toolbar,
        
        date: {
            flexGrow: 1,
            [theme.breakpoints.down('md')]: {
                display: "flex",
                justifyContent: 'right'
            }
        },
        avatar: {
            marginLeft: 15,
        },
        reload: {
            margin: 10,
            color: green[600],
            fontSize: 20,
            "&:hover": {
                backgroundColor: 'white',
                border: '1px solid green',
                padding: '0 10px',
                borderRadius: 10
            }
        }
    };
});

const Layout = ({ children }) => {
    const classes = useStyles();

    const history = useHistory();

    const location = useLocation();

    const theme = useTheme();

    const menuItems = [
        {
            text: "My Note",
            icon: <SubjectOutlined color="secondary" />,
            path: "/",
        },
        {
            text: "Create",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: "/create",
        },
    ];
    return (
        <div className={classes.root}>

            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={3}
            >
                <Toolbar sx={{
                    [theme.breakpoints.down('sm')]: {
                        display: "flex",
                        justifyContent: 'space-between'
                    }
                }}>
                    <Typography
                        className={classes.date}
                        color="primary"
                        textAlign="center"
                        variant="h6"
                        sx={{ color: "green",
                            [theme.breakpoints.down("sm")]: {
                            display: 'none',
                            alignItems: 'end'
                            }
                        }}
                    >
                        {format(new Date(), "do MMMM")}
                    </Typography>

                    <a  
                        className={classes.reload}
                        onClick={() => history.push('/') }>
                        Reload Notes
                    </a>

                    <Typography>Shine</Typography>

                    <Avatar src={logo} className={classes.avatar} />

                </Toolbar>
            </AppBar>

            {/* side draw */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
                sx={{
                    [theme.breakpoints.down("sm")]: {
                        display: 'none'
                    }
                }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        {" "}
                        S Note{" "}
                    </Typography>
                </div>

                {/* list / links */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={
                                location.pathname !== item.path ? classes.active : null
                            }
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} id="sideDraw-ListItemText" />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>

            
        </div>
    );
};

export default Layout;
