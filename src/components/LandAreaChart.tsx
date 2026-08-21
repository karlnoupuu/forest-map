import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Legend } from "recharts";
import { generateMockData } from "./TimeLineChart";
import type { AreaByYear, YearlyCountyData } from "../types/ForestryData";

const data : Array<{}> = generateMockData(2000, 2026);

const COLORS = {
  stateForest: '#1a4301',   // darkest — deep forest floor
  privateForest: '#4c7a34', // mid — sunlit canopy
  totalForest: '#8db360',   // lightest — spring foliage
};

export default function LandAreaChart( { data } : { data : AreaByYear[] }){
    console.log(data);

    return (
        <AreaChart
            style = {{ width : '100%', maxWidth : '800px', margin : 'auto', aspectRatio : 1.618}}
            responsive
            data = {data}
        >
            <defs>
                <linearGradient id="stateForest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.stateForest} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={COLORS.stateForest} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="privateForest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.privateForest} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={COLORS.privateForest} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="totalForest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.totalForest}stopOpacity={0.8} />
                    <stop offset="95%" stopColor={COLORS.totalForest} stopOpacity={0} />
                </linearGradient>
            </defs>

            <CartesianGrid />
            <XAxis dataKey = "year"
                style = {{
                    fontSize : '12px',
                    color    : 'black'
                }}
            />
            <YAxis width = {32}
                style = {{
                    fontSize : '12px',
                    color    : 'black'
                }}
            />
            <Area
                type = 'monotone'
                dataKey = 'privateForest'
                stroke = {COLORS.privateForest}
                fillOpacity = {1}
                fill = "url(#privateForest)"
                isAnimationActive = {true}
                animationBegin={200}
                animationDuration={1300}
            />
            <Area
                type = 'monotone'
                dataKey = 'stateForest'
                stroke = {COLORS.stateForest}
                fillOpacity = {1}
                fill = "url(#stateForest)"
                isAnimationActive = {true}
            />
            <Area
                type = 'monotone'
                dataKey = 'totalForest'
                stroke = {COLORS.totalForest}
                fillOpacity = {1}
                fill = "url(#totalForest)"
                isAnimationActive = {true}
            />
            <Legend/>
        </AreaChart>
    )
}