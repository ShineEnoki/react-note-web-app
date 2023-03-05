import React,{useEffect, useState} from 'react';



import { Container } from '@mui/system';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

const db = new Dexie('notesApp');
db.version(1).stores({
    notesData: "++id,title,details,category"
})

const { notesData } = db;

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
}



export default function Notes() {
    const [notes, setNotes] = useState([]);
    
    const allItems = useLiveQuery(() => notesData.toArray(), []);
    useEffect(() => {
        if (allItems) {
          setNotes(allItems);
        }
      }, [allItems]);



    // try to get data from json server
    // useEffect(() => {
    //     fetch('http://localhost:8000/notes')
    //       .then(res => res.json())
    //       .then(data => setNotes(data))
    //   }, [])
    
    // trying to get data from index db server
    

    //   this function will try to delete notes from djson server
    const handleDelete = async (id) => {
        // delete notes from json-server
        // fetch('http://localhost:8000/notes/' + id, {
        //     method: 'DELETE',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // });

        await notesData.delete(id);


        const newNote = notes.filter(note => note.id !== id);
        setNotes(newNote);
    }
    
    return (
        <Container >
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {/* array of JSX items */}
                {notes.map(data => (
                    <div item   key={data.id}>
                        <NoteCard data={data} handleDelete={handleDelete} />
                    </div>
                ))}
            </Masonry>
            
           
                
                    
        </Container>
    )
}
