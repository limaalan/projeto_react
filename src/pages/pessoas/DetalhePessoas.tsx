import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { VTextField, VForm , useVForm} from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string 
  cidadeId: number 
  nomeCompleto:string
}

export const DetalhePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const {formRef, save, saveAndClose , isSaveAndClose} = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = (dados:IFormData) => {
    
    setIsLoading(true);
    if ( id ==='nova'){ // Criando um novo usuário
      PessoasService
        .create(dados)
        .then((result)=>{
          
          setIsLoading(false);
          if (result instanceof Error){ // Se deu erro
            alert(result.message)
          
          } else { // Senão

            navigate(`/pessoas${isSaveAndClose()?'':`/detalhe/${result}`}`)
          
          }
        })
      console.log(dados);

    } else { // Editando um usuário
      PessoasService
        .updateById({id:Number(id), ...dados })
        .then((result)=>{
          
          setIsLoading(false);
          if (result instanceof Error){
            alert(result.message)
          } else {
            if (isSaveAndClose()) { 
              navigate('/pessoas'); }

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
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email : '',
        cidadeId : '',
      })
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
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
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
      <VForm 
        onSubmit={handleSave} 
        //initialData={{}}  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        ref ={formRef} >
        <Box
          margin={1}
          component={Paper}
          variant='outlined'
          display='flex'
          flexDirection='column'
        >
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading&&(
              <Grid item> <LinearProgress variant='indeterminate'></LinearProgress></Grid>
            )}

            <Grid item> <Typography variant='h6'> Geral </Typography></Grid>

            <Grid container item direction='row'spacing={2}>
              <Grid item xs={12} sm = {8} md = {6} lg = {4} xl = {4}>
                <VTextField 
                  disabled= {isLoading}
                  fullWidth
                  label = "Nome Completo "
                  name="nomeCompleto"
                  onChange={e=>setNome(e.target.value)} />
              </Grid>
              
            </Grid>

            <Grid container item direction='row'spacing={2}>
              <Grid item xs = {12} sm = {8} md = {6} lg = {4} xl = {4}>
                <VTextField disabled= {isLoading} fullWidth label= "Email" name="email" />

              </Grid>
            </Grid>

            <Grid container item direction='row'spacing={2}>
              <Grid item xs={12} sm = {8} md = {6} lg = {4} xl = {4}>
                <VTextField disabled= {isLoading} fullWidth label= "Cidade" name="cidadeId" />

              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

    </LayoutBaseDePagina>
  );
};
