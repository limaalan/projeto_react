import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams , setSearchParams] = useSearchParams();
  const {debounce} = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

    const busca = useMemo(()=>{
        return searchParams.get('busca') ||''
    },[searchParams]);
    

    useEffect(()=>{
      setIsLoading(true);

      debounce(()=>{

              PessoasService.getAll(undefined, undefined, busca)
              .then((result)=>{
                // Finalizou a consulta, muda 'isLoading' pra falso
                setIsLoading(false);

                if(result instanceof Error){ alert (result.message);}
                else {
                  (console.log(result));
                  setRows(result.data)
                  setTotalCount(result.totalCount)
                }
              })
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
      <TableContainer component={Paper} variant="outlined" sx={{margin:1 , width:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
          {rows.map(row=> (
          
            <TableRow key = {row.id}>
              <TableCell>Ações</TableCell>
              <TableCell>{row.nomeCompleto}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>

          ))}

          </TableBody>

          <TableFooter>
            {isLoading && (
              <LinearProgress variant="indeterminate"/>
            )}
          </TableFooter>
        </Table>
      </TableContainer>



    </LayoutBaseDePagina>
  );
};
