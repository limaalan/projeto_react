import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = "true",
}) => {

  const theme = useTheme();
  
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder={process.env.REACT_APP_INPUT_DE_BUSCA}
          fullWidth
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
