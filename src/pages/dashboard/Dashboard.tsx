import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { Box, Card, CardContent, Grid, Paper, Typography, debounce } from "@mui/material";
import { useEffect, useState } from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
export const Dashboard = () => {
  
	const [isLoadingCidades,setIsLoadingCidades] = useState(true);
	const [totalCountCidades, setTotalCountCidades] = useState(0);
	const [isLoadingPessoas,setIsLoadingPessoas] = useState(true);
	const [totalCountPessoas, setTotalCountPessoas] = useState(0);

	useEffect(()=>{
		setIsLoadingCidades(true);
		CidadesService.getAll(1)
			.then((result)=>{
				// Finalizou a consulta, muda 'isLoading' pra falso
				setIsLoadingCidades(false);
					if(result instanceof Error){ alert (result.message);}
					else {
						(console.log(result));
						setTotalCountCidades(result.totalCount)
					}
			})
	},[])

	useEffect(()=>{
		setIsLoadingPessoas(true);
		PessoasService.getAll(1)
			.then((result)=>{
				// Finalizou a consulta, muda 'isLoading' pra falso
				setIsLoadingPessoas(false);
					if(result instanceof Error){ alert (result.message);}
					else {
						(console.log(result));
						setTotalCountPessoas(result.totalCount)
					}
			})
	},[])
	
	
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
									
									{isLoadingCidades?
									<Typography variant="h1"> Carregando... </Typography>
									:<Typography variant="h1"> {totalCountCidades} </Typography>
									}

								</Box>
							</CardContent>

						</Card>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg = {4} xl={2}>
						<Card>
							
							<CardContent>
								<Typography variant="h5" align="center"> Total de Pessoas</Typography>

								<Box padding={6} display='flex' justifyContent='center' alignItems='center'>
								{isLoadingPessoas?
									<Typography variant="h1"> Carregando... </Typography>
									:<Typography variant="h1"> {totalCountPessoas} </Typography>
									}
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
