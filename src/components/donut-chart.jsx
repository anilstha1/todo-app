import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({data}) {
  const chartData = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        data: [data.pending, data.done],
        backgroundColor: ["#4CAF50", "#1B5E20"],
        borderColor: ["#4CAF50", "#1B5E20"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="w-full max-w-[210px]">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
