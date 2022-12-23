import { Dayjs } from "dayjs";
import { Category } from "../interfaces/CategoryInterface";

const categories: Category[] = [
  {
    id: 1,
    name: "Freelance",
    budget: 0,
    expected: 0,
    icon: "attach_money",
    isEnabled: true,
    type: "income",
  },
  {
    id: 2,
    name: "Wage",
    budget: 0,
    expected: 0,
    icon: "euro",
    isEnabled: true,
    type: "income",
  },

  {
    id: 3,
    name: "Dividend Income",
    budget: 0,
    expected: 0,
    icon: "paid",
    isEnabled: true,
    type: "income",
  },

  {
    id: 4,
    name: "Food",
    budget: 0,
    expected: 0,
    icon: "restaurant",
    isEnabled: true,
    type: "expense",
  },
  {
    id: 5,
    name: "Travel",
    budget: 0,
    expected: 0,
    icon: "flight",
    isEnabled: true,
    type: "expense",
  },
  {
    id: 6,
    name: "Taxes",
    budget: 0,
    expected: 0,
    icon: "credit_card",
    isEnabled: true,
    type: "expense",
  },

  {
    id: 7,
    name: "Utilities",
    budget: 0,
    expected: 0,
    icon: "power",
    isEnabled: true,
    type: "expense",
  },
  {
    id: 8,
    name: "Shopping",
    budget: 0,
    expected: 0,
    icon: "shopping_cart",
    isEnabled: true,
    type: "expense",
  },
  {
    id: 9,
    name: "Maintenance and repairs",
    budget: 0,
    expected: 0,
    icon: "build",
    isEnabled: true,
    type: "expense",
  },
];

export default categories;
