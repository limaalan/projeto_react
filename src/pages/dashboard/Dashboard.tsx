import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Sou o dashboard"
      barraDeFerramentas={
        <FerramentasDeDetalhe
        mostrarBotaoSalvarEFechar
        //mostrarBotaoSalvarEFecharCarregando
        />}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
