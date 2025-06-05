import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DetalhesImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState<any>(null);
  const [imagemModal, setImagemModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchImovel = async () => {
      if (!id) return;
      const ref = doc(db, "imoveis", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setImovel({ id: snapshot.id, ...snapshot.data() });
      }
    };
    fetchImovel();
  }, [id]);

  if (!imovel) return <p className="text-center mt-10">Carregando...</p>;

  const whatsappLink = `https://wa.me/5599999999999?text=Olá, gostaria de saber mais sobre o imóvel ${imovel.titulo}`;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#12304f]">{imovel.titulo}</h1>

        <div className="grid md:grid-cols-2 gap-10 items-start bg-white p-6 rounded-xl shadow-lg">
          {/* Carrossel de fotos */}
          <div className="rounded overflow-hidden">
            <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false} className="rounded-xl">
              {imovel.fotos?.map((foto: string, index: number) => (
                <div key={index} onClick={() => setImagemModal(foto)} className="cursor-zoom-in">
                  <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="h-[400px] w-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Informações do imóvel */}
          <div className="space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">{imovel.descricao}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
              <div><strong>Tipo:</strong> {imovel.tipoImovel}</div>
              <div><strong>Cômodos:</strong> {imovel.quartos}</div>
              <div><strong>Banheiros:</strong> {imovel.banheiros}</div>
              <div><strong>Vagas:</strong> {imovel.vagas}</div>
              <div><strong>Área:</strong> {imovel.area} m²</div>
              <div><strong>Bairro:</strong> {imovel.bairro}</div>
              <div><strong>Cidade:</strong> {imovel.cidade}</div>
              <div><strong>Estado:</strong> {imovel.estado}</div>
              <div><strong>Negócio:</strong> {imovel.tipoNegocio}</div>
            </div>

            <p className="text-2xl font-bold text-[#12304f] mt-4">
              R$ {Number(imovel.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700 transition"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </div>

      {/* Modal da imagem */}
      {imagemModal && (
        <div
          onClick={() => setImagemModal(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setImagemModal(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <img src={imagemModal} alt="Imagem ampliada" className="w-full max-h-[90vh] object-contain rounded-xl" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
