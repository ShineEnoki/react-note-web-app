import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom'
import Notes from './pages/Notes.jsx'
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import Layout from './pages/Layout.jsx';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} >
            <Route index element={<Notes />} />
            <Route path='create' element={<Create />} />
        </Route>
    )
)

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffd700'
        },
        secondary: green,
    },
    typography: {
        fontFamily: 'Shantell Sans',
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}


export default App;
