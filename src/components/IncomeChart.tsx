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

const IncomeChart = () => {
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
        text: "Incomes",
      },
    },
  };

  const getLabels = () => {
    const incomes = category.filter((item) => item.type === "income");
    const incomelabels = incomes.map((item) => item.name);
    return incomelabels;
  };

  const mapIncomes = () => {
    const incomelabels = getLabels();

    const incomes = entries.filter((item) => item.type === "income");
    const finalDatan: any = [];

    const labels: any = incomelabels.map((income) => {
      const incomeValue: any = incomes.reduce((acc: any, curr: any) => {
        if (income === curr.name) {
          return (acc += curr.amount);
        } else {
          return acc;
        }
      }, 0);
      finalDatan.push({ id: income, nested: { value: incomeValue } });
    });

    return finalDatan;
  };

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: "Amount",
        data: mapIncomes(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    getLabels();

    mapIncomes();
  }, []);
  return <Bar options={options} data={data} />;
};

export default IncomeChart;
