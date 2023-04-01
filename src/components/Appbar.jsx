import React from 'react';
import format from "date-fns/format";
import logo from '../assets/kagura.jpg';



//mui components
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            display: "flex",
            justifyContent: 'flex-end'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px'
            // [theme.breakpoints.down('sm')]: {
            //     display: "flex",
            //     justifyContent: 'space-between'
            // }
        },
        date: {
            color: theme.palette.secondary[500],
            [theme.breakpoints.down('md')]: {
                display: "flex",
                justifyContent: 'right'
            }
        },
        
        avatar: {
            marginLeft: 15,
        },
        // reload: {
        //     margin: 10,
        //     color: green[600],
        //     fontSize: 20,
        //     "&:hover": {
        //         backgroundColor: 'white',
        //         border: '1px solid green',
        //         padding: '0 10px',
        //         borderRadius: 10
        //     }
        // },
    }
})



const Appbar = () => {
    const theme = useTheme();

    const classes = useStyles(theme);

    return (
        <div>
            <AppBar
                className={classes.appbar}
                elevation={3}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography
                        className={classes.date}
                        variant="h6"
                    >
                        {format(new Date(), "do MMMM")}
                    </Typography>

                    {/* Since react-router-dom is updated to 6.4+ there is no need to reload */}
                    {/* <a
                        className={classes.reload}
                        onClick={() => navigate('/')}>
                        Reload Notes
                    </a> */}

                    <Typography>Shine</Typography>

                    <Avatar src={logo} className={classes.avatar} />

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Appbar