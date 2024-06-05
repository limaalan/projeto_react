import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
    const [searchParams , setSearchParams] = useSearchParams();
    const busca = useMemo(()=>{
        return searchParams.get('busca') ||''
    },[searchParams]);
    

    useEffect(()=>{
      PessoasService.getAll(undefined, undefined, busca)
      .then((result)=>{
        if(result instanceof Error) alert (result.message);
        else (console.log(result));
                 
      })
    },[busca])
    
  return (
    <LayoutBaseDePagina
          titulo="Listagem de pessoas"
          barraDeFerramentas={
            <FerramentasDaListagem 
                mostrarInputBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto=>setSearchParams({busca:texto})}
          />}   >

    </LayoutBaseDePagina>
  );
};
