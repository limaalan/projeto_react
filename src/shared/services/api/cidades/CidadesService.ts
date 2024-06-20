import { Api } from "../axios-config";

export interface IListagemCidade{
    id:number;
    nome:string;
}

export interface IDetalheCidade{
    id:number;
    nome:string;
}

type ICidadesComTotalCount={
    data:IListagemCidade[];
    totalCount : number;
}


const getAll = async (page=1 , limit = Number(process.env.REACT_APP_LIMITE_DE_LINHAS), filter= '' ): Promise<ICidadesComTotalCount | Error> => {
    try {
        const urlRelativa = `/cidades?page=${page}&limit=${limit}&filter=${filter}`
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

const getById = async (id:number): Promise<IDetalheCidade | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`
        const {data} = await Api.get(urlRelativa)

        if(data) return data

        return new Error("Erro ao buscar registro.")
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message|| 'Erro ao listar registro.');
        
    }

};

const create = async (dados:Omit<IListagemCidade,'id'>): Promise<number | Error> => {
    try {
        const urlRelativa = '/cidades';
        const {data} = await Api.post<IDetalheCidade>(urlRelativa,dados);
        
        if (data) return Number(data);

        return new Error ("Erro ao criar registro.")

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao criar registro.');
    }
};

const updateById = async (dados :IDetalheCidade): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${dados.id}`;
        await Api.put<IDetalheCidade>(urlRelativa,dados);
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao atualizar registro.');
    }

};

const deleteById = async (id:number): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;
        await Api.delete(urlRelativa);
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro ao deletar registro.');
    }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
