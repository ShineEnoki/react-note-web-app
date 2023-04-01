import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useTheme } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const db = new Dexie('notesApp');
db.version(1).stores({
    notesData: "++id,title,details,category"
})

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
}

const useStyles = makeStyles((theme) => {
    return {
        container: {
            margin: '80px auto'
        },
        addButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            backgroundColor: grey[300],
            borderRadius: 10
        }
    }
})


export default function Notes() {
    const [notes, setNotes] = useState([]);

    const theme = useTheme();

    const classes = useStyles(theme);

    const allItems = useLiveQuery(() => db.notesData.toArray(), []);

    //fetch data from indexDB and put the data to allIttems
    useEffect(async () => {
        if (!allItems) {
            await db.notesData.toArray().then((items) => {
                setNotes(items);
            });
        }
        if (allItems && allItems.length > 0) {
            setNotes(allItems);
        };
    }, [allItems]);

    const handleDelete = async (id) => {
        await db.notesData.delete(id);
        const newNote = notes.filter(note => note.id !== id);
        setNotes(newNote);
    }

    return (
        <Container className={classes.container}>

            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {notes.map(data => (
                    <div item key={data.id}>
                        <NoteCard data={data} handleDelete={handleDelete} />
                    </div>
                ))}

                <div className={classes.addButton}>
                    <Link to='/create' >
                        <ControlPointIcon />
                    </Link>

                </div>
            </Masonry>


        </Container>
    )
}
