import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts"

interface IHistory {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  console.log(data);
  return (
    <div>{
      isLoading 
        ? "Loading chart..." 
        : <ApexChart 
            type="line" 
            series={[
              {
                name: 'Price',
                data: data ? data.map((el) => Number(el.close)) : []
              },
            ]}
            options={{
              theme: {
                mode: "dark"
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false
                },
                background: "transparent"
              },
              grid: {
                show: false
              },
              stroke: {
                curve: "smooth",
                width: 3
              },
              yaxis: {
                show: false
              },
              xaxis: {
                labels: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                axisBorder: {
                  show: false
                },
                categories: data?.map(el => String(new Date(el.time_close)).slice(0, -9)),
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["blue"],
                  stops: [0, 100],
                }
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`
                }
              }
            }}
          />
    }</div>
  )
}

export default Chart;