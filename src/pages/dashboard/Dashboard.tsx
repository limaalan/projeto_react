import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Sou o dashboard"
      barraDeFerramentas={
        <FerramentasDeDetalhe
        mostrarBotaoNovo={false}
        mostrarBotaoSalvar={false}
        mostrarBotaoSalvarEFechar={false}
        mostrarBotaoApagar={false}
        mostrarBotaoVoltar={false}   
        />}
    >
		<Box width='100%' display='flex'>
			<Grid container >
				<Grid item container spacing={2} padding={1}>
					<Grid item xs={12} sm={12} md={6} lg = {4} xl={2}>
						<Card>
							
							<CardContent>
								<Typography variant="h5" align="center"> Total de Cidades</Typography>

								<Box padding={6} display='flex' justifyContent='center' alignItems='center'>
									<Typography variant="h1"> 25</Typography>
								</Box>
							</CardContent>

						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg = {4} xl={2}>
						<Card>
							
							<CardContent>
								<Typography variant="h5" align="center"> Total de Pessoas</Typography>

								<Box padding={6} display='flex' justifyContent='center' alignItems='center'>
									<Typography variant="h1"> 10</Typography>
								</Box>
							</CardContent>

						</Card>
					</Grid>

					
				</Grid>
			</Grid>

		</Box>
        

    </LayoutBaseDePagina>
  );
};
