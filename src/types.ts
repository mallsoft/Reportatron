export type Report = {
  title: string;
  report: string;
  suggestedActions: string;
};

export type ReportPrompt = {
  firm: string;
  account: string;
  balance: string;
  transactionsInMonth: any[];
};
