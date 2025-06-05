import LoginForm from "../Components/LoginForm";
import '../index.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-700 via-[#12304f] to-blue-400 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transition-transform duration-300 hover:scale-105">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
          <img
            src="/logo.png"
            alt="Logo da Imobiliária"
            className="w-16 h-16"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
         LLJ Imóveis
        </h1>
        <p className="text-gray-600 mb-6">
          Encontre o imóvel dos seus sonhos. Faça login para gerenciar seus anúncios.
        </p>
        <LoginForm />
      </div>
      <footer className="mt-10 text-white text-sm opacity-80">
        © {new Date().getFullYear()} <span className="font-medium">LLJ Imóveis</span> — Todos os direitos reservados.
      </footer>
    </div>
  );
}
