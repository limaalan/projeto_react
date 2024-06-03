import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../context";
import { ReactNode } from "react";

interface ILayoutBaseDePagina{
    children:React.ReactNode
    titulo : string
    barraDeFerramentas?: ReactNode
}

export const LayoutBaseDePagina:React.FC<ILayoutBaseDePagina> = ({children, titulo,barraDeFerramentas})=>{
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const {toggleDrawerOpen}= useDrawerContext();
    
    return(
        <Box height='100%' display='flex' flexDirection='column' gap={1} > {/*Gap da distancia do MUI*/ }
            <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown? 6 : mdDown? 8 : 12)} >
                {
                    smDown? // smDown&&( iconbuton ....)
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                    :undefined
                }
                

                <Typography 
                    variant = {smDown? 'h5': mdDown ? 'h4' : 'h3'}
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'

                    >
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (<Box> 
                {barraDeFerramentas}
            </Box>)}

            <Box 
                flex = {1} /* Ocupa todo o espaço disponível*/
                overflow="auto" /* Para ter scroll apenas nesse box*/>
                {children}

            </Box>
        </Box>
    );
}