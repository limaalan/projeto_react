import { LayoutBaseDePagina } from "../../shared/layouts";
import { BarraDeFerramentas } from "../../shared/components";
export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Sou o dashboard"
      barraDeFerramentas={
        <BarraDeFerramentas
            mostrarInputBusca
            textoBotaoNovo="Nova"
        />}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
