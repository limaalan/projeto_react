import { Api } from "../axios-config";

export interface IListagemPessoa{
    id:number;
    email:string;
    nomeCompleto:string;
    cidadeId:number;
}

export interface IDetalhePessoa{
    id:number;
    email:string;
    nomeCompleto:string;
    cidadeId:number;
}

type IPessoasComTotalCount={
    data:IListagemPessoa[];
    totalCount : number;
}


const getAll = async (page=1 , limit = Number(process.env.REACT_APP_LIMITE_DE_LINHAS), filter= '' ): Promise<IPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?page=${page}&limit=${limit}&filter=${filter}`
        const{data,headers} = await Api.get(urlRelativa)
        
        if (data){
            return {
                data,
                totalCount:Number(headers['x-total-count']|| Number(process.env.REACT_APP_LIMITE_DE_LINHAS)),}
        }
        return new Error("Erro a listar os registro.");
    } catch (error) {
        console.error(error);
        return new Error (( error as {message:string}).message || 'Erro ao listar registros.');
        
    }    
};

const getById = async (id:number): Promise<IDetalhePessoa | Error> => {
    try {
        const urlRelativa = `/pessoas/${id}`
        const {data} = await Api.get(urlRelativa)

        if(data) return data

        return new Error("Erro ao buscar registro.")
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message|| 'Erro ao listar registro.');
        
    }

};

const create = async (dados:Omit<IListagemPessoa,'id'>): Promise<number | Error> => {
    try {
        const urlRelativa = '/pessoas';
        const {data} = await Api.post<IDetalhePessoa>(urlRelativa,dados);
        
        if (data) return Number(data);

        return new Error ("Erro ao criar registro.")

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao criar registro.');
    }
};

const updateById = async (dados :IDetalhePessoa): Promise<void | Error> => {
    try {
        const urlRelativa = `/pessoas/${dados.id}`;
        await Api.put<IDetalhePessoa>(urlRelativa,dados);
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao atualizar registro.');
    }

};

const deleteById = async (id:number): Promise<void | Error> => {
    try {
        const urlRelativa = `/pessoas/${id}`;
        await Api.delete(urlRelativa);
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao deletar registro.');
    }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
