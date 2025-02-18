import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App.jsx'
import {UserProvider} from "./context/user-context.jsx";
import {defaultTheme} from "./components/themes/default.js";
import {ThemeProvider} from "styled-components";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
            <UserProvider>
                <App/>
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
)
