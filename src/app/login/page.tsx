"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import "./login.css";

type AccessMode = "google" | "pin";

function GoogleIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21.8 12.23c0-.76-.07-1.5-.22-2.2H12v4.16h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.6Z" fill="currentColor" stroke="none" /><path d="M12 22c2.76 0 5.07-.91 6.76-2.47l-3.3-2.56c-.92.62-2.1.98-3.46.98-2.66 0-4.91-1.8-5.72-4.22H2.87v2.64A10.2 10.2 0 0 0 12 22Z" fill="currentColor" stroke="none" opacity=".72" /><path d="M6.28 13.73A6.12 6.12 0 0 1 5.96 12c0-.6.11-1.19.32-1.73V7.63H2.87A10.2 10.2 0 0 0 1.8 12c0 1.64.39 3.2 1.07 4.37l3.41-2.64Z" fill="currentColor" stroke="none" opacity=".52" /><path d="M12 6.05c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.06 2.99 14.76 2 12 2a10.2 10.2 0 0 0-9.13 5.63l3.41 2.64C7.09 7.85 9.34 6.05 12 6.05Z" fill="currentColor" stroke="none" opacity=".9" /></svg>;
}

function PinIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>;
}

export default function LoginPage() {
  const [mode, setMode] = useState<AccessMode>("google");
  const [pin, setPin] = useState("");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(pin.trim() ? "A validação deste PIN será conectada ao Firebase." : "Digite o PIN recebido para continuar.");
  }

  return (
    <main className="login-page">
      <section className="login-art" aria-label="Rede Pedro Pelanda">
        <div className="login-art-top"><Image src="/brand/logo-white.svg" alt="Rede Pedro Pelanda" width={172} height={64} priority /><span>Calendário de marketing</span></div>
        <div className="login-art-copy"><span className="login-kicker">A estrada de 2027 começa aqui</span><h1>Planejamento<br /><em>em movimento.</em></h1><p>Escolha como você vai acessar o calendário da Rede Pedro Pelanda.</p></div>
        <div className="login-road" aria-hidden="true"><span /><span /><b>PP</b></div>
        <small className="login-art-footer">Rede Pedro Pelanda · Marketing 360º</small>
      </section>

      <section className="login-panel">
        <div className="login-panel-head"><span className="login-panel-kicker">Área de acesso</span><h2>Entrar no dashboard</h2><p>Administradores usam Google Workspace. O cliente entra com o PIN recebido.</p></div>

        <div className="access-options" role="tablist" aria-label="Tipo de acesso">
          <button type="button" role="tab" aria-selected={mode === "google"} className={mode === "google" ? "access-option active" : "access-option"} onClick={() => { setMode("google"); setNotice(""); }}><span className="access-icon"><GoogleIcon /></span><span><strong>Entrar com Google</strong><small>Somente contas @dg5.com.br</small></span><i>→</i></button>
          <button type="button" role="tab" aria-selected={mode === "pin"} className={mode === "pin" ? "access-option active" : "access-option"} onClick={() => { setMode("pin"); setNotice(""); }}><span className="access-icon"><PinIcon /></span><span><strong>Entrar com PIN</strong><small>Acesso do cliente</small></span><i>→</i></button>
        </div>

        {mode === "google" ? <div className="access-detail"><div className="detail-number">01</div><div><span className="login-panel-kicker">Acesso administrativo</span><h3>Entre com sua conta Google Workspace.</h3><p>O acesso será liberado somente para contas do domínio <strong>@dg5.com.br</strong>, após a conexão com o Firebase.</p><button type="button" className="login-action" onClick={() => setNotice("O login Google será conectado ao Firebase.")}><GoogleIcon /> Entrar com Google</button></div></div> : <form className="access-detail" onSubmit={handleSubmit}><div className="detail-number">02</div><div><span className="login-panel-kicker">Acesso do cliente</span><h3>Digite o PIN do seu calendário.</h3><p>O PIN é exclusivo do cliente e não expira automaticamente.</p><label className="pin-field"><span>PIN de acesso</span><input value={pin} onChange={(event) => setPin(event.target.value)} inputMode="numeric" autoComplete="one-time-code" maxLength={12} placeholder="Digite seu PIN" aria-label="PIN de acesso" /></label><button type="submit" className="login-action"><PinIcon /> Entrar com PIN</button></div></form>}

        {notice ? <p className="login-notice" role="status">{notice}</p> : null}
        <div className="login-panel-footer"><span>Acesso protegido</span><Link href="/">Voltar ao site <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
