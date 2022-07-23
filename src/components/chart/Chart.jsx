import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, country }) => {
  const [dailyData, setdailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const initDailyData = await fetchDailyData();
      setdailyData(initDailyData);
    };

    // console.log(dailyData);
    fetchApi();
  }, []);

  const lineChart = dailyData.length ? (
    // console.log(dailyData.map((data) => data.deaths)),
    <Line
      className={styles.line}
      data={{
        labels: dailyData.map((data) => data.date),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            // borderColor: "3333ff",
            // backgroundColor: "rgba(0, 0, 255, 0.5)",
            fill: true,
            backgroundColor: "#AD35BA",
            borderColor: ["#AD35BA"],
            borderWidth: 0,
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(173, 53, 186, 0.1)",
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Recovered"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legent: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
