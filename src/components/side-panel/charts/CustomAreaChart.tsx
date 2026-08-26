import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Legend, Tooltip } from "recharts";
import type { AreaChartProps } from "./ChartProp";

export default function CustomAreaChart( { data, xKey, areas } : AreaChartProps ){
    if (!data) return null;

    return (
        <AreaChart style = {{ width : '100%', margin : 'auto', aspectRatio : 1.618}} responsive data = {data}>
            <defs>
                {areas.map(area => (
                    <linearGradient id = {area.dataKey} x1 = '0' y1 = '0' x2 = '0' y2 = '1'>
                        <stop offset="0%"   stopColor={area.color} stopOpacity={0.8} />
                        <stop offset="95%"  stopColor={area.color} stopOpacity={0} />
                    </linearGradient>
                ))}
            </defs>
            <CartesianGrid />
            <XAxis dataKey = {xKey} style = {{fontSize : '12px', color    : 'black'}}/>
            <YAxis width = {32} style = {{fontSize : '12px', color    : 'black'}}/>
            {areas.map(area => (
                <Area
                    key = {area.dataKey}
                    dataKey = {area.dataKey}
                    name = {area.label}
            
                    type = 'monotone'
                    stroke = {area.color}
                    fillOpacity = {1}
                    fill = {`url(#${area.dataKey})`}
                    isAnimationActive = {true}
                    animationBegin={0}
                    animationDuration={300}
                />
            ))}
            <Tooltip formatter = {(value) => Number(value).toFixed(2)}/>
            <Legend wrapperStyle = {{fontSize : "14px"}}/>
        </AreaChart>
    )
}