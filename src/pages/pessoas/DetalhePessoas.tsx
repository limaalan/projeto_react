import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";
import { HandymanOutlined } from "@mui/icons-material";



export const DetalhePessoas : React.FC =()=>{
    const {id = 'nova'} = useParams<'id'>();    
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const hadleSave = () =>{ console.log('Salvando...')}
    const hadleDelete = (id:number) =>{
        // eslint-disable-next-line no-restricted-globals
    if (confirm('Deseja apagar o registro ?')){
        PessoasService.deleteById(id)
          .then(result =>{
            if (result instanceof Error) {
              alert (result.message)
            }else {
              navigate('/pessoas')
              alert("Registro apagado com sucesso")
  
            }
          });
      };
    }

    useEffect(()=>{
        if(id!=='nova'){
            setIsLoading(true);
            
            PessoasService.getById(Number(id))
            .then((result)=>{
                    setIsLoading(false);
                    
                    if ( result instanceof Error){
                        alert(result.message);
                        navigate('/pessoas');
                    
                    } else {
                        setNome(result.nomeCompleto)
                        console.log(result);
                    }
                })
        }
    },[id]);

    return( 
    <LayoutBaseDePagina
    titulo={id === 'nova'? 'Criar nova pessoa':nome}
    barraDeFerramentas={<FerramentasDeDetalhe
        textoBotaoNovo="Nova"
        mostrarBotaoApagar = { id!== 'nova'}
        mostrarBotaoNovo = { id!=='nova'}
        mostrarBotaoSalvar
        mostrarBotaoSalvarEFechar
        mostrarBotaoVoltar

        aoClicarEmSalvar={hadleSave}
        aoClicarEmSalvarEFechar={hadleSave}
        aoClicarEmApagar={()=>hadleDelete(Number(id))}
        aoClicarEmNovo={()=>{navigate('/pessoas/detalhe/nova')}}
        aoClicarEmVoltar={()=>{navigate('/pessoas')}}

    />}
    >
        {isLoading&&(
            <LinearProgress variant='indeterminate'/>
        )}

        <p>Detalhes! da pessoa = {id}</p>
    </LayoutBaseDePagina>
    
    )

}