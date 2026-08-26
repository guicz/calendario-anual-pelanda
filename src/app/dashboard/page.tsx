"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { months, sourceUrl, units } from "./data";
import "./dashboard.css";

type View = "ano" | "meses" | "unidades";

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function MenuIcon({ type }: { type: "overview" | "calendar" | "unit" | "source" }) {
  if (type === "calendar") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 18h3" /></svg>;
  if (type === "unit") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20V9l8-5 8 5v11M8 20v-6h8v6M2 20h20" /></svg>;
  if (type === "source") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16V6" /></svg>;
}

function Metric({ value, label, detail, tone }: { value: string; label: string; detail: string; tone?: "orange" | "green" | "purple" }) {
  return <article className={`metric-card ${tone ?? ""}`}><span className="metric-value">{value}</span><span className="metric-label">{label}</span><small>{detail}</small></article>;
}

export default function DashboardPage() {
  const [view, setView] = useState<View>("ano");
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(9);
  const [query, setQuery] = useState("");
  const month = months[selectedMonth];
  const unit = units[selectedUnit];
  const maxTotal = Math.max(...months.map((item) => item.total));
  const maxUnitTotal = Math.max(...units.map((item) => item.total));

  const filteredUnits = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return units;
    return units.filter((item) => `${item.name} ${item.city}`.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [query]);

  useEffect(() => {
    if (view === "ano") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(`#${view === "meses" ? "month-section" : "unit-section"}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  function selectView(nextView: View) {
    setView(nextView);
  }

  return (
    <main className="marketing-dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><Image src="/brand/logo-white.svg" alt="Rede Pedro Pelanda" width={172} height={64} priority /><span>MARKETING 360º</span></div>
        <div className="sidebar-year"><span>Calendário</span><strong>2027</strong></div>
        <nav className="dashboard-nav" aria-label="Navegação do dashboard">
          <button className={view === "ano" ? "active" : ""} onClick={() => selectView("ano")}><MenuIcon type="overview" /><span>Visão do ano</span></button>
          <button className={view === "meses" ? "active" : ""} onClick={() => selectView("meses")}><MenuIcon type="calendar" /><span>Por mês</span></button>
          <button className={view === "unidades" ? "active" : ""} onClick={() => selectView("unidades")}><MenuIcon type="unit" /><span>Por unidade</span></button>
        </nav>
        <div className="sidebar-source"><span className="source-icon"><MenuIcon type="source" /></span><div><small>Fonte conectada</small><strong>Planilha 2027</strong></div><a href={sourceUrl} target="_blank" rel="noreferrer" aria-label="Abrir planilha fonte"><Arrow /></a></div>
        <div className="sidebar-footer"><span className="status-dot" /> Snapshot revisado<br /><small>Dados de planejamento</small></div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar"><div className="breadcrumb"><span>Rede Pedro Pelanda</span><i>/</i><strong>Dashboard de marketing</strong></div><div className="topbar-actions"><span className="updated-label">Base 2027 · 128 ações</span><a href={sourceUrl} target="_blank" rel="noreferrer" className="source-link">Abrir planilha <Arrow /></a></div></header>

        <section className="dashboard-hero">
          <div className="hero-copy-dashboard"><span className="kicker">Calendário de Marketing 360º</span><h1>Um ano inteiro<br /><em>em movimento.</em></h1><p>Uma leitura visual das campanhas, datas locais e pontos de atenção que colocam a Rede Pedro Pelanda na estrada em 2027.</p><div className="hero-meta"><span><b className="live-dot" /> Planejamento anual</span><span>14 operações · 13 cidades</span></div></div>
          <div className="hero-image-dashboard"><Image src="/media/units/posto-22/01.jpg" alt="Posto 22 da Rede Pedro Pelanda" fill sizes="(max-width: 900px) 100vw, 34vw" priority /><div className="hero-image-caption"><small>O ponto de partida</small><strong>Fazenda Rio Grande</strong></div></div>
          <div className="hero-stamp"><span>PP</span><small>desde</small><strong>1966</strong></div>
        </section>

        <div className="dashboard-content-wrap">
          <div className="view-tabs" role="tablist" aria-label="Perspectiva do dashboard">
            {([['ano', 'Ano'], ['meses', 'Meses'], ['unidades', 'Unidades']] as [View, string][]).map(([key, label]) => <button key={key} role="tab" aria-selected={view === key} className={view === key ? "selected" : ""} onClick={() => selectView(key)}>{label}</button>)}
          </div>

          <section className="metric-grid" aria-label="Resumo anual">
            <Metric value="128" label="Ações previstas" detail="No calendário da rede" tone="purple" />
            <Metric value="49" label="Ações locais" detail="Com presença nas cidades" tone="orange" />
            <Metric value="46" label="Com mídia paga" detail="Campanhas com impulsionamento" tone="green" />
            <Metric value="14" label="Operações" detail="Em 13 cidades" />
          </section>

          {view === "ano" && <section className="dashboard-grid annual-view" aria-label="Visão anual">
            <article className="panel annual-chart-panel"><div className="panel-heading"><div><span className="panel-kicker">Ritmo do ano</span><h2>A estrada de 2027, mês a mês</h2></div><div className="chart-legend"><span><i className="legend-total" /> ações</span><span><i className="legend-local" /> local</span><span><i className="legend-paid" /> mídia</span></div></div><div className="annual-chart"><div className="chart-axis"><span>14</span><span>7</span><span>0</span></div><div className="bar-area">{months.map((item, index) => <button className={`month-column ${selectedMonth === index ? "selected" : ""}`} key={item.month} onClick={() => { setSelectedMonth(index); setView("meses"); }} aria-label={`Selecionar ${item.month}`}><span className="bar-value">{item.total}</span><span className="bar-track"><i style={{ height: `${(item.total / maxTotal) * 100}%` }} /><b style={{ height: `${(item.local / item.total) * 100}%` }} /></span><span className="month-label">{item.short}</span><span className="month-markers"><em style={{ width: `${(item.local / Math.max(...months.map((monthItem) => monthItem.local))) * 100}%` }} /><small className={item.paid > 3 ? "high" : ""}>{item.paid}</small></span></button>)}</div></div><div className="chart-note"><span>Janela de maior pressão</span><strong>Julho e agosto concentram as ações locais</strong><small>O número de mídia paga não é acumulado ao total de ações; uma ação pode ter mais de uma frente.</small></div></article>
            <aside className="panel attention-panel"><div className="panel-heading"><div><span className="panel-kicker">Leitura rápida</span><h2>Pontos de atenção</h2></div><span className="panel-index">01</span></div><div className="attention-list"><div><span>01</span><p><strong>Agosto</strong><small>13 ações · 8 locais</small></p><b>mais local</b></div><div><span>02</span><p><strong>Abril</strong><small>13 ações · 6 mídia paga</small></p><b>mais mídia</b></div><div><span>03</span><p><strong>Julho</strong><small>7 ações locais</small></p><b>pico local</b></div></div><a href="#month-section" className="panel-link" onClick={() => setView("meses")}>Explorar os meses <Arrow /></a></aside>
            <article className="panel focus-panel"><div className="panel-heading"><div><span className="panel-kicker">Mês selecionado</span><h2>{month.month}</h2></div><select value={selectedMonth} onChange={(event) => setSelectedMonth(Number(event.target.value))} aria-label="Selecionar mês">{months.map((item, index) => <option key={item.month} value={index}>{item.month}</option>)}</select></div><div className="focus-content"><div className="focus-number"><strong>{month.total}</strong><span>ações previstas</span></div><div className="focus-copy"><span className="focus-line" /><p>{month.focus}</p><div className="tag-list">{month.categories.map((category) => <span key={category}>{category}</span>)}</div></div></div></article>
            <article className="panel source-note-panel"><span className="panel-kicker">Nota de leitura</span><h2>Planejamento antes da execução.</h2><p>Esta versão mostra o que está previsto na planilha. Alcance, fluxo, vendas, cupons e avaliações entram quando a camada de medição for preenchida.</p><a href={sourceUrl} target="_blank" rel="noreferrer">Ver premissas da base <Arrow /></a></article>
          </section>}

          {view === "meses" && <section id="month-section" className="month-view" aria-label="Visão por mês"><div className="section-intro"><div><span className="panel-kicker">Janela mensal</span><h2>Escolha um mês para entrar no detalhe.</h2></div><select value={selectedMonth} onChange={(event) => setSelectedMonth(Number(event.target.value))} aria-label="Selecionar mês">{months.map((item, index) => <option key={item.month} value={index}>{item.month}</option>)}</select></div><div className="month-selector">{months.map((item, index) => <button key={item.month} className={selectedMonth === index ? "active" : ""} onClick={() => setSelectedMonth(index)}><span>{item.short}</span><b>{item.total}</b><small>ações</small></button>)}</div><div className="month-detail-grid"><article className="panel month-summary"><span className="panel-kicker">{month.month} · foco do ciclo</span><h2>{month.focus}</h2><div className="month-mini-metrics"><div><strong>{month.total}</strong><span>ações previstas</span></div><div><strong>{month.local}</strong><span>ações locais</span></div><div><strong>{month.paid}</strong><span>com mídia</span></div></div><div className="tag-list">{month.categories.map((category) => <span key={category}>{category}</span>)}</div></article><article className="panel agenda-panel"><div className="panel-heading"><div><span className="panel-kicker">Agenda em destaque</span><h2>O que merece atenção</h2></div><span className="panel-index">{String(month.highlights.length).padStart(2, "0")}</span></div><div className="agenda-list">{month.highlights.map((item) => <div className="agenda-row" key={`${item.date}-${item.event}`}><span className="agenda-date">{item.date}</span><div><strong>{item.event}</strong><small>{item.location}</small><em>{item.category}</em></div>{item.paid ? <span className="paid-badge">mídia</span> : <span className="local-badge">local</span>}</div>)}</div></article></div></section>}

          {view === "unidades" && <section id="unit-section" className="unit-view" aria-label="Visão por unidade"><div className="section-intro"><div><span className="panel-kicker">Presença local</span><h2>Como o ano se distribui pelas unidades.</h2></div><label className="unit-search"><span>Buscar unidade</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou cidade" /></label></div><div className="unit-detail-layout"><div className="unit-list">{filteredUnits.map((item) => { const index = units.indexOf(item); return <button key={item.tab} className={`unit-row ${selectedUnit === index ? "active" : ""}`} onClick={() => setSelectedUnit(index)}><span className="unit-number">{String(index + 1).padStart(2, "0")}</span><span className="unit-row-info"><strong>{item.name}</strong><small>{item.city}</small></span><span className="unit-row-bar"><i style={{ width: `${(item.total / maxUnitTotal) * 100}%` }} /></span><span className="unit-row-total">{item.total}</span><Arrow /></button> })}{filteredUnits.length === 0 ? <p className="empty-state">Nenhuma unidade encontrada.</p> : null}</div><aside className="panel unit-profile"><div className="unit-profile-top"><span className="panel-kicker">Unidade selecionada</span><span className="unit-code">{String(selectedUnit + 1).padStart(2, "0")}</span></div><h2>{unit.name}</h2><p>{unit.city}</p><div className="unit-profile-metrics"><div><strong>{unit.total}</strong><span>ações no calendário</span></div><div><strong>{unit.local}</strong><span>ações locais</span></div><div><strong>{unit.paid}</strong><span>com mídia</span></div></div><div className="unit-sparkline"><span className="panel-kicker">Intensidade por mês</span><div>{unit.months.map((value, index) => <button key={months[index].short} className={selectedMonth === index ? "active" : ""} onClick={() => { setSelectedMonth(index); setView("meses"); }} aria-label={`${months[index].month}: ${value} ações`}><i style={{ height: `${(value / 11) * 100}%` }} /><small>{months[index].short}</small></button>)}</div></div><a className="panel-link" href={sourceUrl} target="_blank" rel="noreferrer">Abrir aba da planilha <Arrow /></a></aside></div></section>}
        </div>
      </section>
    </main>
  );
}
