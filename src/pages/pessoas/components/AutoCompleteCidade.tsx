import { Autocomplete, CircularProgress, TextField, debounce } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";
import { clear } from "console";

type TAutoCompleteOption = {
  id : number , 
  label: string ,
}
interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean  

}

export const AutoCompleteCidade:React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading}) => {
  const {fieldName,registerField,defaultValue,error,clearError} = useField('cidadeId')

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {debounce} = useDebounce();
  const [busca, setBusca] = useState('');
  const [selectedId , setSelectedId] = useState<number|undefined>(undefined);

  const autoCompleteSelectedOption = useMemo(()=>{
    if (!selectedId)return null
    
    const selectedOption  = opcoes.find(opcao=>opcao.id === selectedId);
    
    return selectedOption? selectedOption:null

  },[selectedId,opcoes])

  useEffect(()=>{
    registerField({
      name : fieldName,
      getValue:()=>selectedId,
      setValue:(_,newSelectedId)=>setSelectedId(newSelectedId),
    })
  },[registerField,fieldName,selectedId])

  useEffect(()=>{
    setIsLoading(true);
    debounce(()=>{
      CidadesService.getAll(1,undefined,busca) 
        .then((result)=>{
          // Finalizou a consulta, muda 'isLoading' pra falso
          setIsLoading(false);
            if(result instanceof Error){
              // alert (result.message);
            }
            else {
              console.log(result);
              setOpcoes(result.data.map(cidade =>({id:cidade.id , label:cidade.nome})))
            }
        })
    })
  },[busca])

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem Opções"
      loadingText= "Carregando..."
      
      disablePortal

      value={autoCompleteSelectedOption}
      options={opcoes} // Lista com as opções do dropdown
      loading ={isLoading}
      disabled = {isExternalLoading}

      popupIcon= {(isLoading || isExternalLoading)? <CircularProgress size = {28}/>:undefined}
      onInputChange={(e,newValue)=>{setBusca(newValue)}}
      onChange={(e,newValue)=>{ 
        setSelectedId(newValue?.id);
        setBusca('');
        clearError();
      }}
      renderInput={(params)=>(
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
          
        />
      )}
      
    />

  
  ) 
    
};
