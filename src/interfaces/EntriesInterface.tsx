export interface Entries {
    id: Date;
    name: string;
    amount: number | undefined;
    date: string | null;
    type: "income" | "expense";
    description: string;
    icon: string;
  }