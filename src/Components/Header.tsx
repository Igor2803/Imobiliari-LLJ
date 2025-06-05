import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-[#12304f] text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 font-semibold">
        
        {/* Bloco esquerdo */}
        <div className="flex items-center gap-6">
          {/* Desktop: número + ícone */}
          <ul className="hidden sm:flex items-center gap-6 list-none">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-lg" />
              (11) 4198-1099
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-lg" />
              (11) 94016-6742
            </li>
          </ul>

          {/* Mobile: só ícones com links */}
          <div className="flex sm:hidden items-center gap-4">
            <a href="tel:+551141981099" className="hover:text-gray-300">
              <FaPhoneAlt className="text-xl" />
            </a>
            <a href="https://wa.me/5511940166742" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>

        {/* Bloco direito */}
        <div className="flex items-center space-x-2">
          <a href="#" className="hover:underline">Meus Favoritos</a>
          <span>|</span>
          <a href="#" className="hover:underline">🌐</a>
        </div>
      </div>
    </header>
  );
}
