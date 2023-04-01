import React from "react";
import makeStyles from "@mui/styles/makeStyles";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { blue, green, orange, red} from "@mui/material/colors";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (data) => {
            let color = () =>{ switch(data.category){
                case 'work':
                    return red[500] ;
                case 'todos':
                    return orange[500];
                case "reminders":
                    return blue[700];
                default:
                    return green[700];
                };
            }
            return `${color()} !important`;
        }
    }
});

const NoteCard = ({ data, handleDelete }) => {
    const classes = useStyles( data )
    return (
        <Card elevation={1}  >
            <CardHeader
                avatar={ 
                    <Avatar className={classes.avatar} > { data.category[0].toUpperCase() } </Avatar>
                }
                action={
                    <IconButton onClick={()=> handleDelete(data.id)}>
                        <DeleteOutline />
                    </IconButton>
                }
                title={data.title}
                subheader={data.category}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {data.details}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
