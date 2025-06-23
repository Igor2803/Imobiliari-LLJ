import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function CampanhaAjuda() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 md:px-16 py-12 max-w-6xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#12304f] mb-4">
            Juntos pelo Rio Grande do Sul
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Vamos unir forças para ajudar as famílias afetadas pelas enchentes. Sua contribuição pode transformar vidas.
          </p>
        </section>

        <section className="bg-[#f9fafb] rounded-2xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Texto e dados */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-[#12304f] mb-4">
              Faça sua doação via PIX:
            </h2>
            <ul className="text-gray-800 space-y-2 text-base md:text-lg">
              <li>
                <strong>Chave PIX:</strong> ajuda@jovelino.com.br
              </li>
              <li>
                <strong>Banco:</strong> 000 - Banco Solidário
              </li>
              <li>
                <strong>Favorecido:</strong> Imobiliária Jovelino
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <img
              src="/qr-ajuda-rs.png"
              alt="QR Code PIX"
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain border border-gray-300 rounded-lg shadow"
            />
          </div>
        </section>

        <p className="text-center text-base md:text-lg mt-8 text-green-700 font-medium">
          Toda doação será 100% destinada às vítimas das enchentes. 🙌
        </p>
      </main>

      <Footer />
    </div>
  );
}
