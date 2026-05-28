import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, MessageSquare, Scale, Check, X, Menu, ArrowRight, CornerDownRight, 
  Sparkles, Clock, Database, AlertTriangle, Archive, Play, CheckCircle2, 
  Plus, RefreshCw, Sliders, Shield, Award, Zap, BookOpen, Lock, ShieldCheck, HelpCircle,
  Users, MessageCircle, Landmark, FileText, Inbox
} from 'lucide-react';

// Custom simulated cases for the Interactive Playground
const INITIAL_INCOMING = [
  {
    id: 'msg-1',
    channelName: 'WhatsApp',
    channel: 'whatsapp',
    subtitle: 'Cliente',
    text: '"Bom dia, doutor(a). Tenho uma atualização..."',
    time: '09:01',
    category: 'Cliente urgente',
    tagClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    actionTitle: 'Status enviado ao cliente',
    actionDesc: 'Explicação amigável em linguagem simples sobre a última etapa jurídica.',
  },
  {
    id: 'msg-2',
    channelName: 'E-mail',
    channel: 'email',
    subtitle: 'Novo e-mail recebido',
    text: '"Encaminha petição" para análise.',
    time: '09:01',
    category: 'Análise de Peça',
    tagClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    actionTitle: 'Card criado no CRM',
    actionDesc: '+ Primeira revisão da petição foi gerada para aprovação.',
  },
  {
    id: 'msg-3',
    channelName: 'Publicação',
    channel: 'publicacao',
    subtitle: 'Diário da Justiça',
    text: '"Intimação publicada" no processo 1001234...',
    time: '09:01',
    category: 'Prazo crítico',
    tagClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    actionTitle: 'Advogado notificado',
    actionDesc: '+ Rascunho inicial de manifestação e andamento gerado automaticamente.',
  },
  {
    id: 'msg-4',
    channelName: 'Documento',
    channel: 'documento',
    subtitle: 'Contrato.pdf',
    text: '"Novo documento adicionado ao caso."',
    time: '09:01',
    category: 'Triagem Documental',
    tagClass: 'bg-red-500/10 text-red-400 border-red-500/20',
    actionTitle: 'Documento indexado',
    actionDesc: 'Principais cláusulas e riscos extraídos e salvos no dossiê do processo.',
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoSubmitSuccess, setDemoSubmitSuccess] = useState(false);
  
  // Custom interactive playground state
  const [incomingMsgs, setIncomingMsgs] = useState(INITIAL_INCOMING);
  const [customInput, setCustomInput] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

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

  // Rule-based classification on client-side for playground
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsClassifying(true);

    const inputLower = customInput.toLowerCase();
    let category = 'Triagem Geral';
    let tagClass = 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    let actionTitle = 'Arquivado automaticamente';
    let actionDesc = 'Nenhuma ação imediata necessária para este teor.';
    let channelName = 'Sistema interno';
    let channel = 'sistema';
    let subtitle = 'Protocolo atualizado';

    if (inputLower.includes('prazo') || inputLower.includes('intimação') || inputLower.includes('citação') || inputLower.includes('recurso') || inputLower.includes('audiência') || inputLower.includes('tribunal') || inputLower.includes('urgente')) {
      category = 'Prazo crítico';
      tagClass = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      actionTitle = 'Advogado notificado';
      actionDesc = '+ Rascunho inicial de manifestação e andamento gerado automaticamente.';
      channelName = 'Publicação';
      channel = 'publicacao';
      subtitle = 'Diário da Justiça';
    } else if (inputLower.includes('processo') || inputLower.includes('andamento') || inputLower.includes('como tá') || inputLower.includes('novidade') || inputLower.includes('andou') || inputLower.includes('status')) {
      category = 'Cliente — andamento';
      tagClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      actionTitle = 'Status enviado ao cliente';
      actionDesc = 'Explicação amigável em linguagem simples sobre a última etapa jurídica.';
      channelName = 'WhatsApp';
      channel = 'whatsapp';
      subtitle = 'Cliente';
    } else if (inputLower.includes('gostaria de saber') || inputLower.includes('orçamento') || inputLower.includes('quanto custa') || inputLower.includes('ajuda') || inputLower.includes('honorários') || inputLower.includes('consulta') || inputLower.includes('processar') || inputLower.includes('entrar com')) {
      category = 'Lead novo';
      tagClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      actionTitle = 'Card criado no CRM';
      actionDesc = '+ Envio automático de perguntas de triagem/qualificação.';
      channelName = 'E-mail';
      channel = 'email';
      subtitle = 'Novo lead';
    }

    setTimeout(() => {
      const newMsg = {
        id: `custom-${Date.now()}`,
        channelName,
        channel,
        subtitle,
        text: `"${customInput}"`,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        category,
        tagClass,
        actionTitle,
        actionDesc,
      };

      setIncomingMsgs(prev => [newMsg, ...prev.slice(0, 3)]);
      setCustomInput('');
      setIsClassifying(false);
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 2000);
    }, 1200);
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
            <div className="inline-flex items-center gap-2 bg-juris-500/10 text-juris-300 border border-juris-500/20 rounded-full px-4 py-1 text-xs font-medium tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5 text-juris-400 animate-pulse" />
              <span>IA jurídica dedicada para filtragem inteligente de e-mail e WhatsApp</span>
            </div>
            
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

          {/* CINEMATIC INTERACTIVE DEMO */}
          <div className="relative w-full max-w-6xl mx-auto h-[650px] md:h-[550px] bg-[#07050A] rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_0_100px_-20px_rgba(99,102,241,0.2)] flex flex-col mt-12 text-left">
            
            {/* Ambient Cinematic Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-juris-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none z-0"></div>

            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none z-0"></div>

            {/* Custom Input Bar (Floating at top) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] max-w-2xl z-30 pointer-events-auto">
              <form onSubmit={handleCustomSubmit} className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-juris-500/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                 <div className="relative flex items-center bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                   <input 
                      type="text" 
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Simular entrada (ex: 'Citação processo trabalhista aline')..."
                      className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-slate-200 outline-none placeholder:text-slate-600"
                      disabled={isClassifying}
                   />
                   <button 
                      type="submit"
                      disabled={isClassifying || !customInput.trim()}
                      className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                   >
                      {isClassifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin"/> : <Sparkles className="w-3.5 h-3.5"/>}
                      <span className="hidden sm:inline">{isClassifying ? 'Processando' : 'Simular'}</span>
                   </button>
                 </div>
              </form>
              <AnimatePresence>
                {successAnimation && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute -bottom-8 w-full text-center text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase"
                  >
                    ✓ Fluxo processado e encaminhado
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Flow Area */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 pt-28 md:pt-16 pb-8 z-10 pointer-events-none">
              
              {/* LEFT: INCOMING (Raw messages) */}
              <div className="w-full md:w-[32%] flex flex-col gap-3 relative h-[30%] md:h-auto justify-center">
                 <div className="absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-4 hidden md:block">
                    Inbound // Entrada
                 </div>
                 <div className="flex flex-col gap-3 max-h-[140px] md:max-h-[380px] overflow-hidden justify-start md:justify-center">
                   <AnimatePresence initial={false}>
                      {incomingMsgs.slice(0, 3).map((m) => (
                         <motion.div 
                           key={m.id}
                           initial={{ opacity: 0, x: -30, scale: 0.95 }}
                           animate={{ opacity: 1, x: 0, scale: 1 }}
                           className="bg-gradient-to-b from-white/[0.08] to-[#0B0F19]/80 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl w-full text-left relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                         >
                            <div className="relative flex flex-col gap-1.5">
                              <div className="flex items-start justify-between">
                                 <div className="flex items-center gap-3">
                                     {m.channel === 'whatsapp' && (
                                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                           <MessageCircle className="w-5 h-5" fill="currentColor" />
                                        </div>
                                     )}
                                     {m.channel === 'email' && (
                                        <div className="w-10 h-10 rounded-[10px] bg-white text-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                           <Mail className="w-5 h-5" fill="currentColor" strokeWidth={1} />
                                        </div>
                                     )}
                                     {m.channel === 'publicacao' && (
                                        <div className="w-10 h-10 rounded-[10px] bg-purple-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                           <Landmark className="w-5 h-5" fill="currentColor" />
                                        </div>
                                     )}
                                     {m.channel === 'documento' && (
                                        <div className="w-10 h-10 rounded-[10px] bg-red-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                           <FileText className="w-5 h-5" fill="currentColor" />
                                        </div>
                                     )}
                                     {m.channel === 'sistema' && (
                                        <div className="w-10 h-10 rounded-[10px] bg-indigo-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                           <Inbox className="w-5 h-5" fill="currentColor" />
                                        </div>
                                     )}

                                     <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-slate-100 leading-tight tracking-wide">{m.channelName}</span>
                                        <span className="text-[10px] text-slate-400">{m.subtitle}</span>
                                     </div>
                                 </div>
                                 <span className="text-[9px] font-mono text-slate-500 mt-1 pl-2">{m.time}</span>
                              </div>
                              
                              <p className="text-[10px] sm:text-[11px] text-[#ADA7C7] line-clamp-2 leading-relaxed ml-[52px]">
                                {m.text}
                              </p>
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                 </div>
              </div>

              {/* CENTER: AI CORE */}
              <div className="relative flex flex-col items-center justify-center w-full md:w-[20%] h-32 md:h-full my-4 md:my-0">
                 
                 {/* Desktop Connection Lines */}
                 <div className="hidden md:block absolute left-[-80%] right-[100%] top-1/2 h-px bg-gradient-to-r from-transparent via-juris-500/40 to-juris-500/80 -z-10"></div>
                 <div className="hidden md:block absolute left-[50%] right-[-80%] top-1/2 h-px bg-gradient-to-r from-juris-500/80 via-blue-500/40 to-transparent -z-10"></div>
                 
                 {/* Flowing particles */}
                 <motion.div 
                   animate={{ x: [0, 400] }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="hidden md:block absolute top-1/2 left-[-150%] w-12 h-[2px] bg-gradient-to-r from-transparent to-juris-300 transform -translate-y-1/2 blur-[1px]"
                 />

                 {/* The Core */}
                 <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border border-juris-500/20 md:border-juris-500/30 animate-[spin_4s_linear_infinite]"></div>
                   <div className="absolute inset-2 md:inset-3 rounded-full border border-blue-400/20 md:border-blue-400/30 animate-[spin_3s_linear_infinite_reverse]"></div>
                   <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full absolute transition-all duration-300 ${isClassifying ? 'bg-gradient-to-br from-juris-500 to-blue-600 shadow-[0_0_60px_rgba(100,50,255,0.8)] scale-110' : 'bg-slate-900 shadow-[0_0_20px_rgba(100,50,255,0.3)]'} flex items-center justify-center border border-white/10 z-10 overflow-hidden`}>
                      {isClassifying && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                      <Zap className={`w-6 h-6 md:w-8 md:h-8 ${isClassifying ? 'text-white' : 'text-slate-400'}`} />
                   </div>
                 </div>
                 
                 <div className="mt-2 md:mt-8 font-mono text-[9px] md:text-[10px] text-juris-300 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-80">
                  {isClassifying ? 'Processando' : 'Sistema Ativo'}
                 </div>
              </div>

              {/* RIGHT: OUTGOING (Actions) */}
              <div className="w-full md:w-[32%] flex flex-col gap-3 relative h-[30%] md:h-auto justify-center">
                 <div className="absolute -top-6 right-0 font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-4 hidden md:block text-right">
                    Outbound // Ação
                 </div>
                 <div className="flex flex-col gap-3 max-h-[140px] md:max-h-[380px] overflow-hidden justify-start md:justify-center">
                   <AnimatePresence initial={false}>
                      {incomingMsgs.slice(0, 3).map((m) => (
                         <motion.div 
                           key={`out-${m.id}`}
                           initial={{ opacity: 0, x: 30, scale: 0.95 }}
                           animate={{ opacity: 1, x: 0, scale: 1 }}
                           className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-2xl w-full relative overflow-hidden text-left shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]"
                         >
                            <div className={`absolute top-0 left-0 w-1 h-full ${m.tagClass.split(' ')[0]}`}></div>
                            <div className="pl-2">
                               <div className="flex items-center justify-between mb-2">
                                  <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded border ${m.tagClass}`}>
                                     {m.category}
                                  </span>
                                  <CheckCircle2 className={`w-3.5 h-3.5 ${m.tagClass.split(' ')[1]}`} />
                               </div>
                               <div className="text-[11px] md:text-sm font-bold text-slate-200 mb-1 leading-snug">{m.actionTitle}</div>
                               <p className="text-[9.5px] md:text-[10.5px] text-slate-400 leading-relaxed font-mono tracking-tight">
                                 {m.actionDesc}
                               </p>
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                 </div>
              </div>

            </div>
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
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
              Como a IA pensa
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              Triagem e classificação em tempo real
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cada mensagem recebida pela sua banca jurídica é analisada, catalogada e resolvida em um ciclo de menos de 2 segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 w-full flex flex-col items-center gap-4 relative group hover:border-juris-500/25 transition-all">
                <span className="absolute -top-3 left-4 font-mono text-[10px] uppercase tracking-widest bg-juris-500 text-white font-bold p-1 px-3.5 rounded-full">1</span>
                
                <div className="text-3xl mt-2 select-none">📖</div>
                <h3 className="text-sm font-bold text-slate-200">1 · Lê e Interpreta</h3>
                <p className="text-xs text-[#ADA7C7] leading-relaxed">
                  Avalia remetente, assunto, anexos de processo, histórico processual do cliente e intenção em tempo real.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 w-full flex flex-col items-center gap-4 relative group hover:border-juris-500/25 transition-all">
                <span className="absolute -top-3 left-4 font-mono text-[10px] uppercase tracking-widest bg-juris-500 text-white font-bold p-1 px-3.5 rounded-full">2</span>
                
                <div className="text-3xl mt-2 select-none">🏷</div>
                <h3 className="text-sm font-bold text-slate-200">2 · Classifica de Forma Precisa</h3>
                <p className="text-xs text-[#ADA7C7] leading-relaxed">
                  Cataloga como Lead novo, Cliente urgente, Intimação de Tribunal ou Spam — anexando score de periculosidade.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 w-full flex flex-col items-center gap-4 relative group hover:border-juris-500/25 transition-all">
                <span className="absolute -top-3 left-4 font-mono text-[10px] uppercase tracking-widest bg-juris-500 text-white font-bold p-1 px-3.5 rounded-full">3</span>
                
                <div className="text-3xl mt-2 select-none">⚡</div>
                <h3 className="text-sm font-bold text-slate-200">3 · Age e Responde</h3>
                <p className="text-xs text-[#ADA7C7] leading-relaxed">
                  Minuta peças de defesa, anota prazos na agenda do advogado encarregado e atualiza o CRM automaticamente.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* S3 SECTION: 4 TIPOS DE MENSAGENS E 4 AÇÕES */}
      <section id="fluxos" className="py-16 sm:py-24 border-b border-white/5 bg-slate-950/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
              Tipologia e Ações
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              4 tipos de mensagens, 4 ações automáticas
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              O fluxo de automação é adaptado dinamicamente com base nas características individuais de cada mensagem ou notificação PJe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            
            {/* Box 1 */}
            <div className="bg-slate-900/40 border border-white/5 hover:border-blue-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-3">
                  Lead novo
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Potenciais clientes solicitando cotação de serviços ou honorários contratuais por e-mail ou canais digitais.
                </p>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 text-[11px] text-blue-300 mt-2">
                <div className="font-semibold mb-1">✓ Cria card no CRM</div>
                <p className="text-[10px] opacity-80 leading-snug">Dispara qualificações e perguntas de triagem no mesmo tom do escritório em segundos.</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-900/40 border border-white/5 hover:border-rose-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <span className="inline-block bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-3">
                  Prazo crítico
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Publicações de tribunais, intimações do Diário Oficial ou notificações processuais fatais.
                </p>
              </div>
              <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-[11px] text-rose-300 mt-2">
                <div className="font-semibold mb-1">✓ Notifica advogado</div>
                <p className="text-[10px] opacity-80 leading-snug">Cadastra intimação e cria a primeira versão consolidada da petição/resposta.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-3">
                  Cliente — andamento
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Clientes ativos cobrando novidades, datas de audiências ou andamentos processuais.
                </p>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-[11px] text-emerald-300 mt-2">
                <div className="font-semibold mb-1">✓ Busca status no TRT</div>
                <p className="text-[10px] opacity-80 leading-snug">Varre o diário do tribunal e responde com termos amigáveis sem termos complexos.</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-slate-900/40 border border-white/5 hover:border-slate-500/20 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <span className="inline-block bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider mb-3">
                  Spam / newsletter
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Propagandas de livros jurídicos, newsletters de notícias gerais e mensagens comerciais sem valor operacional.
                </p>
              </div>
              <div className="bg-slate-950 border border-white/5 rounded-xl p-3 text-[11px] text-slate-400 mt-2">
                <div className="font-semibold mb-1 text-slate-300">✓ Arquiva automaticamente</div>
                <p className="text-[10px] opacity-80 leading-snug">Limpa a visualização para manter seu foco apenas no que gera faturamento e prazos.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* S4 SECTION: INTEGRAÇÕES */}
      <section id="integracoes" className="py-16 sm:py-24 border-b border-white/5 relative bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-juris-300 font-bold block mb-4">
              Ecossistema Integrado
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EDEAF7] mb-4">
              Conecta direto com o que você já usa todos os dias
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Setup concluído em menos de 5 minutos. Sem necessidade de desenvolvedor ou códigos complexos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mb-12 select-none">
            
            <div className="bg-slate-900/80 border border-white/5 px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Gmail Workspace</span>
            </div>

            <div className="bg-slate-900/80 border border-white/5 px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Microsoft Outlook</span>
            </div>

            <div className="bg-slate-900/80 border border-white/5 px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Cloud API</span>
            </div>

            <div className="bg-slate-900/80 border border-white/5 px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5">
              <Database className="w-4 h-4 text-juris-300" />
              <span>Yahoo & Apple Mail</span>
            </div>

            <div className="bg-slate-900/80 border border-white/5 px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-purple-400" />
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
              A IA aprende as regras e o estilo da sua banca
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tabela de honorários, preferências de agenda, teses de petição preferidas e o seu tom de voz exato — tudo configurado sob sua curadoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            
            {/* Antes block */}
            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 inline-block mb-4">
                  ❌ Comunicação Genérica Sem IA
                </div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 font-mono text-xs text-rose-300 leading-relaxed">
                  "Prezado(a), informamos que seu processo encontra-se em andamento normal no dia de hoje. Em caso de dúvidas, queira agendar atendimento presencial em nossa recepção regional."
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-normal">
                Texto frio, pouco informativo, que costuma gerar ansiedade no cliente e novas chamadas solicitando explicações técnicas.
              </p>
            </div>

            {/* Depois block */}
            <div className="bg-emerald-500/[0.02] border border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mb-4">
                  ✓ Comunicação Personalizada Com IA
                </div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/20 font-mono text-xs text-[#9FE1CB] leading-relaxed">
                  "Olá, João! Analisei seu processo agora mesmo — houve uma publicação ontem favorável na 3ª Vara sobre as horas extras. O prazo do recálculo é 12/06. Já incluí na pauta do Dr. Ferreira e de toda a nossa controladoria. Qualquer dúvida é só me chamar!"
                </div>
              </div>
              <p className="text-[11px] text-emerald-400/80 mt-4 leading-normal">
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
