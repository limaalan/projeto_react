import { Children, createContext, useCallback, useMemo, useState } from 'react'
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
    logout:()=>void,
    isAuthenticated:boolean,
    login : (email:string , password:string )=> Promise<string|void>

}

interface IAuthProviderProps{
    children:React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider : React.FC<IAuthProviderProps> = ({children})=>{

  const [accessToken , setAccessToken] = useState<string>();
    
  const handleLogin = useCallback(async ( email:string, password:string)=>{
    const result = await AuthService.auth(email, password);
    if (result instanceof Error){
        return result.message
    } else {
        setAccessToken(result.accessToken);
    }
  

},[]);

    
  const handleLogout = useCallback(()=>{
    setAccessToken(undefined)
  },[]);

  const isAuthenticated=useMemo(()=>!!accessToken,[accessToken]); // Ou accessToken !== undefined
    
    return(
        <AuthContext.Provider value = {{isAuthenticated, login:handleLogin, logout:handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}