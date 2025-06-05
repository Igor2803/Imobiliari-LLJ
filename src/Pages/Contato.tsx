import { useState } from "react";
import emailjs from "emailjs-com";
import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    departamento: "",
    contatoPorWhatsapp: true,
    contatoPorTelefone: false,
    mensagem: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    emailjs.send(
      "service_qlzbrdi",
      "template_7rgbk6w",
      {
        ...formData,
        contato_preferido: formData.contatoPorWhatsapp
          ? "WhatsApp"
          : formData.contatoPorTelefone
          ? "Telefone"
          : "Nenhum",
      },
      "9cDm4y-dFV_XVTHkz"
    ).then(
      () => {
        alert("Mensagem enviada com sucesso!");
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          departamento: "",
          contatoPorWhatsapp: true,
          contatoPorTelefone: false,
          mensagem: "",
        });
      },
      (error) => {
        alert("Erro ao enviar: " + error.text);
      }
    );
  };

  return (
    
    <div className="bg-gray-100 min-h-screen">
             <Header />
              <Navbar />

      <div className="max-w-7xl mt-20 mx-auto flex flex-col lg:flex-row gap-10">
        {/* Lado esquerdo */}
        <div className="lg:w-1/2 text-gray-800">
          <h2 className="text-3xl font-bold mb-6">Ajudar as pessoas é o nosso principal objetivo!</h2>
          <p className="mb-4">
            Nós da LLJ Imóveis temos o intuito de estar sempre próximos de nossos clientes. Para isso, disponibilizamos vários canais de comunicação, sempre procurando o máximo de agilidade nos atendimentos.
          </p>
          <p>
            Você pode nos solicitar uma consultoria, enviar mensagens para o departamento comercial, contatar a diretoria, consultar oportunidades ou até enviar um elogio para alguém da nossa equipe.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="lg:w-1/2 bg-white p-6 rounded shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="telefone"
              placeholder="DDD + Telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <select
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Selecionar um departamento(*)</option>
            <option value="Comercial">Comercial</option>
            <option value="Consultoria">Consultoria</option>
            <option value="Diretoria">Diretoria</option>
            <option value="Outros">Outros</option>
          </select>

          <div className="flex gap-4 items-center text-sm text-gray-700">
            <span>Desejo receber contato por:</span>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="contatoPorWhatsapp"
                checked={formData.contatoPorWhatsapp}
                onChange={handleChange}
              />
              WhatsApp
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="contatoPorTelefone"
                checked={formData.contatoPorTelefone}
                onChange={handleChange}
              />
              Telefone
            </label>
          </div>

          <textarea
            name="mensagem"
            placeholder="Como podemos lhe ajudar?"
            value={formData.mensagem}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32 resize-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#12304f] text-white py-3 rounded font-bold hover:bg-[#00095c] transition"
          >
            ENVIAR
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}
