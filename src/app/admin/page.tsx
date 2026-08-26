"use client";

import Image from "next/image";
import { useState } from "react";
import "./admin.css";

const contents = [
  { title: "Campanha de inverno chega às unidades", type: "Campanha", author: "Comunicação", status: "Aguardando aprovação", date: "Hoje, 14h20" },
  { title: "Novidades no restaurante de Maracajá", type: "Restaurantes", author: "Unidade Perdigão", status: "Rascunho", date: "Hoje, 10h05" },
  { title: "Rede Pedro Pelanda abre novas oportunidades", type: "Vagas", author: "Recursos Humanos", status: "Agendada", date: "Amanhã, 8h" },
  { title: "Ação de saúde para motoristas em Piên", type: "Unidades", author: "Unidade Piên", status: "Sugestão recebida", date: "Ontem, 17h40" },
];

export default function AdminPage() {
  const [active, setActive] = useState("Visão geral");
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Image src="/brand/logo-white.svg" alt="Rede Pedro Pelanda" width={164} height={62} style={{ width: 164, height: 62 }} />
        <small>Painel de conteúdo</small>
        <nav aria-label="Navegação do painel">
          {["Visão geral", "Notícias", "Sugestões", "Newsletter", "Unidades", "Usuários"].map((item, index) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}><span>0{index + 1}</span>{item}</button>
          ))}
        </nav>
        <div className="admin-user"><span>BP</span><div><strong>Bruna Pelanda</strong><small>Administradora</small></div></div>
      </aside>

      <section className="admin-main">
        <header><div><p>Rede Pedro Pelanda</p><h1>{active}</h1></div><button className="admin-primary" onClick={() => setEditorOpen(true)}>+ Criar notícia</button></header>

        {active === "Visão geral" && !editorOpen && (
          <>
            <div className="admin-welcome"><div><span>Quinta-feira, 31 de julho</span><h2>O que precisa de atenção hoje?</h2><p>Acompanhe as pautas da rede e prepare a próxima newsletter.</p></div><strong>NEWS<br />DA REDE</strong></div>
            <div className="admin-metrics">
              <article><span>07</span><p>Rascunhos</p><small>2 alterados hoje</small></article>
              <article className="attention"><span>03</span><p>Aguardando aprovação</p><small>Revisar antes de sexta</small></article>
              <article><span>02</span><p>Agendadas</p><small>Próximos 7 dias</small></article>
              <article><span>24</span><p>Publicadas</p><small>Neste mês</small></article>
            </div>
            <div className="admin-columns">
              <section className="content-panel"><div className="panel-title"><div><small>Fluxo editorial</small><h2>Conteúdos recentes</h2></div><button onClick={() => setActive("Notícias")}>Ver todos</button></div>
                <div className="content-table">{contents.map((content) => <button className="content-row" key={content.title} onClick={() => setEditorOpen(true)}><span className="content-type">{content.type.charAt(0)}</span><span className="content-name"><strong>{content.title}</strong><small>{content.author} · {content.date}</small></span><span className={`status status-${content.status.toLowerCase().replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>{content.status}</span><span className="row-arrow">→</span></button>)}</div>
              </section>
              <aside className="newsletter-panel"><small>Próximo envio</small><h2>News da semana</h2><div className="newsletter-date"><strong>01</strong><span>AGO<br />SEXTA, 8H</span></div><div className="newsletter-progress"><span><i style={{width:"68%"}} /></span><small>4 de 6 conteúdos selecionados</small></div><button>Montar newsletter →</button></aside>
            </div>
          </>
        )}

        {(active !== "Visão geral" || editorOpen) && (
          <section className="editor-screen">
            <div className="editor-top"><button onClick={() => {setEditorOpen(false);setActive("Visão geral")}}>← Voltar</button><span>Rascunho salvo agora</span><button className="preview-button">Visualizar</button><button className="approval-button">Enviar para aprovação</button></div>
            <div className="editor-layout"><div className="editor-form"><p className="admin-kicker">Nova publicação</p><input className="title-input" aria-label="Título da notícia" placeholder="Título da notícia" defaultValue="Uma nova história começa na estrada" /><textarea aria-label="Resumo" placeholder="Escreva um breve resumo para apresentar a notícia." defaultValue="A Rede Pedro Pelanda inicia uma nova fase de comunicação para ficar ainda mais próxima de quem trabalha e viaja com a gente." />
              <div className="editor-toolbar"><button><b>B</b></button><button><i>I</i></button><button>H2</button><button>• Lista</button><button>+ Imagem</button><button className="ai-button">✦ Ajudar a escrever</button></div>
              <div className="editor-body" contentEditable suppressContentEditableWarning><h2>Conte aqui o que aconteceu</h2><p>Comece escrevendo as informações mais importantes. Você pode editar o texto livremente ou pedir uma sugestão de primeiro rascunho.</p></div>
            </div><aside className="editor-settings"><h3>Publicação</h3><label>Categoria<select defaultValue="Notícias da rede"><option>Notícias da rede</option><option>Unidades</option><option>Campanhas</option><option>Vagas</option></select></label><label>Unidade relacionada<select defaultValue="Toda a rede"><option>Toda a rede</option><option>Posto Pelanda 22</option><option>Posto Pelanda 27</option></select></label><label>Data de publicação<input type="date" /></label><div className="check-setting"><input type="checkbox" id="home" /><label htmlFor="home">Destacar na página inicial</label></div><div className="check-setting"><input type="checkbox" id="newsletter" defaultChecked /><label htmlFor="newsletter">Incluir na próxima newsletter</label></div><div className="ai-note"><strong>✦ Apoio à redação</strong><p>A ferramenta sugere textos, mas nunca publica sem a aprovação da equipe.</p><button>Gerar primeiro rascunho</button></div></aside></div>
          </section>
        )}
      </section>
    </main>
  );
}
