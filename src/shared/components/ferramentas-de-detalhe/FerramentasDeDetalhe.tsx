import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;
  mostrarBotaoApagar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
  aoClicarEmApagar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,
  mostrarBotaoApagar = true,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,
  mostrarBotaoApagarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
  aoClicarEmApagar,
}) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={1}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography variant = 'button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown &&(
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          <Typography variant = 'button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && <Skeleton width={180} height={60} />}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography variant = 'button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}
      
      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography variant = 'button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Novo
          </Typography>

        </Button>
      )}
      {mostrarBotaoSalvarCarregando && !smDown && <Skeleton width={110} height={60} />}

      {mostrarBotaoVoltar&&(mostrarBotaoApagar||mostrarBotaoNovo||mostrarBotaoSalvar||mostrarBotaoSalvarEFechar)&&(
        <Divider variant="middle" orientation="vertical" />
      )}
        
      
      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography variant = 'button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>

        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};
