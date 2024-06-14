import { Api } from "../axios-config"

interface IAuth {
    accessToken: string ,
}

const auth = async (email:string , password:string):Promise<IAuth|Error> =>{
    try {
        const { data } = await Api.post<IAuth>('/entrar',{email:email, senha:password });

        if(data){
            console.log(data)
            return data;
        } 

        return new Error('Erro ao criar o registro');

    } catch (error) {
        console.error(error)
        return new Error((error as {message:string}).message || 'Erro ao se autenticar');
        
    }


}

export const AuthService = {
    auth
}