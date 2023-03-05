import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes.jsx'
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import Layout from './components/Layout.jsx';


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
            <Router>
                <Layout >
                    <Switch>
                        <Route exact path="/">
                            <Notes />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
