import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import type { AreaChartProps } from "./ChartProp";

export default function CustomStackedBarChart( { data, xKey, areas } : AreaChartProps ) {
    if (!data) return null;

    return (
        <ResponsiveContainer width = '100%' aspect = {1.618}>
            <BarChart
                data = {data}
                barSize = {32}
            >
                <CartesianGrid strokeDasharray = "5 5"/>
                <XAxis dataKey={xKey} angle = {-30} fontSize = {12} interval = {0} height = {45} textAnchor="end"/>
                <YAxis width = {32} fontSize = {12}/>
                <Legend/>
                <Tooltip formatter = {(value) => Number(value).toFixed(2)}/>
                {areas.map(area => (
                    <Bar
                        key     =   {area.dataKey}
                        dataKey =   {area.dataKey}
                        name    =   {area.label}
                        stackId =   {'a'}
                        fill    =   {area.color}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    )
}