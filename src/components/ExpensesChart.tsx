import React, { useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { EntriesContext } from "../context/EntriesContext";
import { CategoryContext } from "../context/CategoryContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesChart = () => {
  const { entries, setEntries } = useContext(EntriesContext);
  const { category, setCategory } = useContext(CategoryContext);
  const options = {
    parsing: {
      xAxisKey: "nested.value",
      yAxisKey: "id",
    },
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Expenses",
      },
    },
  };

  const getLabels = () => {
    const expenses = category.filter((item) => item.type === "expense");
    const incomelabels = expenses.map((item) => item.name);
    return incomelabels;
  };

  const mapExpenses = () => {
    const expenselabels = getLabels();

    const expenses = entries.filter((item) => item.type === "expense");
    const finalDatan: any = [];

    const labels: any = expenselabels.map((expense) => {
      const expenseValue: any = expenses.reduce((acc: any, curr: any) => {
        if (expense === curr.name) {
          return (acc += curr.amount);
        } else {
          return acc;
        }
      }, 0);
      finalDatan.push({ id: expense, nested: { value: expenseValue } });
    });

    return finalDatan;
  };

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: "Amount",
        data: mapExpenses(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    getLabels();

    mapExpenses();
  }, []);
  return <Bar options={options} data={data} />;
};

export default ExpensesChart;
