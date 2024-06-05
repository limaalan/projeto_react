import {Navigate, Route, Routes} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useAppThemeContext, useDrawerContext} from '../shared/context';
import { useEffect } from 'react';
import { Dashboard, ListagemDeCidade } from '../pages';

export const AppRoutes = ()=>{
    const {setDrawerOptions} = useDrawerContext();

    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página Inicial',
                icon: 'home',
                path:'/pagina-inicial'
            },
            {
                label:'Cidades',
                icon: 'location_city',
                path:'/cidades'
            }
            
        ])
    },[]);

    //<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste!</Button>
    return(
        <Routes>
            <Route path ='/pagina-inicial' element = { <Dashboard/> }/>
            <Route path ='/cidades' element = { <ListagemDeCidade/> }/>
            {/* <Route path ='/cidades/detalhe/:id' element = { <Dashboard/> }/> */}
            <Route path = "*" element = {<Navigate to="/pagina-inicial"/>} />
        </Routes>
    )

};