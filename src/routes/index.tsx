import {Navigate, Route, Routes} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';


export const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path ='/pagina-inicial' element = { <Button variant='contained' color='primary'>Teste!</Button> }/>
            <Route path = "*" element = {<Navigate to="/pagina-inicial"/>} />
        </Routes>
    )

};