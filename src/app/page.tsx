"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type SearchMode = "nearby" | "route";
type FilterState = {
  state: string;
  city: string;
  unit: string;
  service: string;
  fuel: string;
};

const stations = [
  { mapIndex: 1, name: "Posto Rota Sul", city: "Palmital, SP", state: "São Paulo", road: "SP-270, km 420", mapsUrl: "https://maps.app.goo.gl/V93PoKpDDDCTBEeJ9", services: ["Abastecimento"] },
  { mapIndex: 2, name: "Posto Conexão", city: "Jacarezinho, PR", state: "Paraná", road: "BR-153, km 8,5", mapsUrl: "https://maps.app.goo.gl/knooia2KR7gAq2JX9", services: ["Abastecimento"] },
  { mapIndex: 3, name: "Posto Quatiguá", city: "Quatiguá, PR", state: "Paraná", road: "PR-092, km 297,5", mapsUrl: "https://maps.app.goo.gl/92jXXmnAiQuEz5i28", services: ["Abastecimento", "Alimentação"] },
  { mapIndex: 4, name: "Posto Pedro Pelanda Cana Verde", city: "Siqueira Campos, PR", state: "Paraná", road: "PR-092, km 297", services: ["Abastecimento"] },
  { mapIndex: 5, name: "Parada Cristo Rei II", city: "Wenceslau Braz, PR", state: "Paraná", road: "PR-092, km 269", services: ["Abastecimento", "Alimentação"] },
  { mapIndex: 6, name: "Parada Paranazão", city: "Arapoti, PR", state: "Paraná", road: "PR-092, km 217", services: ["Abastecimento", "Alimentação"] },
  { mapIndex: 7, name: "Posto 22", city: "Fazenda Rio Grande, PR", state: "Paraná", road: "Avenida das Américas, 2901 — Gralha Azul", mapsUrl: "https://maps.app.goo.gl/rHiWtYMpqYNJZ5DG7", services: ["Abastecimento", "Alimentação", "Banho", "Borracharia"] },
  { mapIndex: 8, name: "Posto 36", city: "Mandirituba, PR", state: "Paraná", road: "BR-116, km 136", mapsUrl: "https://maps.app.goo.gl/CbvXK5g6BCwhztcg8", services: ["Abastecimento", "Alimentação", "Banho", "Borracharia"] },
  { mapIndex: 9, name: "Posto Piên", city: "Piên, PR", state: "Paraná", road: "PR-281, km 32", mapsUrl: "https://maps.app.goo.gl/rWpQwYohv7UNcVng8", services: ["Abastecimento", "Alimentação", "Banho", "Borracharia"] },
  { mapIndex: 10, name: "Posto 27", city: "São José dos Pinhais, PR", state: "Paraná", road: "BR-376, km 626", mapsUrl: "https://maps.app.goo.gl/3rjubFooEryWdEsy7", services: ["Abastecimento", "Alimentação", "Banho", "Troca de óleo"] },
  { mapIndex: 11, name: "Posto Juliane Pelanda", city: "São José dos Pinhais, PR", state: "Paraná", road: "BR-376, km 633", mapsUrl: "https://maps.app.goo.gl/psm495HzWoGb4p4k8", services: ["Abastecimento", "Alimentação", "Banho", "Troca de óleo"] },
  { mapIndex: 12, name: "Posto Pedro Pelanda", city: "Tijucas do Sul, PR", state: "Paraná", road: "BR-376, km 641", mapsUrl: "https://maps.app.goo.gl/Y1cEX2x53UvfMLfy8", services: ["Abastecimento"] },
  { mapIndex: 13, name: "Posto Residência Fuck", city: "Monte Castelo, SC", state: "Santa Catarina", road: "BR-116, km 99", mapsUrl: "https://maps.app.goo.gl/otgskiBVrM1GYw317", services: ["Abastecimento", "Alimentação"] },
  { mapIndex: 14, name: "Posto Perdigão", city: "Maracajá, SC", state: "Santa Catarina", road: "BR-101, km 403, nº 20", mapsUrl: "https://maps.app.goo.gl/LJVwsWV5Ty8HRKDC9", services: ["Abastecimento", "Alimentação", "Banho"] },
];

const initialFilters: FilterState = { state: "", city: "", unit: "", service: "", fuel: "" };
const fuelOptions = ["Gasolina comum", "Gasolina aditivada", "Etanol", "Diesel S10"];

