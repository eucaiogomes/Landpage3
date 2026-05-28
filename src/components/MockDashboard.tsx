import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, MessageSquare, AlertTriangle, Scale, Check, Copy, 
  Send, Sliders, ChevronRight, Ban, Award, RefreshCw, BarChart2,
  FileText, ShieldCheck, Database, Search, ArrowRight, CornerDownRight, CheckCircle2
} from 'lucide-react';
import { mockCases as initialCases } from '../data';
import { EmailCase } from '../types';

export default function MockDashboard() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'provisions' | 'docs'>('inbox');
  const [cases, setCases] = useState<EmailCase[]>(initialCases);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bulkStatus, setBulkStatus] = useState<string | null>(null);

  // Active case
  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleProcessCase = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, processed: true } : c));
    setBulkStatus("Caso processado e atualizado na provisão CPC 25 com sucesso!");
    setTimeout(() => setBulkStatus(null), 3500);
  };

  const handleUpdateRisk = (id: string, probability: 'alta' | 'média' | 'baixa', risk: number, prov: number) => {
    setCases(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          probabilityOfLoss: probability,
          estimatedRisk: risk,
          suggestedProvision: prov
        };
      }
      return c;
    }));
  };

  const handleReset = () => {
    setCases(initialCases);
    setBulkStatus("Mock restaurado para o estado inicial.");
    setTimeout(() => setBulkStatus(null), 2000);
  };

  // Derivative metrics
  const totalRisk = cases.reduce((sum, c) => sum + c.estimatedRisk, 0);
  const totalProvision = cases.reduce((sum, c) => sum + (c.probabilityOfLoss === 'baixa' ? 0 : c.suggestedProvision), 0);
  const processedCount = cases.filter(c => c.processed).length;
  const criticalCount = cases.filter(c => c.status === 'critical' && !c.processed).length;

  const filteredCases = cases.filter(c => 
    c.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col h-[520px] text-xs font-sans">
      
      {/* DB TOPBAR */}
      <div className="bg-slate-900/90 py-3 px-4 border-b border-white/5 flex items-center justify-between gap-4 flex-shrink-0 z-10">
        <div className="flex items-center gap-2">
          {/* Status Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Juris8 Core : Ativo</span>
          <span className="text-slate-600">|</span>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-white/5 text-[10px] text-slate-300 font-mono">
            <span>Caixa:</span>
            <span className="text-juris-300 font-bold">{cases.length - processedCount} pendentes</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-950/60 p-0.5 rounded-lg border border-white/5">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'inbox' ? 'bg-juris-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Caixa Jurídica
          </button>
          <button 
            onClick={() => setActiveTab('provisions')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'provisions' ? 'bg-juris-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Provisão CPC 25
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'docs' ? 'bg-juris-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Peças Prontas
          </button>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset} 
            title="Restaurar dados demo"
            className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-white/5 cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {bulkStatus && (
        <div className="bg-juris-950 border-b border-juris-500/30 text-juris-200 px-4 py-1.5 text-center text-[11px] font-mono animate-pulse">
          ⚡ {bulkStatus}
        </div>
      )}

      {/* CORE DISPLAY LAYOUT */}
      <div className="flex-1 flex overflow-hidden min-h-0 bg-slate-950/80">
        
        {/* TAB 1: CAIXA JURÍDICA */}
        {activeTab === 'inbox' && (
          <>
            {/* List sidebar */}
            <div className="w-full sm:w-1/3 border-r border-white/5 flex flex-col min-w-0 bg-slate-900/20">
              {/* Search filter */}
              <div className="p-2 border-b border-white/5 bg-slate-900/40 relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-4 top-4" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar remetentes ou teses..."
                  className="w-full bg-slate-950 border border-white/5 rounded-md py-1.5 pl-8 pr-3 text-[11px] text-slate-200 placeholder-slate-600 hover:border-white/10 focus:border-juris-600 outline-none transition-colors"
                />
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                {filteredCases.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 font-mono">Nenhum caso encontrado</div>
                ) : (
                  filteredCases.map((c) => {
                    const isSelected = c.id === selectedCaseId;
                    const statusColors = {
                      critical: 'border-rose-500 text-rose-400 bg-rose-500/10',
                      urgent: 'border-amber-500 text-amber-400 bg-amber-500/10',
                      info: 'border-sky-500 text-sky-400 bg-sky-500/10'
                    };

                    const typeIcons = {
                      email: <Mail className="w-3 h-3 text-slate-400" />,
                      whatsapp: <MessageSquare className="w-3 h-3 text-emerald-400" />,
                      notification: <Scale className="w-3 h-3 text-purple-400" />
                    };

                    return (
                      <div 
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`p-3 cursor-pointer text-left transition-all relative ${
                          isSelected ? 'bg-juris-950/60 border-l-4 border-l-juris-500' : 'hover:bg-slate-900/40'
                        } ${c.processed ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-slate-200 truncate pr-2 max-w-[140px] block">
                            {c.sender}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 shrink-0">
                            {c.receivedAt}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium truncate mb-1.5">
                          {c.subject}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {typeIcons[c.type]}
                          <span className="text-[9px] font-mono text-slate-500 bg-slate-900 border border-white/5 px-1.5 py-0.2 rounded">
                            {c.category}
                          </span>
                          <span className={`text-[9px] font-mono border px-1.5 py-0.2 rounded uppercase ${statusColors[c.status]}`}>
                            {c.processed ? 'Arquivado' : c.status === 'critical' ? 'Crítico' : c.status === 'urgent' ? 'Urgente' : 'Info'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Split right detail panel */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-950/40 overflow-y-auto">
              {activeCase ? (
                <div className="p-4 sm:p-5 flex flex-col gap-4 text-left">
                  
                  {/* Sender & Subject Header */}
                  <div className="border-b border-white/5 pb-3">
                    <div className="text-[10px] font-mono text-juris-400 uppercase tracking-widest mb-1">Caso em Análise</div>
                    <h3 className="text-sm font-bold text-slate-100 mb-2 leading-relaxed">{activeCase.subject}</h3>
                    <div className="flex items-center justify-between text-slate-400 text-[10px] gap-2">
                      <div>
                        De: <span className="font-semibold text-slate-300">{activeCase.sender}</span> ({activeCase.senderEmail})
                      </div>
                      <div className="font-mono text-slate-500">
                        Recebido em: {activeCase.receivedAt}
                      </div>
                    </div>
                  </div>

                  {/* original content */}
                  <div className="bg-slate-900/30 border border-white/5 rounded-lg p-3">
                    <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase">Texto Original Recebido:</div>
                    <p className="text-slate-300 leading-relaxed text-[11px] italic">
                      "{activeCase.body}"
                    </p>
                  </div>

                  {/* AI Triage & metrics panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Summary Card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-juris-950/40 to-slate-900/80 border border-juris-500/20 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-juris-300 font-bold uppercase tracking-wide">
                          <Check className="w-3.5 h-3.5 text-juris-400" />
                          Triagem Inteligente Juris8
                        </div>
                        <p className="text-slate-200 leading-relaxed text-[11px] font-medium">
                          {activeCase.aiSummary}
                        </p>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                        <span className="text-[10px] font-mono text-slate-500">Tese Principal:</span>
                        <span className="text-slate-300 text-[10px] font-bold bg-slate-900 border border-white/10 px-2 py-0.5 rounded">
                          {activeCase.category}
                        </span>
                      </div>
                    </div>

                    {/* Provisão Suggestion Card */}
                    <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1.5">Avaliação de Risco</div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Risco Estimado Max:</span>
                            <span className="font-bold text-slate-200">
                              {activeCase.estimatedRisk > 0 ? `R$ ${activeCase.estimatedRisk.toLocaleString('pt-BR')}` : 'Isento'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">Provisão Sugerida:</span>
                            <span className={`font-bold ${activeCase.probabilityOfLoss === 'alta' ? 'text-rose-400' : 'text-amber-400'}`}>
                              {activeCase.suggestedProvision > 0 ? `R$ ${activeCase.suggestedProvision.toLocaleString('pt-BR')}` : 'Sem provisão'}
                            </span>
                          </div>

                          <div className="flex justify-between text-[11px] items-center mt-1">
                            <span className="text-slate-400">Probab. Perda:</span>
                            <select 
                              value={activeCase.probabilityOfLoss}
                              onChange={(e) => handleUpdateRisk(
                                activeCase.id, 
                                e.target.value as 'alta' | 'média' | 'baixa',
                                activeCase.estimatedRisk,
                                activeCase.suggestedProvision
                              )}
                              className="bg-slate-950 text-slate-300 border border-white/10 rounded px-1.5 py-0.2 uppercase text-[9px] font-mono focus:border-juris-500 outline-none"
                            >
                              <option value="alta">Alta</option>
                              <option value="média">Média</option>
                              <option value="baixa">Baixa</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-white/5 pt-2 flex items-center gap-1">
                        <span className="text-[9px] text-slate-500 font-mono">Status Provisão:</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                          activeCase.probabilityOfLoss === 'alta' ? 'bg-rose-500/10 text-rose-400' : 
                          activeCase.probabilityOfLoss === 'média' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {activeCase.probabilityOfLoss === 'alta' ? 'Provável (100%)' : activeCase.probabilityOfLoss === 'média' ? 'Possível' : 'Remota (0%)'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* AI Suggested Response/Defense */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-xl overflow-hidden">
                    <div className="bg-slate-900/80 px-3 py-2 border-b border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-juris-300 tracking-wider">Peça / Minuta de Defesa Sugerida (IA)</span>
                      
                      <button 
                        onClick={() => handleCopy(activeCase.generatedDefenseDraft, activeCase.id)}
                        className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-white/5 transition-colors"
                      >
                        {copiedId === activeCase.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-emerald-400 font-bold">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copiar Peça</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950/60 font-mono text-[10.5px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[140px] overflow-y-auto">
                      {activeCase.generatedDefenseDraft}
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[11px] text-slate-500">
                      As defesas Juris8 integram-se diretamente ao PJe e ERPs homologados no MSA.
                    </span>

                    <div className="flex items-center gap-2">
                      {!activeCase.processed ? (
                        <button 
                          onClick={() => handleProcessCase(activeCase.id)}
                          className="px-4 py-2 rounded-lg font-medium tracking-wide bg-gradient-to-r from-juris-500 to-juris-700 hover:from-juris-400 hover:to-juris-600 text-white cursor-pointer transition-all flex items-center gap-1.5 shadow-lg shadow-juris-950/50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Aprovar & Enviar Defesa
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono py-2 px-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" />
                          Processo integrado e arquivado
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">Selecione um caso na lista lateral.</div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: PROVISÕES CONTÁBEIS */}
        {activeTab === 'provisions' && (
          <div className="flex-1 p-5 overflow-y-auto text-left gap-5 flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Relatório de Provisões Corporativas (CPC 25)</h3>
                <p className="text-slate-400 text-[11px] mt-0.5">Visão consolidada do balanço contingencial segundo diretrizes de perda contábil.</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-right font-mono text-[10.5px]">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400">Provisão Efetiva</span>
                R$ {totalProvision.toLocaleString('pt-BR')}
              </div>
            </div>

            {/* Dashboard metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                <div className="text-[10px] uppercase font-mono text-slate-500">Total Contingente</div>
                <div className="text-lg font-bold text-slate-100 mt-1">R$ {totalRisk.toLocaleString('pt-BR')}</div>
                <div className="text-[9px] text-slate-500 mt-1 font-mono">100% da exposição jurídica</div>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                <div className="text-[10px] uppercase font-mono text-slate-500">Decisão Recomendada</div>
                <div className="text-lg font-bold text-juris-400 mt-1">R$ {totalProvision.toLocaleString('pt-BR')}</div>
                <div className="text-[9px] text-slate-500 mt-1 font-mono">Perdas prováveis e possíveis</div>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                <div className="text-[10px] uppercase font-mono text-slate-500">Casos no Sistema</div>
                <div className="text-lg font-bold text-slate-100 mt-1">{cases.length}</div>
                <div className="text-[9px] text-slate-500 mt-1 font-mono">Contencioso ativo monitorado</div>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                <div className="text-[10px] uppercase font-mono text-slate-500">Drafts Gerados</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{processedCount}</div>
                <div className="text-[9px] text-slate-500 mt-1 font-mono">{cases.length - processedCount} pendentes de aprovação</div>
              </div>
            </div>

            {/* Simulated graph elements */}
            <div className="border border-white/5 rounded-xl p-4 bg-slate-900/20 flex flex-col gap-3">
              <h4 className="text-[11px] uppercase font-mono text-slate-400 tracking-wider">Breakdown por Categoria de Pedido</h4>
              <div className="space-y-3">
                {cases.map((c) => {
                  const percent = Math.max(15, (c.estimatedRisk / totalRisk) * 100);
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-300">{c.sender} — <span className="text-slate-400">({c.category})</span></span>
                        <span className="text-slate-200">R$ {c.estimatedRisk.toLocaleString('pt-BR')} <span className="text-slate-500">({percent.toFixed(0)}%)</span></span>
                      </div>
                      <div className="h-2 bg-slate-950 border border-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-juris-700 to-juris-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note text */}
            <p className="text-slate-500 text-[11px] leading-relaxed">
              * O cálculo de provisão sugerida obedece às premissas do padrão contábil CPC 25. Processos classificados com risco "Baixo" não ensejam provisionamento material nas notas explicativas financeiras.
            </p>
          </div>
        )}

        {/* TAB 3: DOCUMENTOS CONCLUÍDOS */}
        {activeTab === 'docs' && (
          <div className="flex-1 p-5 overflow-y-auto text-left gap-4 flex flex-col">
            <div className="border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-slate-200">Arquivo de Respostas & Defesas</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Lista de peças processadas e integradas pela IA do Juris8 ao ERP jurídico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cases.map((c) => (
                <div key={c.id} className="bg-slate-900/50 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <span className="font-semibold text-slate-200 truncate">{c.sender}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${c.processed ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>
                        {c.processed ? 'Sincronizado' : 'Rascunho'}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono leading-tight mb-2 truncate">
                      {c.subject}
                    </div>

                    <div className="bg-slate-950 p-2 font-mono text-[9.5px] text-slate-400 line-clamp-3 rounded mb-3 border border-white/5">
                      {c.generatedDefenseDraft}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="text-[9px] text-slate-500 font-mono">Tese: {c.category}</span>
                    <button 
                      onClick={() => handleCopy(c.generatedDefenseDraft, c.id)}
                      className="text-[10px] text-juris-300 hover:text-juris-200 hover:underline flex items-center gap-1 cursor-pointer bg-slate-950 px-2 py-0.5 rounded border border-white/5"
                    >
                      {copiedId === c.id ? "Copiado!" : "Copiar Defesa"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
