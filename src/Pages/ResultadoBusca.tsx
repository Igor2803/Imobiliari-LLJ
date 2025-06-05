import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Carousel } from "react-responsive-carousel";

export default function ResultadosBusca() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [similares, setSimilares] = useState<any[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const tipoNegocio = searchParams.get("negocio");
  const tipoImovel = searchParams.get("tipo");
  const cidade = searchParams.get("cidade");

  useEffect(() => {
    const fetchImoveis = async () => {
      const ref = collection(db, "imoveis");
      let q = query(ref);

      if (tipoNegocio) q = query(q, where("tipoNegocio", "==", tipoNegocio));
      if (tipoImovel) q = query(q, where("tipoImovel", "==", tipoImovel));
      if (cidade) q = query(q, where("cidade", "==", cidade));

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImoveis(results);

      // Se nenhum imóvel foi encontrado, buscar similares
      if (results.length === 0 && tipoImovel) {
        const similaresQuery = query(ref, where("tipoImovel", "==", tipoImovel));
        const simSnap = await getDocs(similaresQuery);
        const similaresResults = simSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSimilares(similaresResults);
      }
    };

    fetchImoveis();
  }, [tipoNegocio, tipoImovel, cidade]);

  const handleBuscar = () => {
    const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
    const negocio = (document.getElementById("negocio") as HTMLSelectElement).value;
    const local = (document.getElementById("cidade") as HTMLInputElement).value;
    navigate(`/resultados?tipo=${tipo}&negocio=${negocio}&cidade=${local}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navbar />

      {/* Barra de busca */}
      <div className="bg-gray-200 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center px-4">
          <select id="negocio" className="p-2 border rounded w-40">
            <option>Aluguel</option>
            <option>Venda</option>
          </select>
          <select id="tipo" className="p-2 border rounded w-40">
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Comercial</option>
          </select>
          <input
            id="cidade"
            type="text"
            placeholder="Bairro ou cidade"
            className="p-2 border rounded w-60"
          />
          <button
            onClick={handleBuscar}
            className="bg-[#12304f] text-white px-4 py-2 rounded hover:bg-[#0f263d] transition"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl mb-4 text-[#12304f] font-semibold">RESULTADOS DA BUSCA</h1>

        {imoveis.length === 0 ? (
          <>
            <p className="text-red-600 mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
            {similares.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2">Imóveis similares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {similares.map((imovel) => (
                    <div
                      key={imovel.id}
                      onClick={() => navigate(`/imovel/${imovel.id}`)}
                      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
                    >
                     <Carousel showThumbs={false} infiniteLoop showStatus={false} className="rounded overflow-hidden h-64 mb-3">
  {imovel.fotos?.map((foto: string, idx: number) => (
    <div key={idx}>
      <img src={foto} alt={`Foto ${idx + 1}`} className="object-cover h-64 w-full" />
    </div>
  ))}
</Carousel>
                      <h2 className="text-lg font-semibold">{imovel.titulo}</h2>
                      <p>{imovel.descricao}</p>
                      <p className="font-bold text-[#12304f]">R$ {imovel.preco}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imoveis.map((imovel) => (
              <div
                key={imovel.id}
                onClick={() => navigate(`/imovel/${imovel.id}`)}
                className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={imovel.fotos?.[0]}
                  alt="Foto"
                  className="h-48 w-full object-cover rounded mb-2"
                />
                <h2 className="text-lg font-semibold">{imovel.titulo}</h2>
                <p>{imovel.descricao}</p>
                <p className="font-bold text-[#12304f]">R$ {imovel.preco}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
