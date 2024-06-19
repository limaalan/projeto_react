import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";

import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3).max(150),
});

export const DetalheCidades: React.FC = () => {
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          // Criando uma nova cidade
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              // Se deu erro
              alert(result.message);
            } else {
              // Senão

              navigate(
                `/cidades${isSaveAndClose() ? "" : `/detalhe/${result}`}`
              );
            }
          });
        } else {
          // Editando uma cidade
          CidadesService.updateById({ id: Number(id), ...dadosValidados }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/cidades");
                }
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        // console.log(errors.inner);
        formRef.current?.setErrors(validationErrors);
      });
  };
  const hadleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Deseja apagar o registro ?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate("/cidades");
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          // console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Criar nova cidade" : nome}
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
            navigate("/cidades/detalhe/nova");
          }}
          aoClicarEmVoltar={() => {
            navigate("/cidades");
          }}
        />
      }
    >
      <VForm
        onSubmit={handleSave}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        ref={formRef}
      >
        <Box
          margin={1}
          component={Paper}
          variant="outlined"
          display="flex"
          flexDirection="column"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate"></LinearProgress>
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6"> Geral </Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Nome"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
