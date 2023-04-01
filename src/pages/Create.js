import React, { useState } from 'react';
import Dexie from 'dexie';
import { Howl, Howler } from 'howler';

//hooks
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

//mui components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { Container, FormControl, FormLabel, RadioGroup} from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio  from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

//mui icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

//import assets
import addNoteSound from '../assets/test.wav';

// DB setUp ->
const db = new Dexie('notesApp');
db.version(1).stores({
    notesData: "++id,title,details,category"
})
const { notesData } = db;
//<- End of DB setup


const useStyles = makeStyles({
    field: {
        marginTop: '20px !important',
        marginBottom: '20px !important',
        display: 'block'
    }
})



export default function Create() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');

    //sound on add note
    const sound = new Howl({
        src: [addNoteSound]
    })
    Howler.volume(1)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)

        if (title == '') {
            setTitleError(true)
        }
        if (details == '') {
            setDetailsError(true)
        }
        if (title && details) {

            // adding data to index db
            await notesData.add({
                title, details, category
            }).then(() => navigate('/')).then(sound.play())
        } 
    }

    return (
        <Container size="sm">
            <Typography
                variant="h6"
                color="secondary"
                component="h2"
                gutterBottom
            >
                Create a New Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Note Title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField className={classes.field}
                    onChange={(e) => setDetails(e.target.value)}
                    label="Details"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                />

                
                <FormControl className={classes.field}>
                    <FormLabel sx={{display: 'block'}}> Note Category </FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} sx={{display: 'inline'}}>
                        <FormControlLabel value='money' control={<Radio />} label="Money" />
                        <FormControlLabel value='todos' control={<Radio />} label="Todos" />
                        <FormControlLabel value='reminders' control={<Radio />} label="Reminders" />
                        <FormControlLabel value='work' control={<Radio />} label="Work" /> 
                    </RadioGroup>
                </FormControl>
                <br/>

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}>
                    Submit
                </Button>
            </form>



        </Container>
    )
}
