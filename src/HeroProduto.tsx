// HeroProduto · Criado por FlowCore Soluções LTDA · flowcoresolucoes.com.br/codigos · licença MIT
// Hero de produto B2B: headline, dupla de CTAs, prova social e o próprio
// produto na tela (janela com mini dashboard), em vez de ilustração genérica.
// Props: tema ("claro" padrão | "escuro"), accent, eyebrow, title, highlight,
// subtitle, primaryCta, secondaryCta, logos.
// Requisitos: React 18+ e Tailwind CSS 3+. Zero dependências.

import { useEffect, useState, type CSSProperties } from "react";

type Tema = "claro" | "escuro";

type Props = {
  /** Tema visual. Padrão "claro". */
  tema?: Tema;
  /** Cor de destaque (qualquer cor CSS). */
  accent?: string;
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  logos?: string[];
};

// Paleta do tema aplicada como CSS vars na raiz (não depende do tailwind.config).
const TEMAS: Record<Tema, Record<string, string>> = {
  claro: {
    "--fc-bg": "#F7F8FB", "--fc-surface": "#FFFFFF", "--fc-surface-2": "#F1F4F9",
    "--fc-border": "#E3E8F0", "--fc-border-strong": "#CBD3E1",
    "--fc-text": "#0B1220", "--fc-muted": "#4B5565", "--fc-subtle": "#8A94A6",
    "--fc-pos": "#059669", "--fc-neg": "#E11D48", "--fc-warn": "#D97706",
    "--fc-shadow": "0 1px 2px rgba(16,24,40,.06), 0 12px 32px -16px rgba(16,24,40,.18)",
    "--fc-grid": "rgba(15,23,42,.06)", "--fc-window": "#FFFFFF",
    "--fc-bar-from": "color-mix(in srgb, var(--accent) 22%, transparent)",
    "--fc-glow": "0.16",
  },
  escuro: {
    "--fc-bg": "#0B0F17", "--fc-surface": "rgba(255,255,255,0.03)", "--fc-surface-2": "rgba(255,255,255,0.06)",
    "--fc-border": "rgba(255,255,255,0.10)", "--fc-border-strong": "rgba(255,255,255,0.25)",
    "--fc-text": "#FFFFFF", "--fc-muted": "rgba(255,255,255,0.60)", "--fc-subtle": "rgba(255,255,255,0.40)",
    "--fc-pos": "#34D399", "--fc-neg": "#FB7185", "--fc-warn": "#FBBF24",
    "--fc-shadow": "0 24px 48px -24px rgba(0,0,0,.6)",
    "--fc-grid": "rgba(255,255,255,.04)", "--fc-window": "rgba(15,21,32,.9)",
    "--fc-bar-from": "rgba(255,255,255,.05)",
    "--fc-glow": "0.2",
  },
};

const KPI_CORES = ["var(--accent)", "#7C3AED", "#10B981"];

const BARS = [38, 52, 44, 61, 58, 72, 66, 81, 77, 92, 88, 97];

