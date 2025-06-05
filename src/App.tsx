
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeCliente from "./Pages/HomeCliente";
import HomeAdmin from "./Pages/HomeAdmin";
import CadastroImovel from "./Pages/CadastroImovel";
import ResultadosBusca from "./Pages/ResultadoBusca";
import DetalhesImovel from "./Pages/DetalhesImovel";
import Contato from "./Pages/Contato";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import Contato from "./Pages/Contato";
// import Sobre from "./Pages/Sobre";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeCliente />} />
        {/* <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} /> */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/cadastro-imovel" element={<CadastroImovel />} />
        <Route path="/resultado" element={<ResultadosBusca />} />
        <Route path="/imovel/:id" element={<DetalhesImovel />} />
        <Route path="/contato" element={<Contato />} />

      </Routes>
    </BrowserRouter>
  );
}
