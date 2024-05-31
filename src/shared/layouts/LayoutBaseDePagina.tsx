import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../context";

interface ILayoutBaseDePagina{
    children:React.ReactNode
    titulo : string
}

export const LayoutBaseDePagina:React.FC<ILayoutBaseDePagina> = ({children, titulo})=>{
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const {toggleDrawerOpen}= useDrawerContext();
    
    return(
        <Box height='100%' display='flex' flexDirection='column' gap={1} > {/*Gap da distancia do MUI*/ }
            <Box padding={1} height={theme.spacing(12)} display='flex' alignItems='center'>
                {
                    smDown? // smDown&&( iconbuton ....)
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                    :undefined
                }
                

                <Typography variant = 'h5'>
                    {titulo}
                </Typography>
            </Box>

            <Box> 
                Barra de ferramentas
            </Box>

            <Box>
                {children}

            </Box>
        </Box>
    );
}