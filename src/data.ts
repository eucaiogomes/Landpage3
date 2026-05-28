import { EmailCase } from './types';

export const mockCases: EmailCase[] = [
  {
    id: 'case-1',
    sender: 'Sindicato dos Metalúrgicos (SINDMET)',
    senderEmail: 'contato@sindmet-regiao.org.br',
    subject: 'Notificação de Paralisação e Demanda de Adicional de Periculosidade',
    receivedAt: 'Hoje, 07:42',
    status: 'critical',
    type: 'email',
    category: 'Acordo Coletivo / Alerta de Greve',
    body: 'Prezados, notificamos formalmente esta empresa sobre a deliberação em assembleia de paralisação nas linhas de montagem a partir do dia 15, em virtude da ausência de resposta à pauta sobre adicional de periculosidade para os operadores de solda automática.',
    aiSummary: 'Tentativa de greve/paralisação agendada para dia 15. Reclamação coletiva sobre adicional de periculosidade para soldadores. Risco imediato de lockout/parada de produção na fábrica.',
    estimatedRisk: 420000,
    suggestedProvision: 150000,
    probabilityOfLoss: 'média',
    generatedDefenseDraft: `Prezado Sindicato (SINDMET),

Confirmamos o recebimento da vossa notificação. Informamos que a Juris8, intermediando o departamento de compliance trabalhista da Empresa, já abriu canal de negociação para o dia 10, às 14h, visando a apresentação do Laudo Técnico de Condições Ambientais do Trabalho (LTCAT) atualizado, o qual demonstra a neutralização completa de riscos por meio dos novos EPIs de alta performance fornecidos. Solicita-se o cancelamento das medidas de paralisação temporária até a conclusão do comitê bipartido.

Atenciosamente,
Departamento Jurídico Corporativo`,
    processed: false,
  },
  {
    id: 'case-2',
    sender: 'Dra. Mariana G. Bastos (Advogada)',
    senderEmail: 'mariana.bastos@mbavocacia.com.br',
    subject: 'Proposta de Acordo Extrajudicial - Ex-colaborador Roberto de Souza',
    receivedAt: 'Hoje, 09:15',
    status: 'urgent',
    type: 'email',
    category: 'Acordo Extrajudicial',
    body: 'Prezados advogados, represento o Sr. Roberto de Souza, ex-supervisor de logística de vossa filial. Antes de ajuizarmos a correspondente ação trabalhista pleiteando horas extras excedentes e equiparação salarial (total estimado R$ 180.000), gostaríamos de formalizar uma proposta de acordo amigável em cota única de R$ 55.000.',
    aiSummary: 'Notificação prévia de litígio trabalhista (Supervisor de Logística). Alegações de horas extras acumuladas e desvio de função (equiparação salarial). Proposta de acordo preliminar de R$ 55k vs risco estimado de R$ 180k.',
    estimatedRisk: 180000,
    suggestedProvision: 55000,
    probabilityOfLoss: 'média',
    generatedDefenseDraft: `Prezada Dra. Mariana Bastos,

Agradecemos o envio do contato prévio visando a composição pacífica. Informamos que o nosso departamento jurídico interno, auxiliado pela análise preditiva Juris8, identificou que, por exercer cargo de confiança (Art. 62, II da CLT) devidamente pactuado em contrato e comprovado pela ficha de registro de funções, a tese de labor extradireto do Sr. Roberto carece de fundamento material amplo.

Entretanto, visando a eficiência financeira e redução do contencioso, esta empresa está disposta a deliberar uma contraproposta de R$ 35.000,00 (trinta e cinco mil reais), com quitação rasa e geral sobre o contrato de trabalho extinto. Ficamos à disposição no telefone (11) 3450-9900 para assinatura.

Atenciosamente,
Coordenação Jurídica de Contencioso`,
    processed: false,
  },
  {
    id: 'case-3',
    sender: 'PJe - Tribunal Regional do Trabalho (TRT 2ª Região)',
    senderEmail: 'sistema-pje@trt2.jus.br',
    subject: 'CITAÇÃO ELETRÔNICA - Processo nº 1001425-44.2026.5.02.0014',
    receivedAt: 'Ontem, 16:30',
    status: 'critical',
    type: 'notification',
    category: 'Citação / Processo Judicial',
    body: 'Fica a empresa citada para apresentar defesa escrita em 20 dias sob pena de revelia e confissão quanto à matéria de fato, nos autos da ação trabalhista movida por Aline Mendes da Silva, que pleiteia indenização por danos morais devido a assédio moral no setor de faturamento.',
    aiSummary: 'Nova ação judicial autuada na 14ª Vara do Trabalho de SP. Autora Aline Mendes da Silva (ex-assistente de faturamento) pede indenização por assédio moral corporativo. Prazo fatal de defesa restando 19 dias.',
    estimatedRisk: 120000,
    suggestedProvision: 40000,
    probabilityOfLoss: 'alta',
    generatedDefenseDraft: `MERÍSSIMO JUÍZO DA 14ª VARA DO TRABALHO DE SÃO PAULO - SP
Processo nº 1001425-44.2026.5.02.0014

EMPRESA S/A, já devidamente qualificada nos autos, vem tempestivamente apresentar CONTESTAÇÃO à Reclamatória Trabalhista ajuizada por ALINE MENDES DA SILVA.

Em que pesem as alegações de assédio moral no setor de faturamento, a reclamada esclarece que mantém rígido canal de denúncias gerido por comissão independente, política de compliance e treinamentos periódicos contra discriminação e assédio. A auditoria interna instaurada não constatou qualquer conduta abusiva por parte da gerência descrita. Ao contrário, a extinção contratual deu-se sob o manto de estrito direito patronal sem punições abusivas. Requer-se a total improcedência dos pedidos formulados, com aplicação subsidiária das multas por litigância de má-fé, se cabíveis.

Nestes termos, pede deferimento.`,
    processed: false,
  },
  {
    id: 'case-4',
    sender: 'Carlos Barbosa (Diretor de Operações)',
    senderEmail: 'carlos.barbosa@empresa.com.br',
    subject: '[DÚVIDA URGENTE] WhatsApp de ex-colaborador cobrando horas de deslocamento',
    receivedAt: 'Ontem, 11:10',
    status: 'urgent',
    type: 'whatsapp',
    category: 'Análise de Risco Interna',
    body: 'Gente, o ex-motorista de entregas Marcos Aurélio está mandando áudios no WhatsApp cobrando as "horas in itinere" da época em que prestava rota para a usina. O valor sob a ótica dele passa de R$ 25.000. Isso ainda vigora após a Reforma Trabalhista? Podem me dar um parecer técnico rápido?',
    aiSummary: 'Motorista de entregas questiona recebimento de horas de deslocamento (in itinere). Dúvida interna sobre aplicabilidade pós-reforma (Mudança de interpretação do Art. 58, §2º da CLT).',
    estimatedRisk: 25000,
    suggestedProvision: 0,
    probabilityOfLoss: 'baixa',
    generatedDefenseDraft: `Prezado Carlos,

Com base na análise jurídica integrada da Juris8 para as regras vigentes: o pleito do colaborador não possui amparo legal atualizado. Desde a Reforma Trabalhista (Lei 13.467/2017), o artigo 58, § 2º da CLT é taxativo ao estipular que o tempo despendido pelo empregado desde a sua residência até a efetiva ocupação do posto de trabalho e para o seu retorno, por qualquer meio de transporte, NÃO é computável na jornada de trabalho, ainda que se trate de local de difícil acesso ou não servido por transporte público.

Sugerimos que instrua a operação a não realizar qualquer pacto informal pelo WhatsApp e responder cordialmente que a quitação rescisória homologada cobriu todas as rubricas vigentes nos estritos limites da lei.

Atenciosamente,
Departamento Jurídico`,
    processed: false,
  },
  {
    id: 'case-5',
    sender: 'Lucas Valente (Controladoria)',
    senderEmail: 'lucas.valente@empresa.com.br',
    subject: 'Fechamento de Provimento - Auditoria Deloitte Trimestral',
    receivedAt: 'Há 2 dias',
    status: 'info',
    type: 'email',
    category: 'Provisão Contábil / Auditoria',
    body: 'Olá jurídico, precisamos fechar as pastas de contingências cíveis e trabalhistas para relatar à Deloitte. Favor enviar os valores totais consolidados dos riscos prováveis e possíveis.',
    aiSummary: 'Fechamento de auditoria contábil periódica. Solicitação dos valores consolidados de provisão contingencial trabalhista. Juris8 possui o cálculo automatizado dos critérios CPC 25 prontos para exportação.',
    estimatedRisk: 745000,
    suggestedProvision: 245000,
    probabilityOfLoss: 'média',
    generatedDefenseDraft: `Prezado Lucas,

Em anexo, disponibilizamos o relatório executivo gerencial da Juris8 para auditoria contábil em formato PDF e planilha .XLSX configurado nos moldes do CPC 25.

Resumo do Período:
- Contingência Máxima (Processos Ativos): R$ 745.000,00
- Provisão Efetiva Sugerida (Perda Provável): R$ 245.000,00
- Perda Possível (Sem necessidade de provisão imediata sob CPC 25): R$ 500.000,00

O relatório já se encontra assinado digitalmente pelo sistema e de acordo com o padrão exigido pelas Big Four.

Ficamos à disposição para esclarecimentos,
Controladoria de Contencioso Juris8`,
    processed: false,
  }
];
