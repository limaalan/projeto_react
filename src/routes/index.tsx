import {Navigate, Route, Routes} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDrawerContext} from '../shared/context';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas } from '../pages';

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
                label:'Pessoas',
                icon: 'people',
                path:'/pessoas'
            }
            
        ])
    },[]);

    //<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste!</Button>
    return(
        <Routes>
            <Route path ='/pagina-inicial' element = { <Dashboard/> }/>
            <Route path ='/pessoas' element = { <ListagemDePessoas/> }/>
            {/* <Route path ='/cidades/detalhe/:id' element = { <Dashboard/> }/> */}
            <Route path = "*" element = {<Navigate to="/pagina-inicial"/>} />
        </Routes>
    )

};