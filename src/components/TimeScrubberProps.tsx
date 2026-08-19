export interface TimeScrubberProps {
    selectedYear    : number,
    setSelectedYear : ( year : number) => void;
    minYear         : number;
    maxYear         : number;
}