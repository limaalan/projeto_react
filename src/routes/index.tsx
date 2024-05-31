import {Navigate, Route, Routes} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';
import { useAppThemeContext, useDrawerContext} from '../shared/context';

export const AppRoutes = ()=>{
    const {toggleDrawerOpen} = useDrawerContext();

    return(
        <Routes>
            <Route path ='/pagina-inicial' element = { <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste!</Button> }/>
            <Route path = "*" element = {<Navigate to="/pagina-inicial"/>} />
        </Routes>
    )

};