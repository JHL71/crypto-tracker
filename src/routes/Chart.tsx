import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>{
      isLoading 
        ? "Loading chart..." 
        : <ApexChart 
            type="candlestick" 
            series={[
              {
                name: 'Price',
                data: data ? data.map((el) => [el.time_close * 1000, +el.open, +el.high, +el.low, +el.close]) : []
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light"
              },
              chart: {
                type: "candlestick",
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
                width: 2
              },
              fill: {
                type: 'gradient',
                gradient: {
                  stops: [0, 0, 0],
                }
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
                type: "datetime",
                categories: data?.map(el => new Date(el.time_close * 1000).toUTCString()),
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`
                }
              },
              plotOptions: {
                candlestick: {
                  wick: {
                    useFillColor: true,
                  },
                  colors: {
                    upward: "#01B746",
                    downward: "#EE403C",
                  }
                }
              },
            }}
          />
    }</div>
  )
}

export default Chart;