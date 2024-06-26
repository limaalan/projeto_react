import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams , setSearchParams] = useSearchParams();
  const {debounce} = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const busca = useMemo(()=>{
      return searchParams.get('busca') ||''
  },[searchParams]);
    
  const pagina = useMemo(()=>{
    return Number(searchParams.get('pagina') ||'1')
  },[searchParams]);


  useEffect(()=>{
    setIsLoading(true);
    debounce(()=>{
      PessoasService.getAll(pagina, undefined, busca)
        .then((result)=>{
          // Finalizou a consulta, muda 'isLoading' pra falso
          setIsLoading(false);
            if(result instanceof Error){ alert (result.message);}
            else {
              // (console.log(result));
              setRows(result.data)
              setTotalCount(result.totalCount)
            }
        })
    })
  },[busca,pagina])
    
  const handleDelete = (id:number)=>{
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Deseja apagar o registro ?')){
      PessoasService.deleteById(id)
        .then(result =>{
          if (result instanceof Error) {
            alert (result.message)
          }else {
            setRows(oldrows=>[ ...oldrows.filter(oldrow=> oldrow.id!==id)])
            alert("Registro apagado com sucesso")

          }
        });
    };
  }

  return (
    <LayoutBaseDePagina
          titulo="Listagem de pessoas"
          barraDeFerramentas={
            <FerramentasDaListagem 
                mostrarInputBusca
                textoBotaoNovo="Nova"
                aoClicarEmNovo={()=> navigate('/pessoas/detalhe/nova')}
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto=>setSearchParams({busca:texto , pagina:'1'})}
          />}   >
      <TableContainer component={Paper} variant="outlined" sx={{margin:1 , width:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
          {rows.map(row=> (
          
            <TableRow key = {row.id}>
              <TableCell sx={{padding:0}}>
                
                <IconButton 
                  size = 'small' 
                  onClick={()=> handleDelete(row.id)}>
                    <Icon>delete</Icon>
                </IconButton>

                <IconButton 
                  size = 'small'
                  onClick={()=>navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                </IconButton>

              </TableCell>
              <TableCell>{row.nomeCompleto}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>

          ))}

          </TableBody>

          {totalCount===0 && !isLoading &&(
            <caption>{process.env.REACT_APP_LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <LinearProgress variant="indeterminate"/>
                    </TableCell>
                  </TableRow>
                )}
                {totalCount> Number(process.env.REACT_APP_LIMITE_DE_LINHAS) && !isLoading &&(

                  <TableRow>
                    <TableCell colSpan={3}>
                      <Pagination 
                        count = {Math.ceil(totalCount/ Number(process.env.REACT_APP_LIMITE_DE_LINHAS))}
                        page = {pagina}
                        onChange= {(e,newPage)=>{
                          setSearchParams({busca, pagina:newPage.toString()}, {replace:true})
                        }}
                      />
                    </TableCell>
                </TableRow>
                )}

          </TableFooter>
        </Table>
      </TableContainer>



    </LayoutBaseDePagina>
  );
};
