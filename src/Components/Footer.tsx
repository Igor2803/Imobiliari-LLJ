import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#12304f] text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sobre */}
        <div>
          <img src="/logo2.png" alt="LLJ Imóveis" className="w-36 mb-4" />
          <p className="text-sm">
            A LLJ Imóveis é referência na região, atuando na compra, venda e locação de imóveis residenciais e comerciais, com assessoria jurídica e suporte completo.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Alugar */}
        <div>
          <h4 className="font-semibold mb-2 text-lg">QUERO ALUGAR</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Residencial</a></li>
            <li><a href="#">Comercial</a></li>
            <li><a href="#">Encontre Meu Imóvel</a></li>
          </ul>
        </div>

        {/* Comprar */}
        <div>
          <h4 className="font-semibold mb-2 text-lg">QUERO COMPRAR</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Residencial</a></li>
            <li><a href="#">Comercial</a></li>
            <li><a href="#">Lançamento</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-semibold mb-2 text-lg">CONTATO</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-lg" /> (11) 94000-0000</li>
            <li className="flex items-center gap-2"><FaWhatsapp className="text-lg" /> (11) 94000-0000</li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-lg" /> contato@lljimoveis.com</li>
            <li className="mt-2">R. Exemplo, 123 - Centro</li>
            <li>Santana de Parnaíba - SP - 00000-000</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-300 border-t border-gray-400 pt-4">
        &copy; {new Date().getFullYear()} LLJ Imóveis. Todos os direitos reservados.
      </div>
    </footer>
  );
}
