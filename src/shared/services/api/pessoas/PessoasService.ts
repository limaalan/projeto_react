import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa{
    id:number;
    email:string;
    nomeCompleto:string;
    cidadeId:number;
}

interface IDetalhePessoa{
    id:number;
    email:string;
    nomeCompleto:string;
    cidadeId:number;
}

type IPessoasComTotalCount={
    data:IListagemPessoa[];
    totalCount : number;
}


const getAll = async (page=1 , limit = Environment.LIMITE_DE_LINHAS, filter= '' ): Promise<IPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?page=${page}&limit=${limit}&filter=${filter}`
        const{data,headers} = await Api.get(urlRelativa)
        
        if (data){
            return {
                data,
                totalCount:Number(headers['x-total-count']|| Environment.LIMITE_DE_LINHAS),}
        }
        return new Error("Erro a listar os registros");
    } catch (error) {
        console.error(error);
        return new Error (( error as {message:string}).message || 'Erro ao listar registros.');
        
    }    
};

// const getById = async (id:number): Promise<IListagemPessoa | Error> => {
//     try {
//         const urlRelativa = `/pessoas/${id}`
//         const {}
        
//     } catch (error) {
        
//     }

// };

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
