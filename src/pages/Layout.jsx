import React from "react";
import { makeStyles } from "@mui/styles";
import { Outlet} from "react-router-dom";

import useTheme from "@mui/system/useTheme";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";


const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            flexDirection: 'row'
        },
        rightSide: {
            display: 'flex',
            flexDirection: 'column'
        }
}});

const Layout = () => {
    const theme = useTheme();

    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            <Sidebar />
            <div className={classes.rightSide}>
                <Appbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
