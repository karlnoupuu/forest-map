import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import type { AreaChartProps } from "./ChartProp";

const SPECIES_LABELS: Record<string, string> = {
    pine        : 'Mänd',
    spruce      : 'Kuusk',
    birch       : 'Kask',
    blk_alder   : 'Sanglepp',
    gry_alder   : 'Hall lepp',
    aspen       : 'Haab',
    ash         : 'Harilik saar',
    oak         : 'Tamm',
    others      : 'Muud',
}

export default function CustomStackedBarChart( { data, xKey, areas } : AreaChartProps ) {
    if (!data) return null;

    return (
        <ResponsiveContainer width = '100%' aspect = {1.618}>
            <BarChart
                data = {data}
                barSize = {32}
            >
                <CartesianGrid strokeDasharray = "5 5"/>
                <XAxis 
                    tickFormatter = {(value : string) => SPECIES_LABELS[value] || value}
                    dataKey={xKey} angle = {-30} fontSize = {12} interval = {0} height = {50} textAnchor="end"
                />
                <YAxis width = {32} fontSize = {12}/>
                <Legend wrapperStyle = {{fontSize : "14px"}}/>
                <Tooltip 
                    labelFormatter = {(label) => SPECIES_LABELS[label as string] || label}
                    formatter = {(value) => Number(value).toFixed(2)}
                />
                {areas.map(area => (
                    <Bar
                        key     =   {area.dataKey}
                        radius  =   {[5, 5, 5, 5]}
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