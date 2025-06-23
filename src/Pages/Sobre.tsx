import Header from "../Components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-16 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#12304f] text-center mb-10">
          Sobre a Imobiliária 
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#12304f] mb-4">
            Nossa História
          </h2>
          <p className="text-lg leading-relaxed text-justify">
            Fundada com o propósito de aproximar pessoas do sonho da casa própria,
            a Imobiliária LLJ Imóveis nasceu em Santana de Parnaíba como um projeto
            familiar e cheio de propósito. Com uma atuação baseada na confiança e
            proximidade, rapidamente se tornou referência regional em excelência no
            atendimento e conhecimento do mercado local.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#12304f] mb-4">
            Nossa Missão
          </h2>
          <p className="text-lg leading-relaxed text-justify">
            Oferecer soluções imobiliárias com honestidade, acolhimento e clareza,
            ajudando cada cliente a encontrar o imóvel ideal com segurança e
            tranquilidade. Nossa missão é transformar o processo de compra, venda
            ou aluguel em uma jornada positiva e memorável.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#12304f] mb-4">
            Nossos Valores
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2 pl-4 text-gray-700">
            <li>Transparência e ética em todos os processos</li>
            <li>Respeito e compromisso com o cliente</li>
            <li>Paixão por realizar sonhos</li>
            <li>Inovação e aprendizado contínuo</li>
            <li>Foco na experiência humana</li>
          </ul>
        </section>

        
      </main>

      <Footer />
    </div>
  );
}
