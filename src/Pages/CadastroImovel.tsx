import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, or } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function CadastroImovel() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tipoNegocio, setTipoNegocio] = useState("Venda");
  const [fotos, setFotos] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [tipoImovel, setTipoImovel] = useState("Casa");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [area, setArea] = useState("");
  const [vagas, setVagas] = useState("");
  const [bairro, setBairro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const [busca, setBusca] = useState("");
  const [imovelId, setImovelId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFotos(files);
      const urls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls(urls);
    }
  };

  const handleBuscarImovel = async () => {
    const q = query(
      collection(db, "imoveis"),
      or(
        where("titulo", "==", busca),
        where("cidade", "==", busca)
      )
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0];
      const dados = docRef.data();

      setImovelId(docRef.id);
      setTitulo(dados.titulo);
      setDescricao(dados.descricao);
      setPreco(dados.preco);
      setTipoNegocio(dados.tipoNegocio);
      setTipoImovel(dados.tipoImovel);
      setEndereco(dados.endereco);
      setNumero(dados.numero);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
      setQuartos(dados.quartos);
      setBanheiros(dados.banheiros);
      setArea(dados.area);
      setVagas(dados.vagas);
      setBairro(dados.bairro);
      setPreviewUrls(dados.fotos || []);
    } else {
      alert("Imóvel não encontrado");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setProgresso(0);

    try {
      const urlsFotos: string[] = [];

      if (fotos) {
        const total = fotos.length;

        for (let i = 0; i < total; i++) {
          const foto = fotos[i];
          const storageRef = ref(storage, `imoveis/${Date.now()}_${foto.name}`);
          const uploadTask = uploadBytesResumable(storageRef, foto);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const progressoIndividual = percent / total;
                setProgresso((prev) => Math.min(100, prev + progressoIndividual));
              },
              (error) => reject(error),
              async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                urlsFotos.push(url);
                resolve();
              }
            );
          });
        }
      }

      if (imovelId) {
        const docRef = doc(db, "imoveis", imovelId);
        await updateDoc(docRef, {
          titulo,
          descricao,
          preco,
          tipoNegocio,
          tipoImovel,
          endereco,
          numero,
          cidade,
          estado,
          cep,
          quartos,
          banheiros,
          area,
          fotos: urlsFotos.length > 0 ? urlsFotos : previewUrls,
          vagas,
          bairro,
          atualizadoEm: new Date(),
        });
      } else {
        await addDoc(collection(db, "imoveis"), {
          titulo,
          descricao,
          preco,
          tipoNegocio,
          tipoImovel,
          endereco,
          numero,
          cidade,
          estado,
          cep,
          quartos,
          banheiros,
          area,
          fotos: urlsFotos,
          vagas,
          bairro,
          criadoEm: new Date(),
        });
      }

      setTitulo("");
      setDescricao("");
      setPreco("");
      setTipoNegocio("Venda");
      setTipoImovel("Casa");
      setEndereco("");
      setNumero("");
      setCidade("");
      setEstado("");
      setCep("");
      setQuartos("");
      setBanheiros("");
      setArea("");
      setVagas("");
      setBairro("");
      setFotos(null);
      setPreviewUrls([]);
      setProgresso(0);
      setImovelId(null);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 4000);
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);
      alert("Erro ao cadastrar imóvel");
    }

    setCarregando(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto p-4 mt-6">
        <h2 className="text-sm text-[#12304f] font-semibold text-center">Buscar para atualização</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar imóvel por título ou cidade"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleBuscarImovel}
            type="button"
            className="bg-[#12304f] text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>

        <main className="flex-grow max-w-2xl mx-auto p-4 mt-6">
      <h2 className="text-sm text-[#12304f] font-semibold text-center">CADASTRO DO IMÓVEL</h2>        
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select
      value={tipoNegocio}
      onChange={(e) => setTipoNegocio(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="Venda">Venda</option>
      <option value="Aluguel">Aluguel</option>
    </select>

    <select
      value={tipoImovel}
      onChange={(e) => setTipoImovel(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="Casa">Casa</option>
      <option value="Apartamento">Apartamento</option>
      <option value="Comercial">Comercial</option>
    </select>
  </div>

  <input
    type="text"
    placeholder="Título do Imóvel"
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
    required
    className="p-2 border rounded"
  />

  <textarea
    placeholder="Descrição detalhada do imóvel"
    value={descricao}
    onChange={(e) => setDescricao(e.target.value)}
    required
    className="p-2 border rounded h-28"
  />

  <input
    type="number"
    placeholder="Preço (R$)"
    value={preco}
    onChange={(e) => setPreco(e.target.value)}
    required
    className="p-2 border rounded"
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      value={endereco}
      onChange={(e) => setEndereco(e.target.value)}
      placeholder="Endereço (Rua, Av...)"
      className="p-2 border rounded"
      required
    />
    <input
      type="text"
      value={numero}
      onChange={(e) => setNumero(e.target.value)}
      placeholder="Número"
      className="p-2 border rounded"
      required
    />
    <input
      type="text"
      value={bairro}
      onChange={(e) => setBairro(e.target.value)}
      placeholder="Bairro"
      className="p-2 border rounded"
      required
    />
    <input
      type="text"
      value={cidade}
      onChange={(e) => setCidade(e.target.value)}
      placeholder="Cidade"
      className="p-2 border rounded"
      required
    />
    <input
      type="text"
      value={estado}
      onChange={(e) => setEstado(e.target.value)}
      placeholder="Estado"
      className="p-2 border rounded"
      required
    />
    <input
      type="text"
      placeholder="CEP"
      value={cep}
      onChange={(e) => setCep(e.target.value)}
      className="p-2 border rounded"
      required
    />
    <input
      type="number"
      value={quartos}
      onChange={(e) => setQuartos(e.target.value)}
      placeholder="Número de Comodos"
      className="p-2 border rounded"
      required
    />
    <input
      type="number"
      value={banheiros}
      onChange={(e) => setBanheiros(e.target.value)}
      placeholder="Número de Banheiros"
      className="p-2 border rounded"
      required
    />
     <input
      type="number"
      value={vagas}
      onChange={(e) => setVagas(e.target.value)}
      placeholder="Vagas para carro"
      className="p-2 border rounded"
      required
    />
    <input
      type="number"
      value={area}
      onChange={(e) => setArea(e.target.value)}
      placeholder="Área (m²)"
      className="p-2 border rounded"
      
    />
  </div>

  <label className="cursor-pointer inline-block bg-[#12304f] text-white px-4 py-2 rounded hover:bg-[#0f243d] transition w-fit">
  Selecionar Fotos
  <input
    type="file"
    multiple
    onChange={handleFileChange}
    accept="image/*"
    className="hidden"
  />
</label>

  {previewUrls.length > 0 && (
    <div className="grid grid-cols-3 gap-2">
      {previewUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Preview ${index}`}
          className="w-full h-32 object-cover rounded border"
        />
      ))}
    </div>
  )}

  {carregando && (
    <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
      <div
        className="bg-[#12304f] h-full transition-all duration-300"
        style={{ width: `${progresso}%` }}
        ></div>
    </div>
  )}

<button
  type="submit"
  className="bg-[#12304f] text-white font-semibold py-2 rounded hover:bg-[#0f243d] transition"
  disabled={carregando}
>
  {carregando
    ? "Salvando..."
    : imovelId
    ? "Atualizar Imóvel"
    : "Cadastrar Imóvel"}
</button>
</form>
{sucesso && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2 text-center">
    Imóvel cadastrado com sucesso!
  </div>
)}
      </main>
      </main>

      <Footer />
    </div>
  );
}
