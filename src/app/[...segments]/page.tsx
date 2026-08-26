import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { newsBySlug, newsItems, photosForRestaurant, photosForUnit, restaurantBySlug, restaurants, unitBySlug, units } from "../site-data";

type PageProps = { params: Promise<{ segments: string[] }> };

const pagePaths = [
  ["a-rede"], ["unidades"], ["servicos"], ["restaurantes"], ["news"], ["trabalhe-conosco"], ["contato"], ["privacidade"], ["termos"],
  ...units.map((unit) => ["unidades", unit.slug]),
  ...restaurants.map((restaurant) => ["restaurantes", restaurant.slug]),
  ["news", "uma-boa-parada"], ["news", "gente-que-move-a-rede"], ["news", "um-ponto-de-apoio"],
];

export function generateStaticParams() {
  return pagePaths.map((segments) => ({ segments }));
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function SiteHeader() {
  return (
    <header className="inner-header">
      <Link href="/" className="inner-brand" aria-label="Rede Pedro Pelanda — início">
        <span className="brand-mark">P</span>
        <span><b>REDE PEDRO</b><strong>PELANDA</strong></span>
      </Link>
      <nav aria-label="Navegação principal">
        <Link href="/a-rede">A Rede</Link>
        <Link href="/unidades">Unidades</Link>
        <Link href="/servicos">Serviços</Link>
        <Link href="/restaurantes">Alimentação</Link>
        <Link href="/news">News</Link>
        <Link href="/trabalhe-conosco">Trabalhe conosco</Link>
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <div><Link href="/a-rede">A Rede</Link><Link href="/unidades">Unidades</Link><Link href="/servicos">Serviços</Link><Link href="/restaurantes">Alimentação</Link><Link href="/news">News</Link><Link href="/trabalhe-conosco">Trabalhe conosco</Link><Link href="/contato">Contato</Link></div>
      </details>
      <Link href="/#unidades" className="inner-header-cta">Encontrar uma unidade <Arrow /></Link>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="inner-footer">
      <div className="inner-footer-brand"><span className="brand-mark">P</span><span><b>REDE PEDRO</b><strong>PELANDA</strong></span></div>
      <p>Você na estrada. A gente te apoia.</p>
      <div className="inner-footer-links"><Link href="/a-rede">A Rede</Link><Link href="/unidades">Unidades</Link><Link href="/servicos">Serviços</Link><Link href="/news">News</Link><Link href="/contato">Contato</Link></div>
      <small>© 2026 Rede Pedro Pelanda. Informações sujeitas a atualização.</small>
    </footer>
  );
}

function PageLayout({ eyebrow, title, intro, heroImage, heroAlt = "", children }: { eyebrow: string; title: string; intro: string; heroImage?: string; heroAlt?: string; children: React.ReactNode }) {
  return <main className="content-page"><SiteHeader /><section className={`content-hero${heroImage ? " content-hero-with-image" : ""}`}><div className="content-hero-copy"><p className="eyebrow orange"><span /> {eyebrow}</p><h1>{title}</h1><p>{intro}</p></div>{heroImage ? <div className="content-hero-photo"><Image src={heroImage} alt={heroAlt} fill priority sizes="(max-width: 900px) 100vw, 46vw" /></div> : null}</section>{children}<SiteFooter /></main>;
}

function Section({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return <section className="content-section"><div className="content-section-heading">{eyebrow ? <p className="eyebrow orange"><span /> {eyebrow}</p> : null}<h2>{title}</h2></div><div className="content-section-body">{children}</div></section>;
}

function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  if (photos.length === 0) return null;
  return <div className={`photo-gallery photo-gallery-${Math.min(photos.length, 3)}`}>{photos.map((photo, index) => <figure key={photo}><Image src={photo} alt={`${alt} — foto ${index + 1}`} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 56vw" : "(max-width: 760px) 100vw, 28vw"} /></figure>)}</div>;
}

function UnitsPage() {
  return <PageLayout eyebrow="Unidades" title="Onde fica o Pedro Pelanda mais próximo?" intro="Busque por cidade, rodovia ou serviço. Se preferir, informe a rota que pretende fazer." heroImage="/media/units/posto-22/01.jpg" heroAlt="Pátio do Posto 22 da Rede Pedro Pelanda">
    <Section eyebrow="Busca" title="Encontre uma unidade no seu caminho"><div className="search-panel"><div><span>De onde você sai?</span><input placeholder="Cidade ou endereço de partida" /></div><div><span>Para onde você vai?</span><input placeholder="Cidade ou destino" /></div><Link href="/#unidades" className="orange-button">Calcular rota com postos <Arrow /></Link></div><p className="section-note">A busca completa da Home será conectada ao Google Maps quando a chave e as coordenadas oficiais estiverem configuradas.</p></Section>
    <Section eyebrow="Mapa e resultados" title="14 unidades em três estados"><div className="units-directory">{units.map((unit, index) => { const photo = photosForUnit(unit.slug)[0]; return <Link className={`directory-card${photo ? " directory-card-with-photo" : ""}`} href={`/unidades/${unit.slug}`} key={unit.slug}>{photo ? <span className="directory-card-photo"><Image src={photo} alt="" fill sizes="180px" /></span> : <span className="directory-card-index">{String(index + 1).padStart(2, "0")}</span>}<div><strong>{unit.name}</strong><small>{unit.address}</small><em>{unit.services.slice(0, 4).join(" · ")}</em></div><Arrow /></Link>; })}</div></Section>
  </PageLayout>;
}

function UnitPage({ slug }: { slug: string }) {
  const unit = unitBySlug(slug);
  if (!unit) notFound();
  const photos = photosForUnit(unit.slug);
  return <PageLayout eyebrow="Página da unidade" title={unit.name} intro={unit.intro} heroImage={photos[0]} heroAlt={`Vista da ${unit.name}`}>
    <section className="unit-overview"><div className="unit-facts"><div><span>Endereço</span><strong>{unit.address}</strong></div><div><span>Funcionamento</span><strong>{unit.hours}</strong></div><div><span>Telefone comercial</span><strong>{unit.phone}</strong></div><div><span>Fundação / inauguração</span><strong>{unit.foundation}</strong></div></div><div className="unit-map-card"><span className="map-card-label">Sua próxima parada</span><div className="unit-map-art"><span className="large-pin">P</span><span className="map-road">MAPA DA UNIDADE</span></div>{unit.mapsUrl ? <a href={unit.mapsUrl} target="_blank" rel="noreferrer" className="outline-button">Abrir no Google Maps <Arrow /></a> : <span className="section-note">Link do Maps em validação.</span>}</div></section>
    <Section eyebrow="Sobre a unidade" title={unit.highlights}><p>{unit.route}</p></Section>
    <Section eyebrow="O que você encontra" title="Serviços disponíveis"><div className="service-chips">{unit.services.map((service) => <span key={service}>{service}</span>)}</div></Section>
    <Section eyebrow="Alimentação" title="Informações para a sua parada"><p>{unit.food}</p></Section>
    {photos.length ? <Section eyebrow="Fotos e estrutura" title="Conheça o espaço"><PhotoGallery photos={photos} alt={unit.name} /></Section> : null}
    <section className="content-cta"><div><p className="eyebrow"><span /> Continue sua viagem</p><h2>Encontre outra unidade no seu caminho.</h2></div><Link href="/unidades" className="white-button">Ver todas as unidades <Arrow /></Link></section>
  </PageLayout>;
}

function RestaurantsPage() {
  return <PageLayout eyebrow="Alimentação" title="Alimentação para quem está na estrada" intro="Veja onde fazer uma pausa, consulte o horário informado e abra a página de cada operação." heroImage="/media/restaurants/parada-27/02.jpg" heroAlt="Entrada da Parada 27">
    <Section eyebrow="Restaurantes" title="Operações da rede e parceiros identificados"><div className="units-directory">{restaurants.map((restaurant, index) => <Link className="directory-card" href={`/restaurantes/${restaurant.slug}`} key={restaurant.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{restaurant.name}</strong><small>{restaurant.address}</small><em>{restaurant.hours}</em></div><Arrow /></Link>)}</div></Section>
  </PageLayout>;
}

function RestaurantPage({ slug }: { slug: string }) {
  const restaurant = restaurantBySlug(slug);
  if (!restaurant) notFound();
  const photos = photosForRestaurant(restaurant.slug);
  return <PageLayout eyebrow="Página de alimentação" title={restaurant.name} intro={restaurant.intro} heroImage={photos[0]} heroAlt={`Vista da ${restaurant.name}`}>
    <section className="unit-overview"><div className="unit-facts"><div><span>Endereço</span><strong>{restaurant.address}</strong></div><div><span>Funcionamento</span><strong>{restaurant.hours}</strong></div><div><span>Data informada</span><strong>{restaurant.date}</strong></div><div><span>Relação com a unidade</span><strong>Consulte o posto do mesmo endereço.</strong></div></div><div className="unit-map-card"><span className="map-card-label">Alimentação no caminho</span><div className="unit-map-art food-map-art"><span className="large-pin">P</span><span className="map-road">MAPA DA UNIDADE</span></div><Link href="/unidades" className="outline-button">Encontrar o posto <Arrow /></Link></div></section>
    <Section eyebrow="Sobre a operação" title={restaurant.title}><p>{restaurant.about}</p></Section>
    <Section eyebrow="Para a sua visita" title="Informações disponíveis"><div className="service-chips"><span>Alimentação</span><span>Horário informado</span><span>Estacionamento da unidade</span><span>Acesso pelo Google Maps</span></div></Section>
    {photos.length ? <Section eyebrow="Fotos" title="Conheça o espaço"><PhotoGallery photos={photos} alt={restaurant.name} />{restaurant.review ? <p className="review-note">{restaurant.review}</p> : null}</Section> : null}
    <section className="content-cta"><div><p className="eyebrow"><span /> Continue sua viagem</p><h2>Veja também as unidades da rede.</h2></div><Link href="/unidades" className="white-button">Ver unidades <Arrow /></Link></section>
  </PageLayout>;
}

function NetworkPage() {
  return <PageLayout eyebrow="A Rede" title="Uma história de família que começou na estrada" intro="A Rede Pedro Pelanda nasceu em Fazenda Rio Grande e cresceu pelas rodovias do Sul do país." heroImage="/media/institutional/1966.jpg" heroAlt="Registro histórico do primeiro posto da Rede Pedro Pelanda, em 1966">
    <Section eyebrow="Aquela do Pedrinho" title="Um jeito próximo de receber"><p>É assim que muita gente reconhece a Rede Pedro Pelanda. O apelido atravessou gerações e ainda resume o jeito próximo de receber quem chega às unidades.</p></Section>
    <Section eyebrow="Nossa história" title="Tudo começou em família"><p>Em 1966, Guido Irineu Pelanda assumiu o desafio de administrar o Posto 22, em Fazenda Rio Grande, no Paraná. Aquele primeiro posto deu origem à rede, que cresceu sem perder o vínculo familiar que marcou o começo.</p></Section>
    <Section eyebrow="Presença" title="Três estados e mais de 1.300 km de rota"><div className="numbers-grid"><div><strong>14</strong><span>postos</span></div><div><strong>3</strong><span>estados</span></div><div><strong>+60</strong><span>anos de história</span></div><div><strong>+700</strong><span>colaboradores</span></div></div></Section>
    <Section eyebrow="O jeito Pelanda de receber" title="O que não mudou desde o primeiro posto"><div className="values-list"><p>Atendimento próximo e direto.</p><p>Informação clara sobre o que existe em cada unidade.</p><p>Combustível de procedência e serviços para o veículo.</p><p>Cuidado com as pessoas, a estrada e o entorno.</p></div></Section>
    <section className="content-cta"><div><p className="eyebrow"><span /> Conheça de perto</p><h2>Escolha uma unidade e veja tudo o que ela oferece.</h2></div><Link href="/unidades" className="white-button">Conhecer as unidades <Arrow /></Link></section>
  </PageLayout>;
}

function ServicesPage() {
  const cards = [
    ["Abastecer", "Combustíveis e atendimento para seguir viagem com segurança."],
    ["Alimentação", "Restaurantes, lanchonetes e conveniência para diferentes momentos da estrada."],
    ["Descansar", "Banho, estacionamento e estrutura para quem vive na estrada."],
    ["Cuidar do veículo", "Borracharia, troca de óleo, mecânica e apoio para continuar o caminho."],
  ];
  return <PageLayout eyebrow="Serviços" title="O que você encontra em cada unidade" intro="Consulte os serviços antes de sair e escolha a unidade que atende ao que você precisa." heroImage="/media/units/posto-36/01.jpg" heroAlt="Unidade da Rede Pedro Pelanda em Mandirituba">
    <Section eyebrow="Categorias" title="Tudo o que faz diferença na parada"><div className="service-page-grid">{cards.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><Link href="/unidades">Encontrar unidade <Arrow /></Link></article>)}</div></Section>
    <Section eyebrow="Antes de sair" title="Confira a oferta de cada unidade"><p>Os serviços mudam de uma unidade para outra. Abra a página do posto para consultar alimentação, banho, estacionamento, sala do caminhoneiro, borracharia, troca de óleo e outros recursos confirmados.</p><Link href="/unidades" className="orange-button">Ver todas as unidades <Arrow /></Link></Section>
  </PageLayout>;
}

function NewsPage() {
  return <PageLayout eyebrow="News da rede" title="Histórias que colocam a rede em movimento" intro="Aberturas, serviços, ações nas unidades, oportunidades e informações úteis para quem passa pelas estradas." heroImage="/media/instagram-reference/posto-por-do-sol.jpg" heroAlt="Unidade da Rede Pedro Pelanda ao pôr do sol">
    <Section eyebrow="Destaque" title="Notícia em destaque"><div className="news-list">{newsItems.map((item) => <Link href={`/news/${item.slug}`} className="news-page-card" key={item.slug}><div className="news-page-art"><span>{item.category}</span></div><div><small>{item.category}</small><h3>{item.title}</h3><p>{item.excerpt}</p><b>Continuar lendo <Arrow /></b></div></Link>)}</div></Section>
    <Section eyebrow="Newsletter" title="Receba as notícias por e-mail"><div className="search-panel newsletter-panel"><div><span>Seu e-mail</span><input type="email" placeholder="voce@exemplo.com" /></div><button className="orange-button" type="button">Quero receber <Arrow /></button></div></Section>
  </PageLayout>;
}

function NewsDetailPage({ slug }: { slug: string }) {
  const item = newsBySlug(slug);
  if (!item) notFound();
  return <PageLayout eyebrow={item.category} title={item.title} intro={item.excerpt}>
    <Section eyebrow="Conteúdo" title="Uma boa informação também ajuda a seguir viagem"><p>Esta página está preparada para receber o texto completo da notícia, imagens, vídeos e informações de serviço. Quando uma publicação citar uma unidade, o conteúdo poderá levar diretamente para a página correspondente.</p><div className="article-placeholder"><span>Imagem ou vídeo da notícia</span></div></Section>
    <Section eyebrow="Compartilhe" title="Leve esta informação com você"><div className="service-chips"><span>WhatsApp</span><span>Copiar link</span><span>Facebook</span><span>LinkedIn</span></div></Section>
    <section className="content-cta"><div><p className="eyebrow"><span /> Mais notícias</p><h2>Acompanhe o que acontece na rede.</h2></div><Link href="/news" className="white-button">Voltar para News <Arrow /></Link></section>
  </PageLayout>;
}

function CareersPage() {
  return <PageLayout eyebrow="Trabalhe conosco" title="Trabalhe na Rede Pedro Pelanda" intro="Veja as vagas por cidade, unidade e área de atuação." heroImage="/media/instagram-reference/motoristas.jpg" heroAlt="Profissionais que fazem a rede se movimentar">
    <Section eyebrow="Cultura" title="O trabalho por trás de cada parada"><p>Frentistas, cozinheiros, atendentes, equipes de limpeza, manutenção e administração mantêm as unidades funcionando todos os dias.</p></Section>
    <Section eyebrow="Oportunidades" title="Uma rede com diferentes áreas e cidades"><p>As oportunidades aparecem nos postos, nas operações de alimentação e nas áreas administrativas. Cada vaga deve informar a função, o local e os requisitos.</p><div className="job-card"><span>Vagas abertas</span><strong>Consulte as oportunidades atuais</strong><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="orange-button">Ver vagas no LinkedIn <Arrow /></a></div></Section>
    <Section eyebrow="Candidatura" title="Nenhuma vaga para você agora?"><p>Acompanhe os canais oficiais. Novas oportunidades serão publicadas nesta página e no LinkedIn.</p></Section>
  </PageLayout>;
}

function ContactPage() {
  return <PageLayout eyebrow="Contato" title="Como podemos ajudar?" intro="Escolha o assunto e fale com a equipe ou com uma unidade da rede." heroImage="/media/units/posto-cana-verde/01.jpg" heroAlt="Unidade da Rede Pedro Pelanda">
    <Section eyebrow="Canais" title="Fale com a Rede Pedro Pelanda"><div className="contact-grid"><div><span>Atendimento geral</span><strong>Envie sua mensagem pelo formulário</strong></div><div><span>Unidades</span><strong>Consulte o contato público na página de cada posto</strong></div><div><span>Redes sociais</span><strong>Instagram · Facebook · LinkedIn</strong></div></div></Section>
    <Section eyebrow="Formulário" title="Envie sua mensagem"><form className="contact-form"><label><span>Nome</span><input placeholder="Seu nome" /></label><label><span>E-mail</span><input type="email" placeholder="voce@exemplo.com" /></label><label><span>Telefone</span><input placeholder="(00) 00000-0000" /></label><label><span>Assunto</span><select defaultValue=""><option value="" disabled>Selecione um assunto</option><option>Informações sobre uma unidade</option><option>Oportunidades</option><option>Assunto institucional</option></select></label><label className="full"><span>Mensagem</span><textarea rows={5} placeholder="Escreva sua mensagem" /></label><button type="button" className="orange-button">Enviar mensagem <Arrow /></button></form></Section>
  </PageLayout>;
}

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <PageLayout eyebrow={privacy ? "Privacidade" : "Termos de uso"} title={privacy ? "Política de Privacidade" : "Termos de Uso"} intro={privacy ? "Como os dados pessoais serão tratados no site." : "Regras de navegação e uso das informações do site."}>
    <Section eyebrow="Conteúdo sujeito à revisão jurídica" title={privacy ? "Tratamento de dados" : "Uso do site"}><div className="legal-list">{(privacy ? ["Quem é responsável pelo tratamento dos dados.", "Quais dados são coletados nos formulários, newsletter e candidaturas.", "Para quais finalidades os dados são utilizados.", "Com quem os dados podem ser compartilhados.", "Por quanto tempo os dados são mantidos.", "Quais são os direitos do titular e como exercê-los.", "Uso de cookies e tecnologias semelhantes.", "Medidas de segurança, atualizações da política e canal de contato."] : ["Aceitação dos termos.", "Uso correto do site e das informações publicadas.", "Atualização de endereços, horários, serviços e rotas.", "Links e serviços de terceiros.", "Direitos sobre textos, imagens, marca e demais conteúdos.", "Limites de responsabilidade.", "Alterações dos termos e legislação aplicável."]).map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></div>)}</div></Section>
  </PageLayout>;
}

export default async function ContentPage({ params }: PageProps) {
  const { segments } = await params;
  const [root, slug] = segments;
  if (root === "a-rede" && !slug) return <NetworkPage />;
  if (root === "unidades" && !slug) return <UnitsPage />;
  if (root === "unidades" && slug) return <UnitPage slug={slug} />;
  if (root === "restaurantes" && !slug) return <RestaurantsPage />;
  if (root === "restaurantes" && slug) return <RestaurantPage slug={slug} />;
  if (root === "servicos" && !slug) return <ServicesPage />;
  if (root === "news" && !slug) return <NewsPage />;
  if (root === "news" && slug) return <NewsDetailPage slug={slug} />;
  if (root === "trabalhe-conosco" && !slug) return <CareersPage />;
  if (root === "contato" && !slug) return <ContactPage />;
  if (root === "privacidade" && !slug) return <LegalPage type="privacy" />;
  if (root === "termos" && !slug) return <LegalPage type="terms" />;
  notFound();
}
