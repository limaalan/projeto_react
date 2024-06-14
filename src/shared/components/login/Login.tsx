import { Box, Button, Card, CardActions, CardContent, CircularProgress, Icon, LinearProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../context"
import { useEffect, useState } from "react"
import * as yup from 'yup';
import React from "react";

interface ILoginProps { 
    children: React.ReactNode
}

const loginSchema = yup.object().shape({
    email:yup.string().required().email().min(5),
    password:yup.string().required().min(6)
})

export const Login:React.FC<ILoginProps> = ({children}) => {

    const {isAuthenticated, login} = useAuthContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading , setIsLoading ] = React.useState(false);
    
    // useEffect(()=>{
    //     console.log(isLoading)
    // },[isLoading])

    // const handleSubmit = ()=>{
    //     console.log(isLoading)
    //     setIsLoading(true);
    //     console.log("carregando....")
    //     console.log(isLoading)

    //     loginSchema
    //         .validate({email,password},{abortEarly:false}) // Valida
    //         .then((dadosValidados)=>{ // Se deu certo, faz login
    //             login(dadosValidados.email, dadosValidados.password)}) // Se fez login, não está mais carregando
    //                 .then(()=> setIsLoading(false))
            
    //         .catch((errors:yup.ValidationError)=>{ // Se deu erro na validação, altera mensagem de erro
    //             setIsLoading(false)

    //             errors.inner.forEach((error)=>{
    //                 if ( error.path==='email') setEmailError(error.message)
    //                 if ( error.path==='password') setPasswordError(error.message)
    //             })

    //         })
    // }

    const handleSubmit = async ()=>{
        // console.log(`Antes : ${isLoading}`)
        // setIsLoading(true);        
        // console.log(`Depois : ${isLoading}`)

        try{

            await loginSchema.validate({email,password},{abortEarly:false}) // Valida
            await login(email, password) // Se fez login, não está mais carregando
            setIsLoading(false)
                
         } catch{
            console.log('deu ruim')
         } 

    }

    if(isAuthenticated){
        return(<> {children} </> )

    } else {
        return (
            <Box width='100vw' height='100vh' display = 'flex' alignItems='center' justifyContent='center'>
                <Card>
                    <CardContent>
                        <Box display='flex' flexDirection='column' gap = {2} width={250}>
                            <Typography variant='h6' align='center'>Identifique-se</Typography>
                            <TextField 
                                fullWidth
                                label='email'
                                type = 'email'
                                value = {email}
                                disabled={isLoading}
                                error = {!!emailError}
                                helperText={emailError}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={() => setEmailError('')}
                                />
                            
                            <TextField 
                                fullWidth
                                label='Senha'
                                type='password'
                                value = {password}
                                disabled={isLoading}
                                error = {!!passwordError}
                                helperText={passwordError}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={() => setPasswordError('')}
                                />
                            
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box width='100%' display='flex' justifyContent='center' flexDirection='column'>
                            <Button 
                                variant='contained'
                                onClick={()=>{setIsLoading(true) ; handleSubmit()}}
                                disabled={isLoading}
                                // endIcon={isLoading? <CircularProgress variant='indeterminate' size = {20} color='secondary'/> : undefined }
                                endIcon = {<Icon>login</Icon>}
                                >
                                Entrar
                            </Button>
                        {isLoading&&(
                            <LinearProgress variant="indeterminate" color="secondary"/>
                        )}
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        )
    }


}