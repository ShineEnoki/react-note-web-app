import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/styles';

//import mui components
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

//mui icons
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";

//from others component
import { NavLink } from 'react-router-dom';



const drawerWidth = 200;
const useStyles = makeStyles((theme) => {
    return {
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
            },
        },
        title: {
            padding: theme.spacing(2),
        },
        drawerPaper: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
            },
        },
        navLinks: {
            display: 'flex', 
            flexDirection: 'row',
            padding: '5px 10px',
            justifyContent: 'center',
            textDecoration: 'none'
        },
        active: {
            backgroundColor: "grey",
        },  
    }
});

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

const Sidebar = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div>
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
                        S Note
                    </Typography>
                </div>

                {/* list / links */}
                <List>
                    {menuItems.map((item) => (
                        <NavLink to={item.path} 
                            className={classes.navLinks}
                            actiiveClassName={classes.active}  key={item.text} 
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ textDecoration: 'none !important' }} id="sideDraw-ListItemText" />
                        </NavLink>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar