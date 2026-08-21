import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis} from 'recharts';

const data: Array<{}> = generateMockData(2000, 2015);

export default function TimeLineChart() {
    return (
        <LineChart
            style = {{
                width: '100%',
                aspectRatio: 1.618,
                maxWidth: 800,
                margin: 'auto'
            }}
            responsive data = {data}
        >
            <CartesianGrid stroke = "black"/>
            <XAxis dataKey = 'year' 
                style = {{
                    fontSize : 12
                }}
            />
            <YAxis width = 'auto'
                style = {{
                    fontSize : 12
                }}
            />
            <Line
                type = 'monotone'
                dataKey = 'forestArea'
                stroke = 'red'
            />
            <Line
                type = 'monotone'
                dataKey = 'totalArea'
                stroke = 'green'
            />
        </LineChart>
    )
}

export function generateMockData(startYear: number, endYear: number) : Array<{ year : number, forestArea : number, totalArea : number}> {
  const data = [];
  for (let year = startYear; year <= endYear; year++) {
    data.push({
      year,
      forestArea: Math.round(20000 + Math.random() * 5000),
      totalArea: Math.round(40000 + Math.random() * 3000),
    });
  }
  return data;
}