export default function HeroProduto({
  tema = "claro",
  accent = "#0057FF",
  eyebrow = "Novo · Painel de operação em tempo real",
  title = "A operação inteira da sua empresa",
  highlight = "em uma tela só",
  subtitle = "Pedidos, financeiro e atendimento conectados. Sua equipe para de caçar planilha e passa a decidir com o número certo, na hora certa.",
  primaryCta = { label: "Agendar demonstração", href: "#contato" },
  secondaryCta = { label: "Ver como funciona", href: "#como-funciona" },
  logos = ["Vértice", "Nortec", "Alumi", "Grupo Sena", "Lumen", "Arvo"],
}: Props) {
  const [mrr, setMrr] = useState(0);
  const escuro = tema === "escuro";

  // Contador do KPI principal: sobe uma vez ao montar.
  useEffect(() => {
    const target = 284_930;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setMrr(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      style={{ ...TEMAS[tema], "--accent": accent } as CSSProperties}
      className="relative isolate overflow-hidden bg-[var(--fc-bg)] px-6 pb-20 pt-20 text-[var(--fc-text)] sm:pt-28 lg:px-8"
    >
      {/* Luz de fundo e grade sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[var(--fc-glow)] blur-[140px]" />
        {!escuro && <div className="absolute right-[-10rem] top-[6rem] h-[24rem] w-[24rem] rounded-full bg-[#7C3AED] opacity-[0.10] blur-[120px]" />}
        {!escuro && <div className="absolute left-[-8rem] top-[14rem] h-[22rem] w-[22rem] rounded-full bg-[#06B6D4] opacity-[0.10] blur-[120px]" />}
        <div className="absolute inset-0 bg-[linear-gradient(var(--fc-grid)_1px,transparent_1px),linear-gradient(90deg,var(--fc-grid)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <a
          href="#novidades"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--fc-border)] bg-[var(--fc-surface)] px-3.5 py-1.5 text-xs text-[var(--fc-muted)] shadow-[var(--fc-shadow)] transition-colors hover:border-[var(--fc-border-strong)] hover:text-[var(--fc-text)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
          {eyebrow}
          <span aria-hidden>→</span>
        </a>

        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          {title}{" "}
          <span
            className={`bg-clip-text text-transparent ${
              escuro ? "bg-gradient-to-r from-white via-[var(--accent)] to-white" : "bg-gradient-to-r from-[var(--accent)] via-[#7C3AED] to-[#EC4899]"
            }`}
          >{highlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--fc-muted)] sm:text-lg">{subtitle}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={primaryCta.href}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_var(--accent)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--fc-border-strong)] bg-[var(--fc-surface)] px-7 text-sm font-semibold text-[var(--fc-text)] transition hover:border-[var(--accent)] hover:bg-[var(--fc-surface-2)] sm:w-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
            </svg>
            {secondaryCta.label}
          </a>
        </div>
      </div>

      {/* Produto na tela */}
      <div className="relative mx-auto mt-16 max-w-5xl">
        <div aria-hidden className="absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-[2rem] bg-[var(--accent)] opacity-[var(--fc-glow)] blur-3xl" />
        <div className="overflow-hidden rounded-2xl border border-[var(--fc-border)] bg-[var(--fc-window)] shadow-[var(--fc-shadow)] backdrop-blur">
          <div className="flex items-center gap-2 border-b border-[var(--fc-border)] px-4 py-3">
            {(escuro ? ["rgba(255,255,255,.15)", "rgba(255,255,255,.15)", "rgba(255,255,255,.15)"] : ["#FF5F57", "#FEBC2E", "#28C840"]).map((c, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            ))}
            <div className="ml-4 hidden h-6 flex-1 items-center rounded-md bg-[var(--fc-surface-2)] px-3 font-mono text-[11px] text-[var(--fc-subtle)] sm:flex">
              app.suaempresa.com.br/operacao
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-[1fr_1fr_1fr]">
            {[
              { label: "Receita recorrente", value: `R$ ${mrr.toLocaleString("pt-BR")}`, delta: "+18,4%" },
              { label: "Pedidos hoje", value: "1.284", delta: "+6,1%" },
              { label: "Tempo médio de resposta", value: "4m 12s", delta: "−32%" },
            ].map((k, i) => (
              <div key={k.label} className="relative overflow-hidden rounded-xl border border-[var(--fc-border)] bg-[var(--fc-surface)] p-4 text-left">
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5" style={{ background: KPI_CORES[i], opacity: escuro ? 0 : 1 }} />
                <p className="flex items-center gap-2 text-xs text-[var(--fc-muted)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: KPI_CORES[i] }} />
                  {k.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{k.value}</p>
                <p className="mt-1 text-xs font-medium text-[var(--fc-pos)]">{k.delta} vs. mês anterior</p>
              </div>
            ))}

            <div className="rounded-xl border border-[var(--fc-border)] bg-[var(--fc-surface)] p-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Receita por mês</p>
                <span className="rounded-md bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2 py-1 text-[11px] font-medium text-[var(--accent)]">12 meses</span>
              </div>
              <div className="mt-5 flex h-36 items-end gap-2" role="img" aria-label="Gráfico de barras: receita crescendo ao longo de 12 meses">
                {BARS.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--fc-bar-from)] to-[var(--accent)] motion-safe:animate-[heroBar_.9s_cubic-bezier(.16,1,.3,1)_both]" style={{ height: `${h}%`, animationDelay: `${i * 45}ms` }} />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--fc-border)] bg-[var(--fc-surface)] p-4 text-left">
              <p className="text-sm font-medium">Atividade</p>
              <ul className="mt-4 space-y-3 text-xs">
                {[
                  ["Pedido #4821 aprovado", "agora"],
                  ["NF-e emitida · Nortec", "2 min"],
                  ["Pix recebido · R$ 3.420", "5 min"],
                  ["Chamado resolvido", "9 min"],
                ].map(([t, a], i) => (
                  <li key={t} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[var(--fc-muted)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: escuro ? "var(--accent)" : ["var(--accent)", "#7C3AED", "#10B981", "#F59E0B"][i] }} />
                      {t}
                    </span>
                    <span className="shrink-0 text-[var(--fc-subtle)]">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Prova social */}
      <div className="mx-auto mt-16 max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--fc-subtle)]">Operações que já rodam com a gente</p>
        <ul className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {logos.map((l) => (
            <li key={l} className="text-sm font-semibold tracking-tight text-[var(--fc-subtle)] transition-colors hover:text-[var(--fc-text)]">
              {l}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 text-center text-[11px] text-[var(--fc-subtle)]">
        <a href="https://flowcoresolucoes.com.br/codigos" target="_blank" rel="noopener" className="transition-colors hover:text-[var(--fc-text)]">
          Criado por FlowCore Soluções LTDA
        </a>
      </p>

      <style>{`@keyframes heroBar{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}`}</style>
    </section>
  );
}
