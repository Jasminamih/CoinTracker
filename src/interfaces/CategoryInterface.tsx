export interface Category {
    id: number;
    name: string;
    budget: number;
    expected: number;
    icon: string;
    isEnabled: Boolean;
    type: "income" | "expense";
  }
  
  