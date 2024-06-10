import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LinearProgress, TextField } from "@mui/material";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string 
  cidadeId: number 
  nomeCompleto:string
}

export const DetalhePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = (dados:IFormData) => {
    
    setIsLoading(true);
    if ( id ==='nova'){
      PessoasService
        .create(dados)
        .then((result)=>{
          
          setIsLoading(false);
          if (result instanceof Error){
            alert(result.message)
          } else {
            console.log(`Testando ${result}`);
            navigate(`/pessoas/detalhe/${result}`) // Após criar, navega para a página de detalhes da pessoa
          }
        })
      console.log(dados);
    } else {
      PessoasService
        .updateById({id:Number(id), ...dados })
        .then((result)=>{
          
          setIsLoading(false);
          if (result instanceof Error){
            alert(result.message)
          } else {
            //navigate(`/pessoas/detalhe/${id}`) // Após editar, navega para a página de detalhes da pessoa
          }
        })
    }
  };
  const hadleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Deseja apagar o registro ?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate("/pessoas");
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate("/pessoas");
          } else {
            setNome(result.nomeCompleto);
            console.log(result);

            formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Criar nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoSalvar
          mostrarBotaoSalvarEFechar
          mostrarBotaoVoltar
          aoClicarEmSalvar={()=>formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={()=>formRef.current?.submitForm()}
          aoClicarEmApagar={() => hadleDelete(Number(id))}
          aoClicarEmNovo={() => {
            navigate("/pessoas/detalhe/nova");
          }}
          aoClicarEmVoltar={() => {
            navigate("/pessoas");
          }}
        />
      }
    >
      <Form 
        onSubmit={(dados) => handleSave(dados)} 
        //initialData={{}}  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        ref ={formRef} >
        
        <VTextField placeholder = "Nome Completo " name="nomeCompleto" />
        <VTextField placeholder= "Email" name="email" />
        <VTextField placeholder= "Cidade ID" name="cidadeId" />

      </Form>

      {isLoading&&(
        <LinearProgress variant='indeterminate'/>
      )}
      
    </LayoutBaseDePagina>
  );
};
