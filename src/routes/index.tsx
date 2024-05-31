import {Navigate, Route, Routes} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';
import { useAppThemeContext, useDrawerContext} from '../shared/context';
import { useEffect } from 'react';

export const AppRoutes = ()=>{
    const {toggleDrawerOpen,setDrawerOptions} = useDrawerContext();

    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página Inicial',
                icon: 'home',
                path:'/pagina-inicial'
            },
            {
                label:'Outra página',
                icon: 'question_mark',
                path:'/outra-pagina'
            }
        ])
    },[]);

    return(
        <Routes>
            <Route path ='/pagina-inicial' element = { <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste!</Button> }/>
            {/* <Route path = "*" element = {<Navigate to="/pagina-inicial"/>} /> */}
        </Routes>
    )

};