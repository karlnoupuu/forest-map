import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import type { TreeCompositionData } from "../types/TreeCompositionData";

export default function StackedBarChart({ data } : {
    data : TreeCompositionData[];
}) {
    return (
        <ResponsiveContainer width = '100%' aspect = {1.618}>
            <BarChart
                data = {data}
                barSize = {32}
            >
                <CartesianGrid strokeDasharray = "5 5"/>
                <XAxis dataKey="species" angle = {-30} fontSize = {12} interval = {0} height = {45} textAnchor="end"/>
                <YAxis width = {32} fontSize = {12}/>
                <Legend/>
                <Tooltip/>
                <Bar dataKey = 'stateForest' stackId = 'a' fill='#1a4301'/>
                <Bar dataKey = 'privateForest' stackId = 'a' fill = '#4c7a34'/>
            </BarChart>
        </ResponsiveContainer>
    )
}