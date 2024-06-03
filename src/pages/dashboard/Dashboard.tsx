import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Sou o dashboard"
      barraDeFerramentas={
        <FerramentasDaListagem
            mostrarInputBusca
            textoBotaoNovo="Nova"
        />}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
