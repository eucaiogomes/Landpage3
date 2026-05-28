export interface EmailCase {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  receivedAt: string;
  status: 'critical' | 'urgent' | 'info';
  type: 'email' | 'whatsapp' | 'notification';
  category: string;
  body: string;
  aiSummary: string;
  estimatedRisk: number;
  suggestedProvision: number;
  probabilityOfLoss: 'alta' | 'média' | 'baixa';
  generatedDefenseDraft: string;
  processed: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  sub: string;
  source: string;
  iconName: string;
}
