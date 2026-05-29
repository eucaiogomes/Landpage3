import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, MessageSquare, Scale, Check, X, Menu, ArrowRight, CornerDownRight, 
  Sparkles, Clock, Database, AlertTriangle, Archive, Play, CheckCircle2, 
  Plus, RefreshCw, Sliders, Shield, Award, Zap, BookOpen, Lock, ShieldCheck, HelpCircle,
  Users, MessageCircle, Landmark, FileText, Inbox, Bell
} from 'lucide-react';



export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoSubmitSuccess, setDemoSubmitSuccess] = useState(false);
  


  // Form registration
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    company: '',
    volume: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.name) {
      setDemoSubmitSuccess(true);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans select-text select-none md:select-text selection:bg-juris-500 selection:text-white">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-200px] right-[-180px] w-[585px] h-[585px] rounded-full bg-juris-500/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[200px] left-[-180px] w-[450px] h-[450px] rounded-full bg-purple-700/5 blur-[120px] pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-white/5 saturate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center pr-4 hover:opacity-95 transition-opacity">
              <img src="/logo.png" alt="Juris8 Logo" className="h-11 object-contain" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5">
              <a href="#como-funciona" className="text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 py-1.5 px-3 rounded-lg transition-all">Como Funciona</a>
              <a href="#fluxos" className="text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 py-1.5 px-3 rounded-lg transition-all">Filtragem</a>
              <a href="#integracoes" className="text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 py-1.5 px-3 rounded-lg transition-all">Canais Conectados</a>
              <a href="#aprendizado" className="text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 py-1.5 px-3 rounded-lg transition-all">Personalização</a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#demo" className="text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors">Falar com vendas</a>
              <a 
                href="#demo" 
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#EDEAF7] hover:bg-white text-slate-950 transition-all flex items-center gap-1"
              >
                Conectar minha caixa <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 outline-none transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <a 
                  href="#como-funciona" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
                >
                  Como Funciona
                </a>
                <a 
                  href="#fluxos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
                >
                  Filtragem
                </a>
                <a 
                  href="#integracoes" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
                >
                  Canais Conectados
                </a>
                <a 
                  href="#aprendizado" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
                >
                  Personalização
                </a>
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm font-semibold text-slate-400 hover:text-slate-100 py-2">Falar com Vendas</a>
                  <a 
                    href="#demo" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-sm font-semibold py-2.5 rounded-lg bg-gradient-to-r from-juris-600 to-juris-800 text-white"
                  >
                    Conectar minha caixa
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-12">
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#EDEAF7] leading-[1.1] tracking-tight mb-6">
              Sua caixa de entrada do escritório,<br />
              <span className="bg-gradient-to-r from-juris-200 via-juris-400 to-purple-300 bg-clip-text text-transparent">organizada antes de você acordar.</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              A IA de triagem ativa lê, classifica, prioriza e minuta respostas completas para seus e-mails e WhatsApps corporativos. Você ganha de volta dezenas de horas semanais focando apenas no essencial.
            </p>

            <div className="flex flex-wrap justify-center gap-3 items-center">
              <a 
                href="#como-funciona" 
                className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 hover:text-white bg-slate-900 border border-white/5 hover:border-white/15 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-juris-400 fill-juris-400" />
                Como a IA funciona?
              </a>
              <a 
                href="#demo" 
                className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-juris-500 to-juris-700 hover:brightness-110 text-white shadow-xl shadow-juris-500/20 transition-all cursor-pointer"
              >
                Conectar minha caixa — 14 dias grátis
              </a>
            </div>
          </div>

          {/* INTERACTIVE DEMO - IN MACBOOK MOCKUP */}
          <div className="relative w-full max-w-[1000px] mx-auto mt-16 px-4 sm:px-6 md:px-8">
            <img 
              src="/inbox-demo.png" 
              alt="Inbox do escritório ao vivo" 
              className="w-full h-auto rounded-xl sm:rounded-2xl md:rounded-3xl object-contain shadow-2xl ring-1 ring-white/10"
            />
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF TRUST BAR */}
      <section className="py-12 border-b border-white/5 bg-slate-950/60 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-full shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Homologado Lector
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-full shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              HSA Certificado
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-full shadow-md">
              <Users className="w-4 h-4 text-juris-400" />
              +3.400 advogados ativos
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-full shadow-md">
              <Lock className="w-4 h-4 text-juris-400" />
              LGPD compliant corporativo
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-full shadow-md">
              <Award className="w-4 h-4 text-purple-400" />
              Parceiro OAB-SP homologado
            </span>
          </div>
        </div>
      </section>

      {/* S2 SECTION: COMO A IA PENSA (3 ETAPAS) */}
      <section id="como-funciona" className="py-16 sm:py-24 border-b border-white/5 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B5CF6] font-bold block mb-4">
              Como a IA pensa
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              Triagem e classificação em <span className="bg-gradient-to-r from-juris-200 via-juris-400 to-purple-300 bg-clip-text text-transparent">tempo real</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cada mensagem recebida pela sua banca jurídica é analisada, catalogada e resolvida em um ciclo de menos de 2 segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto text-left mt-12">
            
            {/* Step 1 */}
            <div className="flex flex-col text-left">
              <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-7 sm:p-8 w-full flex flex-col relative group transition-all h-full shadow-2xl">
                
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8B5CF6] font-bold mb-6">
                  CAMADA 01
                </span>
                
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-100 mb-3 tracking-tight">Leitura e Inteligência</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                    Avalia remetente, assunto, anexos de processo, histórico processual do cliente e intenção em formato de alta velocidade.
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-6 mt-auto"></div>
                  
                  <ul className="flex flex-col gap-3 font-medium">
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Extração de dados estruturados
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Histórico cruzado com base legal
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Análise semântica de anexos PDF
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Detecção profunda de intenção
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col text-left">
              <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-7 sm:p-8 w-full flex flex-col relative group transition-all h-full shadow-2xl">
                
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8B5CF6] font-bold mb-6">
                  CAMADA 02
                </span>
                
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <FileText className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-100 mb-3 tracking-tight">Classificação Precisa</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                    Cataloga cada interação na hora, identificando imediatamente o tipo demanda, tribunal envolvido e prioridade sistêmica.
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-6 mt-auto"></div>
                  
                  <ul className="flex flex-col gap-3 font-medium">
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Lead novo ou cliente existente
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Identificação de intimação e prazo
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Score de periculosidade atrelado
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Filtro inteligente de Spam
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col text-left">
              <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-7 sm:p-8 w-full flex flex-col relative group transition-all h-full shadow-2xl">
                
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8B5CF6] font-bold mb-6">
                  CAMADA 03
                </span>
                
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <Zap className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-100 mb-3 tracking-tight">Ação e Resposta</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                    A plataforma reage instantaneamente engatilhando automações configuradas ou efetuando os apontamentos necessários.
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-6 mt-auto"></div>
                  
                  <ul className="flex flex-col gap-3 font-medium">
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Minutas de peças e contestações
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Lançamento de prazo automático
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Atualização e fechamento de ticket no CRM
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-slate-400 leading-snug">
                       <span className="text-[#8B5CF6] text-[10px] translate-y-[2px]">→</span>
                       Notificação proativa por WhatsApp
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* S3 SECTION: 4 TIPOS DE MENSAGENS E 4 AÇÕES */}
      <section id="fluxos" className="py-16 sm:py-24 border-b border-white/5 bg-slate-950/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B5CF6] font-bold block mb-4">
              Tipologia e Ações
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              4 tipos de mensagens, <span className="bg-gradient-to-r from-juris-200 via-juris-400 to-purple-300 bg-clip-text text-transparent">4 ações automáticas</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              O fluxo de automação é adaptado dinamicamente com base nas características individuais de cada mensagem ou notificação PJe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            
            {/* Box 1 */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl group">
              <div>
                <span className="inline-block bg-blue-500/10 backdrop-blur-md text-blue-400 border border-blue-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  Lead novo
                </span>
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                  Potenciais clientes solicitando cotação de serviços ou honorários contratuais por e-mail ou canais digitais.
                </p>
              </div>
              <div className="bg-blue-500/5 backdrop-blur-sm border border-blue-500/10 rounded-xl p-4 text-[12px] text-blue-300 mt-2 transition-all group-hover:bg-blue-500/10">
                <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                  ✓ Cria card no CRM
                </div>
                <p className="text-[11px] opacity-80 leading-snug">Dispara qualificações e perguntas de triagem no mesmo tom do escritório em segundos.</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 hover:border-rose-500/30 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl group">
              <div>
                <span className="inline-block bg-rose-500/10 backdrop-blur-md text-rose-400 border border-rose-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                  Prazo crítico
                </span>
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                  Publicações de tribunais, intimações do Diário Oficial ou notificações processuais fatais.
                </p>
              </div>
              <div className="bg-rose-500/5 backdrop-blur-sm border border-rose-500/10 rounded-xl p-4 text-[12px] text-rose-300 mt-2 transition-all group-hover:bg-rose-500/10">
                <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                  ✓ Notifica advogado
                </div>
                <p className="text-[11px] opacity-80 leading-snug">Cadastra intimação e cria a primeira versão consolidada da petição/resposta.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl group">
              <div>
                <span className="inline-block bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Cliente — andamento
                </span>
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                  Clientes ativos cobrando novidades, datas de audiências ou andamentos processuais.
                </p>
              </div>
              <div className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/10 rounded-xl p-4 text-[12px] text-emerald-300 mt-2 transition-all group-hover:bg-emerald-500/10">
                <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                  ✓ Busca status no TRT
                </div>
                <p className="text-[11px] opacity-80 leading-snug">Varre o diário do tribunal e responde com termos amigáveis sem termos complexos.</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 hover:border-slate-500/30 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl group">
              <div>
                <span className="inline-block bg-slate-500/10 backdrop-blur-md text-slate-400 border border-slate-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(148,163,184,0.1)]">
                  Spam / newsletter
                </span>
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6 font-medium">
                  Propagandas de livros jurídicos, newsletters de notícias gerais e mensagens comerciais sem valor operacional.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-4 text-[12px] text-slate-300 mt-2 transition-all group-hover:bg-white/10">
                <div className="font-semibold mb-1.5 flex items-center gap-1.5 text-slate-200">
                  ✓ Arquiva automaticamente
                </div>
                <p className="text-[11px] opacity-80 leading-snug">Limpa a visualização para manter seu foco apenas no que gera faturamento e prazos.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* S4 SECTION: INTEGRAÇÕES */}
      <section id="integracoes" className="py-16 sm:py-24 border-b border-white/5 relative bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8B5CF6] font-bold block mb-4">
              Ecossistema Integrado
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              Conecta direto com o que você já usa <span className="bg-gradient-to-r from-juris-200 via-juris-400 to-purple-300 bg-clip-text text-transparent">todos os dias</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Setup concluído em menos de 5 minutos. Sem necessidade de desenvolvedor ou códigos complexos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mb-12 select-none">
            
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 shadow-2xl px-5 py-4 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-4 transition-all hover:border-white/10 hover:-translate-y-1">
              <img src="/logogmail.png" alt="Gmail" className="w-10 h-10 object-contain drop-shadow-md" />
              <span>Gmail Workspace</span>
            </div>

            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 shadow-2xl px-5 py-4 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-4 transition-all hover:border-white/10 hover:-translate-y-1">
              <img src="/logooutlook.png" alt="Outlook" className="w-10 h-10 object-contain drop-shadow-md" />
              <span>Microsoft Outlook</span>
            </div>

            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 shadow-2xl px-5 py-4 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-4 transition-all hover:border-white/10 hover:-translate-y-1">
              <img src="/logowhatsap.png" alt="WhatsApp" className="w-10 h-10 object-contain drop-shadow-md" />
              <span>WhatsApp Cloud API</span>
            </div>

            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 shadow-2xl px-5 py-4 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-3 transition-all hover:border-white/10 hover:-translate-y-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-400 drop-shadow-md" />
              </div>
              <span>Yahoo & Apple Mail</span>
            </div>

            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 shadow-2xl px-5 py-4 rounded-xl text-sm font-semibold text-slate-300 flex items-center gap-3 transition-all hover:border-white/10 hover:-translate-y-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#8B5CF6] drop-shadow-md" />
              </div>
              <span>Tribunais (TRTs, TJSP, etc)</span>
            </div>

          </div>

          {/* Flow visual details */}
          <div className="max-w-xl mx-auto border border-white/5 bg-slate-950/40 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-3 text-[10.5px] font-mono text-slate-400 flex-wrap">
              <span>Canais e E-mails</span>
              <span className="text-slate-700">→</span>
              <span className="bg-juris-500/10 text-juris-300 border border-juris-500/20 rounded px-2.5 py-1">Processador IA</span>
              <span className="text-slate-700">→</span>
              <span>CRM Jurídico / Notificações</span>
            </div>
          </div>

        </div>
      </section>

      {/* S5 SECTION: PERSONALIZAÇÃO (ANTES X DEPOIS) */}
      <section id="aprendizado" className="py-16 sm:py-24 border-b border-white/5 bg-slate-950/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
              Personalização de Tom
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              A IA aprende as regras e o <span className="bg-gradient-to-r from-juris-200 via-juris-400 to-purple-300 bg-clip-text text-transparent">estilo da sua banca</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tabela de honorários, preferências de agenda, teses de petição preferidas e o seu tom de voz exato — tudo configurado sob sua curadoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            
            {/* Antes block */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 hover:border-rose-500/30 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 inline-block mb-6 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                  ❌ Comunicação Genérica Sem IA
                </div>
                <div className="bg-slate-950/80 p-5 rounded-xl border border-white/5 font-mono text-xs text-rose-300 leading-relaxed">
                  "Prezado(a), informamos que seu processo encontra-se em andamento normal no dia de hoje. Em caso de dúvidas, queira agendar atendimento presencial em nossa recepção regional."
                </div>
              </div>
              <p className="text-[12px] text-slate-400 mt-6 leading-normal">
                Texto frio, pouco informativo, que costuma gerar ansiedade no cliente e novas chamadas solicitando explicações técnicas.
              </p>
            </div>

            {/* Depois block */}
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/40 rounded-[1.5rem] p-6 flex flex-col justify-between transition-all shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none rounded-[1.5rem]" />
              <div className="relative">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  ✓ Comunicação Personalizada Com IA
                </div>
                <div className="bg-slate-950/80 p-5 rounded-xl border border-emerald-500/20 font-mono text-xs text-[#9FE1CB] leading-relaxed relative z-10 shadow-lg">
                  "Olá, João! Analisei seu processo agora mesmo — houve uma publicação ontem favorável na 3ª Vara sobre as horas extras. O prazo do recálculo é 12/06. Já incluí na pauta do Dr. Ferreira e de toda a nossa controladoria. Qualquer dúvida é só me chamar!"
                </div>
              </div>
              <p className="text-[12px] text-emerald-400/90 mt-6 leading-normal relative z-10">
                Comunicação com alta empatia, dados de andamento precisos do tribunal e contextualização clara sobre quem é o advogado encarregado.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* S6 SECTION: SEGURANÇA SEÇÃO ADICIONAL */}
      <section className="py-16 sm:py-24 border-b border-white/5 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
              Segurança profissional
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              Seus e-mails e andamentos processuais nunca saem do seu controle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed border-b border-white/5 pb-6">
              Privacidade estrita alinhada aos preceitos éticos da OAB de sigilo das comunicações profissionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-xs mb-1">Criptografia em Repouso</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">Sua caixa de entrada, tokens de acesso Oauth e dados de andamento protegidos sob chave isolada por cliente.</p>
            </div>
            <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-xs mb-1">Mapeamento de Acesso</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">Audite exatamente qual decisão a IA tomou por meio do log consolidado de auditoria de cada e-mail triado.</p>
            </div>
            <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-xs mb-1">Exclusão Contratual</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">Seus dados são apagados definitivamente no momento do cancelamento da assinatura anual ou mensal.</p>
            </div>
          </div>

        </div>
      </section>


      {/* LEAD CAPTURE / RESERVA DE DEMO */}
      <section id="demo" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950/60 to-slate-950/90 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left description column */}
            <div className="lg:col-span-6 flex flex-col text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
                Inbox Corporativa
              </span>
              <h2 className="text-2.5xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
                Veja o Juris8 em pleno funcionamento
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8 pr-4">
                Solicite uma apresentação privada. Em até 24 horas um especialista da Juris8 entrará em contato para agendar uma transmissão detalhada configurada sob as necessidades da sua banca de advocacia.
              </p>

              <div className="space-y-4 mb-8 text-[11px] text-[#ADA7C7]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Reunião dedicada com engenheiro de soluções e especialista de vendas.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Garantia de assinatura de NDA de sigilo executivo antes da conversa se solicitado.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Envio de proposta jurídica e comercial formalizada em até 48 horas pós-reunião.</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 block mb-2">PÚBLICO-ALVO</span>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Para advogados, fundadores de bancas trabalhistas, defensores e gerentes jurídicos internos lidando com mais de 30 processos/mês procurando aumentar a margem de faturamento.
                </p>
              </div>
            </div>

            {/* Right form card */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto">
              <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="h-1 bg-gradient-to-r from-juris-500 to-juris-700"></div>
                <div className="p-6 sm:p-8 text-left">
                  
                  <h3 className="text-md sm:text-base font-bold text-slate-100 mb-1.5">Conectar minha Caixa de Entrada</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Preencha com seus dados abaixo para início imediato da sua avaliação gratuita de 14 dias.</p>
                  
                  {demoSubmitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-center rounded-xl my-4 text-emerald-400"
                    >
                      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-3 animate-bounce" />
                      <h4 className="font-bold text-slate-100 text-sm mb-1">Inscrição Efetuada com Sucesso!</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">Enviamos instruções de ativação seguras diretamente para seu e-mail: <strong className="text-slate-100">{form.email}</strong>.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] uppercase text-[#9C95BD] tracking-wider" htmlFor="f-name">Nome completo</label>
                          <input 
                            type="text" 
                            id="f-name" 
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="João Silva" 
                            required 
                            className="bg-slate-950 border border-white/5 hover:border-white/15 focus:border-juris-600 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] uppercase text-[#9C95BD] tracking-wider" htmlFor="f-role">Cargo no Escritório</label>
                          <input 
                            type="text" 
                            id="f-role" 
                            name="role"
                            value={form.role}
                            onChange={handleInputChange}
                            placeholder="Sócio / Advogado" 
                            required 
                            className="bg-slate-950 border border-white/5 hover:border-white/15 focus:border-juris-600 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] uppercase text-[#9C95BD] tracking-wider" htmlFor="f-email">E-mail corporativo</label>
                        <input 
                          type="email" 
                          id="f-email" 
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="joao@bancasocio.com.br" 
                          required 
                          className="bg-slate-950 border border-white/5 hover:border-white/15 focus:border-juris-600 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] uppercase text-[#9C95BD] tracking-wider" htmlFor="f-company">Nome da banca / empresa</label>
                        <input 
                          type="text" 
                          id="f-company" 
                          name="company"
                          value={form.company}
                          onChange={handleInputChange}
                          placeholder="Silva & Associados" 
                          required 
                          className="bg-slate-950 border border-white/5 hover:border-white/15 focus:border-juris-600 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[9px] uppercase text-[#9C95BD] tracking-wider" htmlFor="f-volume">Volume médio mensal de e-mails/processos</label>
                        <select 
                          id="f-volume" 
                          name="volume"
                          value={form.volume}
                          onChange={handleInputChange}
                          required 
                          className="bg-slate-950 border border-white/5 hover:border-white/15 focus:border-juris-600 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 outline-none transition-all"
                        >
                          <option value="" disabled>Selecione um volume aproximado</option>
                          <option value="10-50">Menos de 100 mensagens/dia</option>
                          <option value="50-150">100 a 500 mensagens/dia</option>
                          <option value="150-500">Mais de 500 mensagens/dia</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-juris-500 to-juris-700 hover:brightness-110 text-white shadow-xl shadow-juris-950/40 text-xs sm:text-sm tracking-wide transition-all cursor-pointer mt-2"
                      >
                        Começar meu teste gratuito →
                      </button>

                      <div className="text-[10px] font-mono text-slate-500 text-center leading-relaxed">
                        14 dias sem taxas · Sem cartão de crédito · Dados sob guarda da LGPD brasileira
                      </div>

                    </form>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Juris8 Logo" className="h-7 object-contain opacity-80" />
              <span className="font-mono">LGPD · Política de segurança & privacidade · Termos · © 2026</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Voltar ao Topo</a>
              <span className="text-slate-700">|</span>
              <a href="#como-funciona" className="hover:text-slate-300 transition-colors">Como Funciona</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
