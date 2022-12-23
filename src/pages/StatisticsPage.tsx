import HeaderPage from "../components/Header";
import Menu from "../components/Menu";
import React, { useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { EntriesContext } from "../context/EntriesContext";
import IncomeChart from "../components/IncomeChart";
import ExpensesChart from "../components/ExpensesChart";
import { Container } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  const { entries, setEntries } = useContext(EntriesContext);
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Expenses & Income",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const getLabels = () => {
    const today = new Date();
    // const startOfMonth = new Date(
    //   `${today.getFullYear()}/${today.getMonth() + 1}/01`
    // );

    const dayToday = today.getDate();
    const daysUntilToday = Array.from(Array(dayToday).keys()).map(
      (item) => item + 1
    );
    const labels = daysUntilToday.map((item) => {
      return new Date(
        `${today.getFullYear()}/${today.getMonth() + 1}/${item}`
      ).toLocaleDateString("en-US");
    });
    return labels;
  };

  const mapExpenses = () => {
    const labels = getLabels();

    const expenses = entries.filter((item) => item.type === "expense");

    const finalData: any = [];

    labels.map((label) => {
      const expense = expenses.reduce(
        (previousValue: any, currentValue: any) => {
          if (
            new Date(currentValue.date).toLocaleDateString() ===
            new Date(label).toLocaleDateString()
          ) {
            return (previousValue += currentValue.amount);
          } else {
            return previousValue;
          }
        },
        0
      );
      finalData.push(expense);
    });

    return finalData;
  };

  const mapIncomes = () => {
    const labels = getLabels();

    const incomes = entries.filter((item) => item.type === "income");

    const finalDatan: any = [];

    labels.forEach((lab) => {
      const income = incomes.reduce((acc: any, curr: any) => {
        if (
          new Date(curr.date).toLocaleDateString() ===
          new Date(lab).toLocaleDateString()
        ) {
          acc += curr.amount;
          return acc;
        } else {
          return acc;
        }
      }, 0);
      finalDatan.push(income);
    });
    return finalDatan;
  };

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: "Incomes",
        data: mapIncomes(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Expenses",
        data: mapExpenses(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  useEffect(() => {
    getLabels();
    mapExpenses();

    mapIncomes();
  }, []);
  return (
    <div>
      <HeaderPage title={"Statistics"} />
      <Container sx={{marginBottom: 10}}>

      <IncomeChart />
      <ExpensesChart />
      <Line className="multi" options={options} data={data} />
</Container>
      <Menu />
    </div>
  );
};

export default StatisticsPage;
