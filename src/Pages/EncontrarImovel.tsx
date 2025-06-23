import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { FaWhatsapp } from "react-icons/fa";

export default function EncontrarImovel() {
  const [negocio, setNegocio] = useState("Venda");
  const [tipo, setTipo] = useState("Casa");
  const [cidade, setCidade] = useState("");
  const [imoveis, setImoveis] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImoveis = async () => {
      const ref = collection(db, "imoveis");
      const q = query(ref, limit(5));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImoveis(data);
    };
    fetchImoveis();
  }, []);

  const handleBuscar = () => {
    navigate(`/resultado?negocio=${negocio}&tipo=${tipo}&localizacao=${cidade}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar />

      {/* WhatsApp flutuante */}
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

      {/* Imóveis disponíveis */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#12304f]">Imóveis disponíveis</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {imoveis.map((imovel) => (
            <div
              key={imovel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/imovel/${imovel.id}`)}
            >
              <img
                src={imovel.fotos?.[0]}
                alt={imovel.titulo}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{imovel.titulo}</h3>
                <p className="text-sm text-gray-600">{imovel.bairro}, {imovel.cidade}</p>
                <p className="font-bold text-[#12304f] mt-2">
                  R$ {Number(imovel.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
