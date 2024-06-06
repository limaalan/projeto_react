import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

export const errorInterceptor = (error:AxiosError) =>{

    if (error.message ==='Network Error'){
        return Promise.reject(new Error ('Erro de conexão.'));
    }

    if (error.response?.status=== StatusCodes.UNAUTHORIZED ){
        // Faz algo de não tiver autorizado
    }

    return Promise.reject(error);

}