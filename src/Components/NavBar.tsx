import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ícones do Lucide (ou troque por SVG)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
     <div className="max-w-7xl mx-auto flex flex-col items-center px-4 py-3">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-20" />

        {/* Botão para celular */}
        <button
          className="md:hidden text-[#12304f]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu (desktop) */}
        <ul className="hidden md:flex gap-6 text-sm text-[#12304f] font-semibold">
          <li><a href="/">HOME</a></li>
          <li><Link to="/sobre">A IMOBILIÁRIA</Link></li>
          <li><Link to="/admin">CADASTRAR IMÓVEL</Link></li>
          <li><Link to="/buscar">ENCONTRE MEU IMÓVEL</Link></li>
          <li><Link to="/contato">CONTATO</Link></li>
        </ul>
      </div>

      {/* Menu (mobile) */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 pb-4 text-[#12304f] font-semibold">
          <li><a href="/">HOME</a></li>
          <li><Link to="/sobre">A IMOBILIÁRIA</Link></li>
          <li><Link to="/admin">CADASTRAR IMÓVEL</Link></li>
          <li><Link to="/buscar">ENCONTRE MEU IMÓVEL</Link></li>
          <li><Link to="/contato">CONTATO</Link></li>
        </ul>
      )}
    </nav>
  );
}
