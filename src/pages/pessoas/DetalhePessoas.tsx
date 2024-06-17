import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from 'yup'

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, VForm , useVForm, IVFormErrors} from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";

interface IFormData {
  email: string 
  cidadeId: number 
  nomeCompleto:string
}

const formValidationSchema:yup.ObjectSchema<IFormData> = yup.object().shape({
  email : yup.string().required().email(),
  cidadeId: yup.number().required().integer().moreThan(0),
  nomeCompleto: yup.string().required().min(3).max(150) ,
});


export const DetalhePessoas: React.FC = () => {
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const {formRef, save, saveAndClose , isSaveAndClose} = useVForm();



  const handleSave = (dados:IFormData) => {
    
    formValidationSchema.validate(dados, { abortEarly : false })
      .then((dadosValidados)=>{
        setIsLoading(true);

        if ( id ==='nova'){ // Criando um novo pessoa
          PessoasService
            .create(dadosValidados)
            .then((result)=>{
              
              setIsLoading(false);

              if (result instanceof Error){ 
                alert(result.message)
              
              } else { 
    
                navigate(`/pessoas${isSaveAndClose()?'':`/detalhe/${result}`}`)
              
              }
            })
          // console.log(dadosValidados);
    
        } else { // Editando um pessoa
          PessoasService
            .updateById({id:Number(id), ...dadosValidados })
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

      })
      .catch((errors:yup.ValidationError)=>{
        const validationErrors :IVFormErrors = { }
        errors.inner.forEach(error => {
          if (!error.path) return
          validationErrors[error.path] = error.message;
        })

        // console.log(errors.inner);
        formRef.current?.setErrors(validationErrors)
      })

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
            // console.log(result);

            formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email : '',
        cidadeId : undefined,
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
                {/* <VTextField disabled= {isLoading} fullWidth label= "Cidade" name="cidadeId" /> */}
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

    </LayoutBaseDePagina>
  );
};
