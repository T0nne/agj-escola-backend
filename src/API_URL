import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME CONTEXT ─────────────────────────────────────────────────────────────
const GlobalStyle = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:   #0D1B2A;
      --navy2:  #152438;
      --gold:   #D4A843;
      --gold2:  #EDBE5C;
      --red:    #C94040;
      --green:  #2A7A55;
      --blue:   #2563EB;
      --purple: #7C3AED;
    }

    .light-theme {
      --bg:       #F7F4EF;
      --surface:  #FFFFFF;
      --surface2: #F0EDE8;
      --border:   #E2DDD6;
      --text:     #0D1B2A;
      --text2:    #4A5568;
      --text3:    #8A96A3;
      --shadow:   0 2px 16px rgba(13,27,42,.08);
      --shadowHov:0 8px 32px rgba(13,27,42,.14);
    }
    .dark-theme {
      --bg:       #0A1220;
      --surface:  #111927;
      --surface2: #192333;
      --border:   #1E2D3F;
      --text:     #E8EDF4;
      --text2:    #9AAFC4;
      --text3:    #566A80;
      --shadow:   0 2px 16px rgba(0,0,0,.3);
      --shadowHov:0 8px 32px rgba(0,0,0,.45);
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); transition: background .3s, color .3s; overflow-x: hidden; }
    h1,h2,h3,h4 { font-family: 'Fraunces', serif; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--surface2); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    .fi  { animation: fi .4s ease forwards; }
    .fi2 { animation: fi .4s ease .08s both; }
    .fi3 { animation: fi .4s ease .16s both; }
    @keyframes fi { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
    @keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideInRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

    .btn { display:inline-flex;align-items:center;gap:7px;padding:9px 20px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .18s;white-space:nowrap; }
    .bp  { background:var(--gold);color:var(--navy); }
    .bp:hover { background:var(--gold2);transform:translateY(-1px);box-shadow:0 4px 18px rgba(212,168,67,.4); }
    .bd  { background:var(--navy);color:#fff; }
    .dark-theme .bd { background:var(--surface2);color:var(--text); }
    .bd:hover { opacity:.88; }
    .bo  { background:transparent;color:var(--text);border:1.5px solid var(--border); }
    .bo:hover { background:var(--surface2); }
    .br  { background:var(--red);color:#fff; }
    .bg  { background:var(--green);color:#fff; }
    .bb  { background:var(--blue);color:#fff; }
    .bpu { background:var(--purple);color:#fff; }
    .sm  { padding:5px 13px;font-size:12px; }
    .btn:disabled { opacity:.4;cursor:not-allowed;transform:none!important; }

    input, textarea, select {
      width:100%;padding:9px 13px;border-radius:8px;
      border:1.5px solid var(--border);
      font-family:'DM Sans',sans-serif;font-size:13px;
      background:var(--surface);color:var(--text);outline:none;transition:border .18s,background .3s;
    }
    input:focus, textarea:focus, select:focus { border-color:var(--gold); }
    label { font-size:11px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:var(--text3);display:block;margin-bottom:5px; }

    .card { background:var(--surface);border-radius:14px;box-shadow:var(--shadow);overflow:hidden;transition:box-shadow .2s,transform .2s,background .3s; }
    .card:hover { box-shadow:var(--shadowHov); }
    .card-hover:hover { transform:translateY(-4px); }

    .tag { display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.4px;text-transform:uppercase; }
    .tg  { background:#FFF3D0;color:#A07828; }
    .tb  { background:#DBEAFE;color:#1D4ED8; }
    .tgr { background:#D1FAE5;color:#065F46; }
    .tr  { background:#FEE2E2;color:#B91C1C; }
    .tpu { background:#EDE9FE;color:#5B21B6; }
    .dark-theme .tg  { background:#3D2E0A;color:#F0C060; }
    .dark-theme .tb  { background:#1E3A6E;color:#93C5FD; }
    .dark-theme .tgr { background:#064E3B;color:#6EE7B7; }
    .dark-theme .tr  { background:#4C1D1D;color:#FCA5A5; }
    .dark-theme .tpu { background:#2E1065;color:#C4B5FD; }

    .bdg { display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;font-size:10px;font-weight:700;background:var(--red);color:#fff;padding:0 5px; }
    .div { height:1px;background:var(--border);margin:16px 0; }
    .lbl { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:7px; }

    .mo { position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:2000;padding:20px;backdrop-filter:blur(4px);animation:fi .2s ease; }
    .mb { background:var(--surface);border-radius:16px;padding:28px;width:100%;max-width:700px;box-shadow:0 24px 80px rgba(0,0,0,.3);max-height:90vh;overflow-y:auto; }

    .sl { display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--text3);border:none;background:none;width:100%;text-align:left; }
    .sl:hover { background:rgba(212,168,67,.12);color:var(--text); }
    .sl.act { background:var(--gold);color:var(--navy);font-weight:700; }

    .nav-btn { background:transparent;border:none;color:rgba(255,255,255,.75);padding:7px 10px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:400;font-family:'DM Sans';transition:all .15s; }
    .nav-btn:hover,.nav-btn.active { color:var(--gold);background:rgba(212,168,67,.12); }
    .nav-btn.active { font-weight:600; }

    table { width:100%;border-collapse:collapse; }
    th { text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text3);padding:9px 14px;border-bottom:1.5px solid var(--border); }
    td { padding:11px 14px;font-size:13px;border-bottom:1px solid var(--border);color:var(--text); }
    tr:last-child td { border-bottom:none; }
    tbody tr:hover td { background:var(--surface2); }

    .toast { position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;padding:10px 20px;border-radius:24px;font-size:13px;font-weight:600;z-index:3000;animation:fi .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.3); }
    .dark-theme .toast { background:var(--gold);color:var(--navy); }

    .notification { position:fixed;top:20px;right:20px;background:var(--surface);border:2px solid var(--gold);border-radius:12px;padding:16px 18px;z-index:2500;max-width:380px;box-shadow:0 8px 32px rgba(0,0,0,.2);animation:slideInRight .4s ease; }

    @media (max-width:768px) {
      .hm { display:none!important; }
      .mb { padding:18px; }
      .grid-2 { grid-template-columns:1fr!important; }
      .sidebar { display:none!important; }
    }
  `}</style>
);

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const IC = {
  home:    `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  news:    `<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>`,
  img:     `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`,
  mail:    `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
  lock:    `<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>`,
  users:   `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`,
  plus:    `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
  edit:    `<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
  trash:   `<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>`,
  check:   `<polyline points="20 6 9 17 4 12"/>`,
  x:       `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  menu:    `<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  eye:     `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
  arr:     `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  sch:     `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
  out:     `<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
  dsh:     `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`,
  food:    `<path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>`,
  page:    `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
  cal:     `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  msg:     `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>`,
  sun:     `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  moon:    `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`,
  bell:    `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
  profile: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  alert:   `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  paint:   `<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>`,
};
const I = ({ n, s = 16, c = "currentColor" }) => (
  <svg width={s} height={s} fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"
    strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: IC[n] || "" }} />
);

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const fmtDate = () => new Date().toLocaleDateString("pt-BR");

// Identifica tipo de usuário pelo email
const getUserType = (email) => {
  if (email.includes("@educacao.ba.gov.br") || email.includes("@agj.edu.br")) {
    if (email.includes("prof") || email.includes("professor")) return "Professor";
    if (email.includes("admin") || email.includes("dir")) return "Administrador";
    return "Aluno";
  }
  return null;
};

// Base de dados válida
const validEmails = {
  "aluno1@educacao.ba.gov.br": "Aluno",
  "aluno2@educacao.ba.gov.br": "Aluno",
  "prof.maria@educacao.ba.gov.br": "Professor",
  "prof.carlos@educacao.ba.gov.br": "Professor",
  "admin@agj.edu.br": "Administrador",
  "diretor@agj.edu.br": "Administrador",
};

// ─── SEED DATA ─────────────────────────────────────────────────────────────────
const initPosts = [
  { id: 1, title: "Bem-vindo ao Ano Letivo 2026!", category: "Institucional", content: "É com grande alegria que iniciamos mais um ano letivo cheio de desafios e conquistas.", cover: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", date: "10/03/2026", status: "publicado", author: "Direção", views: 312, likes: 24, featured: true },
  { id: 2, title: "Feira de Ciências — Inscrições Abertas", category: "Eventos", content: "As inscrições para a Feira de Ciências 2026 já estão abertas! Alunos do 6º ao 9º ano podem participar.", cover: "https://images.unsplash.com/photo-1532094349884-543559145003?w=800&q=80", date: "15/03/2026", status: "publicado", author: "Coordenação", views: 197, likes: 18, featured: false },
];

// ─── PAGE: LOGIN ───────────────────────────────────────────────────────────────
const Login = ({ onLogin, setPage }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const submit = (ev) => {
    ev.preventDefault();
    setErro("");

    if (!email.includes("@")) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    if (!email.includes("@educacao.ba.gov.br") && !email.includes("@agj.edu.br")) {
      setErro("⚠️ Use um email institucional (@educacao.ba.gov.br ou @agj.edu.br)");
      return;
    }

    const userType = validEmails[email.toLowerCase()] || getUserType(email);
    
    if (!userType) {
      setErro("Email não encontrado no sistema.");
      return;
    }

    if (senha.length < 3) {
      setErro("Senha deve ter no mínimo 3 caracteres.");
      return;
    }

    const userName = email.split("@")[0];
    onLogin({
      id: Date.now(),
      email,
      name: userName,
      type: userType,
      notifications: []
    });
  };

  const demoLogins = [
    { email: "aluno1@educacao.ba.gov.br", type: "👤 Aluno", senha: "123" },
    { email: "prof.maria@educacao.ba.gov.br", type: "👨‍🏫 Professor", senha: "123" },
    { email: "admin@agj.edu.br", type: "🔑 Admin", senha: "123" },
  ];

  return (
    <div className="fi" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(135deg, var(--navy) 0%, #1E3A58 100%)" }}>
      <div className="card" style={{ padding: 40, width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, background: "var(--gold)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <I n="lock" s={28} c="var(--navy)" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Portal da Escola AGJ</h2>
          <p style={{ color: "var(--text3)", fontSize: 13 }}>Entre com seu email educacional</p>
        </div>

        {erro && (
          <div style={{ background: "rgba(201,64,64,.1)", border: "1.5px solid rgba(201,64,64,.3)", borderRadius: 9, padding: "11px 14px", color: "var(--red)", fontSize: 12, marginBottom: 18, lineHeight: 1.5 }}>
            {erro}
          </div>
        )}

        <form onSubmit={submit} style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 13 }}>
            <label>Email Institucional *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@educacao.ba.gov.br" />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label>Senha *</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn bp" style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 14 }}>
            <I n="lock" s={14} c="var(--navy)" /> Entrar na Plataforma
          </button>
        </form>

        <div className="div" />

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>📌 Contas de Demonstração</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {demoLogins.map((d) => (
              <button
                key={d.email}
                onClick={() => {
                  setEmail(d.email);
                  setSenha(d.senha);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 9,
                  padding: "10px 12px",
                  cursor: "pointer",
                  transition: "all .15s",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--gold)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <span style={{ fontSize: 16 }}>{d.type.split(" ")[0]}</span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>{d.type}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace" }}>{d.email}</div>
                </div>
                <span style={{ fontSize: 12, color: "var(--gold)" }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: HOME ────────────────────────────────────────────────────────────────
const Home = ({ posts, user, setPage, setSel }) => {
  return (
    <div>
      <div style={{ background: "var(--navy)", color: "#fff", padding: "40px 24px", textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 900, marginBottom: 10 }}>Bem-vindo! 👋</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.7)" }}>
          {user.type === "Aluno" && "Centro de Notícias da Escola AGJ"}
          {user.type === "Professor" && "Portal do Professor - Manage Content"}
          {user.type === "Administrador" && "Painel de Administração"}
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <div className="lbl">Últimas Notícias</div>
            <h2 style={{ fontSize: 26, fontWeight: 700 }}>Escola AGJ</h2>
          </div>
          {(user.type === "Professor" || user.type === "Administrador") && (
            <button className="btn bp" onClick={() => setPage("admin")} style={{ gap: 8 }}>
              <I n="dsh" s={14} /> Painel Admin
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
          {posts.filter(p => p.status === "publicado").map((p) => (
            <div key={p.id} className="card card-hover" style={{ cursor: "pointer" }} onClick={() => { setSel(p); setPage("post"); }}>
              <img src={p.cover} alt={p.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <div style={{ padding: "16px 18px" }}>
                <span className="tag tb" style={{ marginBottom: 8, display: "inline-block" }}>{p.category}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{p.content.slice(0, 80)}…</p>
                <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 11, color: "var(--text3)" }}>
                  <span>👁 {p.views}</span>
                  <span>❤️ {p.likes}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: POST ────────────────────────────────────────────────────────────────
const PostPage = ({ post, posts, user, setPage, setSel }) => {
  return (
    <div className="fi" style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px" }}>
      <button className="btn bo sm" onClick={() => setPage("home")} style={{ marginBottom: 22 }}>← Voltar</button>
      <h1 style={{ fontSize: "clamp(22px,4vw,40px)", marginBottom: 10 }}>{post.title}</h1>
      <div style={{ display: "flex", gap: 16, color: "var(--text3)", fontSize: 12, marginBottom: 22, flexWrap: "wrap" }}>
        <span>✍️ {post.author}</span>
        <span>📅 {post.date}</span>
        <span>👁 {post.views}</span>
      </div>
      {post.cover && <img src={post.cover} alt={post.title} style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 13, marginBottom: 28 }} />}
      <div style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text2)" }}>
        {post.content.split("\n").map((l, i) => <p key={i} style={{ marginBottom: 12 }}>{l}</p>)}
      </div>
    </div>
  );
};

// ─── ADMIN: SIDEBAR ────────────────────────────────────────────────────────────
const AdminSidebar = ({ tab, setTab, user, onLogout }) => {
  const isAdmin = user.type === "Administrador";
  const isProf = user.type === "Professor";

  const tabs = [
    { id: "dashboard", icon: "dsh", label: "Dashboard", all: true },
    { id: "posts", icon: "news", label: "Postagens", all: true },
    { id: "comments", icon: "msg", label: "Comentários", all: true },
    { id: "gallery", icon: "img", label: "Galeria", all: true },
    { id: "menu", icon: "food", label: "Cardápio", all: true },
    { id: "calendar", icon: "cal", label: "Calendário", all: true },
    { id: "pages", icon: "page", label: "Páginas", all: true },
    { id: "feedback", icon: "mail", label: "Feedbacks", admin: true },
    { id: "users", icon: "users", label: "Usuários", admin: true },
    { id: "identity", icon: "paint", label: "Identidade", admin: true },
  ];

  return (
    <aside className="sidebar" style={{ width: 240, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", minHeight: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700 }}>AGJ Admin</h3>
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
          {user.type === "Professor" && "👨‍🏫 Professor"}
          {user.type === "Administrador" && "🔑 Administrador"}
        </div>
      </div>

      <nav style={{ padding: "8px", flex: 1, overflowY: "auto" }}>
        {tabs.map(t => {
          if (t.admin && !isAdmin) return null;
          return (
            <button
              key={t.id}
              className={`sl${tab === t.id ? " act" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <I n={t.icon} s={14} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "8px", borderTop: "1px solid var(--border)" }}>
        <button className="sl" onClick={onLogout}>
          <I n="out" s={14} /> Sair
        </button>
      </div>
    </aside>
  );
};

// ─── ADMIN: DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ posts, user }) => {
  const stats = [
    { label: "Postagens", value: posts.length, icon: "news", color: "#2563EB" },
    { label: "Publicadas", value: posts.filter(p => p.status === "publicado").length, icon: "check", color: "var(--green)" },
    { label: "Rascunhos", value: posts.filter(p => p.status === "rascunho").length, icon: "page", color: "var(--gold)" },
  ];

  return (
    <div className="fi">
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Bem-vindo, {user.name}! 👋</h2>
      <p style={{ color: "var(--text3)", marginBottom: 28 }}>Aqui está um resumo do seu site.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 10, background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I n={s.icon} s={24} c={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>📋 Últimas Postagens</h3>
        <table>
          <thead>
            <tr><th>Título</th><th>Status</th><th>Views</th><th>Data</th></tr>
          </thead>
          <tbody>
            {posts.slice(0, 5).map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.title.slice(0, 30)}</td>
                <td><span className={`tag ${p.status === "publicado" ? "tgr" : "tg"}`}>{p.status}</span></td>
                <td>{p.views}</td>
                <td style={{ fontSize: 11, color: "var(--text3)" }}>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── ADMIN: POSTS ──────────────────────────────────────────────────────────────
const AdminPosts = ({ posts, setPosts, user }) => {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", category: "Institucional", status: "rascunho", featured: false, cover: "" });
  const [editing, setEditing] = useState(null);

  const save = () => {
    if (!form.title || !form.content) return;
    
    if (editing) {
      setPosts(ps => ps.map(p => p.id === editing ? { ...p, ...form } : p));
    } else {
      setPosts(ps => [...ps, {
        ...form,
        id: Date.now(),
        author: user.name,
        date: fmtDate(),
        views: 0,
        likes: 0
      }]);
    }
    
    setForm({ title: "", content: "", category: "Institucional", status: "rascunho", featured: false, cover: "" });
    setModal(false);
    setEditing(null);
  };

  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>Postagens</h2>
        <button className="btn bp sm" onClick={() => { setEditing(null); setForm({ title: "", content: "", category: "Institucional", status: "rascunho", featured: false, cover: "" }); setModal(true); }}>
          <I n="plus" s={13} /> Nova Postagem
        </button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th>Título</th><th>Categoria</th><th>Status</th><th>Views</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.title.slice(0, 30)}</td>
                <td><span className="tag tb">{p.category}</span></td>
                <td><span className={`tag ${p.status === "publicado" ? "tgr" : "tg"}`}>{p.status}</span></td>
                <td>{p.views}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn bo sm" onClick={() => { setEditing(p.id); setForm(p); setModal(true); }}>
                      <I n="edit" s={11} />
                    </button>
                    <button className="btn br sm" onClick={() => setPosts(ps => ps.filter(x => x.id !== p.id))}>
                      <I n="trash" s={11} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="mo">
          <div className="mb">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{editing ? "Editar" : "Nova"} Postagem</h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24 }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label>Título *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label>Categoria</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {["Institucional", "Eventos", "Conquistas", "Comunicados"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="rascunho">Rascunho</option>
                    <option value="publicado">Publicado</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Conteúdo *</label>
                <textarea rows={5} value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
              </div>

              <div>
                <label>URL da Capa</label>
                <input value={form.cover} onChange={e => setForm({...form, cover: e.target.value})} placeholder="https://..." />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", margin: 0 }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} style={{ width: "auto" }} />
                <span style={{ textTransform: "none", color: "var(--text)" }}>⭐ Destaque na Home</span>
              </label>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                <button className="btn bo" onClick={() => setModal(false)}>Cancelar</button>
                <button className="btn bp" onClick={save}><I n="check" s={12} /> Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ADMIN: COMMENTS ──────────────────────────────────────────────────────────
const AdminComments = () => {
  return (
    <div className="fi">
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 20 }}>Comentários</h2>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Nenhum comentário ainda. Quando houver, aparecerão aqui.</p>
      </div>
    </div>
  );
};

// ─── ADMIN: GALLERY ────────────────────────────────────────────────────────────
const AdminGallery = () => {
  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>Galeria</h2>
        <button className="btn bp sm"><I n="plus" s={13} /> Novo Álbum</button>
      </div>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Nenhum álbum ainda. Crie um novo para começar!</p>
      </div>
    </div>
  );
};

// ─── ADMIN: MENU ──────────────────────────────────────────────────────────────
const AdminMenu = () => {
  return (
    <div className="fi">
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 20 }}>Cardápio</h2>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Configure o cardápio semanal aqui.</p>
      </div>
    </div>
  );
};

// ─── ADMIN: CALENDAR ──────────────────────────────────────────────────────────
const AdminCalendar = () => {
  return (
    <div className="fi">
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 20 }}>Calendário</h2>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Gerencie eventos e datas importantes aqui.</p>
      </div>
    </div>
  );
};

// ─── ADMIN: PAGES ─────────────────────────────────────────────────────────────
const AdminPages = () => {
  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>Páginas</h2>
        <button className="btn bp sm"><I n="plus" s={13} /> Nova Página</button>
      </div>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Crie páginas customizadas aqui.</p>
      </div>
    </div>
  );
};

// ─── ADMIN: FEEDBACK ──────────────────────────────────────────────────────────
const AdminFeedback = () => {
  return (
    <div className="fi">
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 20 }}>Feedbacks</h2>
      <div className="card" style={{ padding: 20, textAlign: "center", color: "var(--text3)" }}>
        <p>Gerencie feedbacks dos alunos aqui.</p>
      </div>
    </div>
  );
};

// ─── ADMIN: USERS ─────────────────────────────────────────────────────────────
const AdminUsers = () => {
  return (
    <div className="fi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>Usuários</h2>
        <button className="btn bp sm"><I n="plus" s={13} /> Novo Usuário</button>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr><th>Nome</th><th>Email</th><th>Tipo</th><th>Ações</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Maria Silva</td>
              <td>prof.maria@educacao.ba.gov.br</td>
              <td><span className="tag tpu">Professor</span></td>
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn bo sm"><I n="edit" s={11} /></button>
                  <button className="btn br sm"><I n="trash" s={11} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── ADMIN: IDENTITY ──────────────────────────────────────────────────────────
const AdminIdentity = () => {
  return (
    <div className="fi">
      <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 20 }}>Identidade Visual</h2>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label>Nome da Escola</label>
            <input value="Escola AGJ" disabled />
          </div>
          <div>
            <label>Tagline</label>
            <input value="Educação & Futuro" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
const AdminPanel = ({ user, setPage, posts, setPosts, dark, toggleDark, onLogout }) => {
  const [tab, setTab] = useState("dashboard");

  const tabs = {
    dashboard: <AdminDashboard posts={posts} user={user} />,
    posts: <AdminPosts posts={posts} setPosts={setPosts} user={user} />,
    comments: <AdminComments />,
    gallery: <AdminGallery />,
    menu: <AdminMenu />,
    calendar: <AdminCalendar />,
    pages: <AdminPages />,
    feedback: <AdminFeedback />,
    users: <AdminUsers />,
    identity: <AdminIdentity />,
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar tab={tab} setTab={setTab} user={user} onLogout={onLogout} />
      
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700 }}>Painel de Administração</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={toggleDark} style={{ background: "var(--surface2)", border: "none", borderRadius: 7, padding: "6px 9px", cursor: "pointer" }}>
              <I n={dark ? "sun" : "moon"} s={14} />
            </button>
            <button className="btn bo sm" onClick={() => setPage("home")}><I n="eye" s={12} /> Ver Site</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: 1400 }}>
            {tabs[tab]}
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── HEADER ────────────────────────────────────────────────────────────────────
const Header = ({ user, setPage, dark, toggleDark, onLogout }) => {
  return (
    <header style={{ background: "var(--navy)", color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}>
      <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
        <div style={{ width: 36, height: 36, background: "var(--gold)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I n="sch" s={18} c="var(--navy)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Escola AGJ</div>
          <div style={{ fontSize: 10, color: "var(--gold)", letterSpacing: 1 }}>PORTAL</div>
        </div>
      </button>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={toggleDark} style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: 7, padding: "6px 9px", cursor: "pointer", color: "#fff" }}>
          <I n={dark ? "sun" : "moon"} s={15} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>
              {user.type === "Aluno" && "👤 Aluno"}
              {user.type === "Professor" && "👨‍🏫 Professor"}
              {user.type === "Administrador" && "🔑 Admin"}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{user.name}</div>
          </div>
          <button onClick={onLogout} className="btn bo sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>
            <I n="out" s={12} /> Sair
          </button>
        </div>
      </div>
    </header>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "var(--navy)", color: "rgba(255,255,255,.5)", padding: "20px 24px", textAlign: "center", fontSize: 11 }}>
    © 2026 Escola AGJ · Portal Educacional
  </footer>
);

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(initPosts);
  const [selPost, setSelPost] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  if (!user) {
    return (
      <div className={dark ? "dark-theme" : "light-theme"}>
        <GlobalStyle dark={dark} />
        <Login onLogin={handleLogin} setPage={setPage} />
      </div>
    );
  }

  return (
    <div className={dark ? "dark-theme" : "light-theme"} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalStyle dark={dark} />

      {page !== "admin" && <Header user={user} setPage={setPage} dark={dark} toggleDark={() => setDark(!dark)} onLogout={handleLogout} />}

      <main style={{ flex: 1 }}>
        {page === "home" && <Home posts={posts} user={user} setPage={setPage} setSel={setSelPost} />}
        {page === "post" && selPost && <PostPage post={posts.find(p => p.id === selPost.id) || selPost} posts={posts} user={user} setPage={setPage} setSel={setSelPost} />}
        {page === "admin" && (user.type === "Professor" || user.type === "Administrador") && (
          <AdminPanel user={user} setPage={setPage} posts={posts} setPosts={setPosts} dark={dark} toggleDark={() => setDark(!dark)} onLogout={handleLogout} />
        )}
        {page === "admin" && user.type === "Aluno" && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Acesso Negado 🚫</h2>
            <p style={{ color: "var(--text3)", marginBottom: 20 }}>Apenas professores e administradores podem acessar o painel admin.</p>
            <button className="btn bp" onClick={() => setPage("home")}>← Voltar ao Início</button>
          </div>
        )}
      </main>

      {page !== "admin" && <Footer />}
    </div>
  );
}