const serviceCards = [
  { number: "01", title: "Abastecer", text: "Combustíveis e atendimento para seguir viagem com segurança." },
  { number: "02", title: "Alimentação", text: "Restaurantes e opções de alimentação para diferentes momentos da estrada." },
  { number: "03", title: "Descansar", text: "Banho, estacionamento e estrutura pensada para quem vive na estrada." },
  { number: "04", title: "Cuidar do veículo", text: "Borracharia, troca de óleo e apoio para continuar o caminho." },
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function Pin({ station, index, active, onClick }: { station: (typeof stations)[number]; index: number; active?: boolean; onClick: () => void }) {
  return (
    <button className={`map-pin pin-${index}${active ? " active" : ""}`} onClick={onClick} aria-label={`Ver ${station.name}`}>
      <span>P</span>
    </button>
  );
}

export default function Home() {
  const [mode, setMode] = useState<SearchMode>("route");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredStations = useMemo(() => stations.filter((station) => {
    const requiredServices = [filters.service, ...selectedServices].filter(Boolean);
    const serviceMatches = requiredServices.every((selectedService) => station.services.some((service) =>
      service.toLowerCase().includes(selectedService === "Restaurante" ? "aliment" : selectedService.toLowerCase()),
    ));
    return (!filters.state || station.state === filters.state)
      && (!filters.city || station.city === filters.city)
      && (!filters.unit || station.name === filters.unit)
      && (!filters.fuel || fuelOptions.includes(filters.fuel))
      && serviceMatches;
  }), [filters, selectedServices]);

  const selectedStation = filteredStations[selected] ?? filteredStations[0] ?? null;
  const directionsUrl = mode === "route" && origin && destination
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
    : "";

  const resultTitle = useMemo(() => {
    if (!searched) return "Unidades em destaque";
    return mode === "route" ? `${filteredStations.length} unidades no seu caminho` : `${filteredStations.length} unidades perto de você`;
  }, [filteredStations.length, mode, searched]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    setSearched(true);
    window.setTimeout(() => document.querySelector("#mapa-resultados")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  function updateFilter(field: keyof FilterState, value: string) {
    setFilters((current) => ({ ...current, [field]: value }));
    setSelected(0);
  }

  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Rede Pedro Pelanda — início">
          <Image src="/brand/logo-white.svg" alt="Rede Pedro Pelanda" width={184} height={70} priority />
        </a>
        <nav aria-label="Navegação principal">
          <Link href="/a-rede">A Rede</Link>
          <Link href="/unidades">Unidades</Link>
          <Link href="/servicos">Serviços</Link>
          <Link href="/news">News</Link>
          <Link href="/trabalhe-conosco">Trabalhe conosco</Link>
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div><Link href="/a-rede">A Rede</Link><Link href="/unidades">Unidades</Link><Link href="/servicos">Serviços</Link><Link href="/restaurantes">Alimentação</Link><Link href="/news">News</Link><Link href="/trabalhe-conosco">Trabalhe conosco</Link><Link href="/contato">Contato</Link></div>
        </details>
        <Link className="header-cta" href="/#unidades">Encontrar uma unidade <ArrowIcon /></Link>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Rede Pedro Pelanda</p>
          <h1>Você na estrada.<br /><strong>A gente te apoia.</strong></h1>
          <p className="hero-intro">Há mais de seis décadas, somos o seu <b>ponto de apoio</b> para abastecer, encontrar alimentação, descansar e seguir viagem. Hoje, são 14 postos e 8 restaurantes em operação, em rotas de três estados.</p>
          <a href="#unidades" className="text-link">Encontre uma unidade <ArrowIcon /></a>
        </div>
        <div className="hero-road hero-photo" aria-hidden="true">
          <Image src="/media/instagram-reference/posto-por-do-sol.jpg" alt="" fill sizes="(max-width: 720px) 100vw, 48vw" priority loading="eager" />
          <div className="hero-photo-shade" />
          <div className="road-sign"><span>14</span><small>postos</small></div>
          <div className="photo-message"><small>Quem está sempre em movimento</small><strong>merece uma boa parada.</strong></div>
        </div>
        <div className="hero-stats">
          <div><strong>+60</strong><span>anos de história</span></div>
          <div><strong>14</strong><span>postos</span></div>
          <div><strong>8</strong><span>restaurantes</span></div>
        </div>
      </section>

      <section className="route-search" id="unidades">
        <div className="route-card">
          <div className="route-card-heading">
            <p className="eyebrow orange"><span /> Sua próxima parada</p>
            <h2>Encontre um Pedro Pelanda <span className="orange-word">no seu caminho</span></h2>
          </div>
          <div className="mode-switch" role="group" aria-label="Tipo de busca">
            <button type="button" aria-pressed={mode === "nearby"} className={mode === "nearby" ? "selected" : ""} onClick={() => setMode("nearby")}>Perto de mim</button>
            <button type="button" aria-pressed={mode === "route"} className={mode === "route" ? "selected" : ""} onClick={() => setMode("route")}>No meu caminho</button>
          </div>
          <form onSubmit={submitSearch}>
            {mode === "route" ? (
              <>
                <label><span>De onde você sai?</span><input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Cidade ou endereço de partida" required /></label>
                <label><span>Para onde você vai?</span><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Cidade ou destino" required /></label>
              </>
            ) : (
              <label className="wide-field"><span>Onde você está?</span><input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Digite sua cidade ou localização" required /></label>
            )}
          <button type="submit" className="primary-button">{mode === "route" ? "Encontrar no meu caminho" : "Encontrar perto de mim"} <ArrowIcon /></button>
          </form>
          {searched && directionsUrl ? <a className="route-external-link" href={directionsUrl} target="_blank" rel="noreferrer">Abrir esta rota no Google Maps <ArrowIcon /></a> : null}
          <details className="advanced-filters">
            <summary>Filtrar por estado, cidade, unidade, serviço ou combustível <span>+</span></summary>
            <div className="sim-filters" aria-label="Filtros de unidades">
              <label><span>Estado</span><select value={filters.state} onChange={(event) => updateFilter("state", event.target.value)}><option value="">Todos os estados</option><option>Paraná</option><option>Santa Catarina</option><option>São Paulo</option></select></label>
              <label><span>Cidade</span><select value={filters.city} onChange={(event) => updateFilter("city", event.target.value)}><option value="">Todas as cidades</option>{Array.from(new Set(stations.map((station) => station.city))).map((city) => <option key={city}>{city}</option>)}</select></label>
              <label><span>Unidade</span><select value={filters.unit} onChange={(event) => updateFilter("unit", event.target.value)}><option value="">Todas as unidades</option>{stations.map((station) => <option key={station.name}>{station.name}</option>)}</select></label>
              <label><span>Serviço</span><select value={filters.service} onChange={(event) => updateFilter("service", event.target.value)}><option value="">Todos os serviços</option><option>Alimentação</option><option>Banho</option><option>Borracharia</option><option>Troca de óleo</option></select></label>
              <label className="fuel-filter"><span>Combustível</span><select value={filters.fuel} onChange={(event) => updateFilter("fuel", event.target.value)}><option value="">Todos os combustíveis</option>{fuelOptions.map((fuel) => <option key={fuel} value={fuel}>{fuel}</option>)}</select></label>
            </div>
          </details>
          <div className="quick-filters" aria-label="Atalhos de serviços">
            <span>Precisa de:</span>
            {["Alimentação", "Banho", "Borracharia"].map((filter) => {
              const isSelected = selectedServices.includes(filter);
              return <button key={filter} type="button" aria-pressed={isSelected} className={isSelected ? "selected" : ""} onClick={() => toggleService(filter)}><span aria-hidden="true">{isSelected ? "✓" : "+"}</span> {filter}</button>;
            })}
          </div>
          <button type="button" className="map-preview-link" onClick={() => document.querySelector("#mapa-resultados")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Abrir mapa com pins <ArrowIcon /></button>
        </div>
      </section>

      <section className="units-section" id="mapa-unidades">
        <div className="section-heading">
          <div><p className="eyebrow orange"><span /> Na rota com você</p><h2 aria-live="polite">{resultTitle}</h2></div>
          <p>Veja onde parar, o que encontrar e quanto falta para chegar.</p>
        </div>
        <div className="map-layout" id="mapa-resultados">
          <div className="station-list">
            {filteredStations.map((station, index) => (
              <button key={station.name} className={`station-card${selected === index ? " selected" : ""}`} onClick={() => setSelected(index)}>
                <span className="station-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="station-content"><strong>{station.name}</strong><small>{station.road} · {station.city}</small><em>{station.services.join(" · ")}</em></span>
                <span className="station-arrow"><ArrowIcon /></span>
              </button>
            ))}
            {filteredStations.length === 0 ? <p className="empty-results">Nenhuma unidade corresponde aos filtros selecionados.</p> : null}
            <span className="station-count">{filteredStations.length} de {stations.length} unidades exibidas</span>
          </div>
          <div className="map-canvas" aria-label="Prévia do mapa das unidades">
            <div className="map-label label-sp">SÃO PAULO</div><div className="map-label label-pr">PARANÁ</div><div className="map-label label-sc">SANTA CATARINA</div>
            <div className="road-tag road-sp">SP-270</div><div className="road-tag road-153">BR-153</div><div className="road-tag road-092">PR-092</div><div className="road-tag road-116">BR-116</div><div className="road-tag road-376">BR-376</div><div className="road-tag road-281">PR-281</div>
            <svg className="route-line" viewBox="0 0 720 520" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 390 C90 350 110 250 205 290 S335 440 410 305 S530 115 740 140" /></svg>
            {filteredStations.map((station) => <Pin key={station.name} station={station} index={station.mapIndex} active={selectedStation?.name === station.name} onClick={() => { const filteredIndex = filteredStations.findIndex((item) => item.name === station.name); if (filteredIndex >= 0) setSelected(filteredIndex); }} />)}
            {selectedStation ? <div className="map-info">
              <small>Próxima parada</small><strong>{selectedStation.name}</strong><span>{selectedStation.road} · {selectedStation.city}</span>
              {selectedStation.mapsUrl ? <a className="map-info-link" href={selectedStation.mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowIcon /></a> : <span className="map-info-pending">Link do Maps em validação</span>}
            </div> : <div className="map-empty">Nenhuma unidade encontrada.<br />Ajuste os filtros para ver os pins.</div>}
            <div className="map-note">Mapa demonstrativo com as 14 unidades da rede. A integração Google Maps entra na próxima etapa.</div>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos">
        <div className="section-heading light"><div><p className="eyebrow"><span /> Tudo para sua viagem</p><h2>Tudo para sua viagem, <span className="orange-word">em um só lugar</span></h2></div><p>Uma parada completa para motoristas, famílias e profissionais da estrada.</p></div>
        <div className="service-grid">
          {serviceCards.map((service) => <article key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#unidades" aria-label={`Encontrar unidade para ${service.title}`}>Encontrar unidade <ArrowIcon /></a></article>)}
        </div>
      </section>

      <section className="story-section" id="rede">
        <div className="story-mark story-photo"><Image src="/media/instagram-reference/historia-rede.jpg" alt="Registro histórico do primeiro posto da Rede Pedro Pelanda" fill sizes="310px" /><span>DESDE</span><strong>1966</strong></div>
        <div className="story-copy"><p className="eyebrow orange"><span /> Nossa história</p><h2>Uma rede construída por quem <span className="orange-word">conhece a estrada</span></h2><p>O que começou como um posto se transformou em uma rede presente em três estados. Crescemos mantendo o jeito próximo de receber e a estrutura que faz diferença em cada parada.</p><Link className="outline-button" href="/a-rede">Conheça a Rede <ArrowIcon /></Link></div>
        <div className="story-quote"><span>“</span><p>Aquele do Pedrinho.</p><small>Uma lembrança que virou marca.</small></div>
      </section>

      <section className="news-section" id="news">
        <div className="section-heading"><div><p className="eyebrow orange"><span /> News da Rede</p><h2>Histórias que colocam <span className="orange-word">a rede em movimento</span></h2></div><Link href="/news">Ver todas as notícias <ArrowIcon /></Link></div>
        <div className="news-grid">
          <article className="news-featured"><div className="news-photo"><Image src="/media/instagram-reference/familia-posto.jpg" alt="Família fazendo uma parada segura no posto" fill sizes="(max-width: 720px) 100vw, 40vw" /></div><small>Na estrada</small><h3>Uma boa parada faz toda a diferença na viagem</h3><Link href="/news/uma-boa-parada">Continuar lendo <ArrowIcon /></Link></article>
          <article><div className="news-photo"><Image src="/media/instagram-reference/motoristas.jpg" alt="Profissionais da estrada junto a um caminhão" fill sizes="(max-width: 720px) 100vw, 30vw" /></div><small>Gente que move</small><h3>Quem está sempre em movimento pode contar com a gente</h3><Link href="/news/gente-que-move-a-rede">Continuar lendo <ArrowIcon /></Link></article>
          <article><div className="news-photo"><Image src="/media/instagram-reference/posto-por-do-sol.jpg" alt="Unidade da Rede Pedro Pelanda ao pôr do sol" fill sizes="(max-width: 720px) 100vw, 30vw" loading="eager" /></div><small>Unidades</small><h3>Seu ponto de apoio em cada novo caminho</h3><Link href="/news/um-ponto-de-apoio">Continuar lendo <ArrowIcon /></Link></article>
        </div>
      </section>

      <section className="careers" id="trabalhe"><div><p className="eyebrow"><span /> Faça parte</p><h2>Seu próximo caminho pode começar aqui.</h2></div><Link href="/trabalhe-conosco">Conheça nossas oportunidades <ArrowIcon /></Link></section>

      <footer><Image className="footer-logo" src="/brand/logo-white.svg" alt="Rede Pedro Pelanda" width={180} height={70} /><p>Você na estrada. A gente te apoia.</p><div><Link href="/a-rede">A Rede</Link><Link href="/unidades">Unidades</Link><Link href="/servicos">Serviços</Link><Link href="/news">News</Link><Link href="/contato">Contato</Link></div><small>© 2026 Rede Pedro Pelanda. Protótipo em desenvolvimento.</small></footer>
    </main>
  );
}
