import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Legend, Tooltip } from "recharts";
import type { AreaChartProps } from "./ChartProp";


const COLORS = {
  stateForest: '#1a4301',   // darkest — deep forest floor
  privateForest: '#4c7a34', // mid — sunlit canopy
  totalForest: '#8db360',   // lightest — spring foliage
};

export default function CustomAreaChart( { data, xKey, areas } : AreaChartProps ){
    if (!data) return null;

    return (
        <AreaChart style = {{ width : '100%', maxWidth : '800px', margin : 'auto', aspectRatio : 1.618}} responsive data = {data}>
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
            <XAxis dataKey = {xKey} style = {{fontSize : '12px', color    : 'black'}}/>
            <YAxis width = {32} style = {{fontSize : '12px', color    : 'black'}}/>
            {areas.map(area => (
                <Area
                    key = {area.dataKey}
                    dataKey = {area.dataKey}
            
                    type = 'monotone'
                    stroke = {COLORS.privateForest}
                    fillOpacity = {1}
                    fill = "url(#privateForest)"
                    isAnimationActive = {true}
                    animationBegin={0}
                    animationDuration={300}
                />
            ))}
            <Tooltip/>
            <Legend/>
        </AreaChart>
    )
}