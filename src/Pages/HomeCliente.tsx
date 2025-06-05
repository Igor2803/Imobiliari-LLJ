import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import BannerCarousel from "../Components/BannerCarousel";
import Footer from "../Components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCliente() {
  const [negocio, setNegocio] = useState("Venda");
const [tipo, setTipo] = useState("Casa");
const [cidade, setCidade] = useState("");
const navigate = useNavigate();
const handleBuscar = () => {
  navigate(
    `/resultado?negocio=${negocio}&tipo=${tipo}&localizacao=${cidade}`
  );
};
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar />
          {/* Botão flutuante WhatsApp */}
          <a
  href="https://wa.me/11940000000"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 bg-green-500 rounded-full p-3 shadow-lg z-50 hover:bg-green-600 transition flex items-center justify-center"
>
  <FaWhatsapp className="w-8 h-8 text-white" />
</a>
      {/* Barra de busca */}
      <div className="bg-gray-200 py-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center px-4">
      <select
  className="p-2 border rounded w-40"
  value={negocio}
  onChange={(e) => setNegocio(e.target.value)}
>
  <option>Aluguel</option>
  <option>Venda</option>
</select>
<select
  className="p-2 border rounded w-40"
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
>
  <option>Apartamento</option>
  <option>Casa</option>
  <option>Comercial</option>
</select>

<input
  type="text"
  placeholder="Bairro ou cidade"
  className="p-2 border rounded w-60"
  value={cidade}
  onChange={(e) => setCidade(e.target.value)}
/>
<button
  onClick={handleBuscar}
  className="bg-[#12304f] text-white px-4 py-2 rounded hover:bg-[#0f263d] transition"
>
  Buscar
</button>
        </div>
        
      </div>

          {/* Carousel automático */}
      <BannerCarousel />
      
      <Footer />

      </div>


  );
}
