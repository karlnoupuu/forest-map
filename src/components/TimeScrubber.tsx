import type { TimeScrubberProps } from "./TimeScrubberProps";
import { useEffect, useRef } from "react";

export default function TimeScrubber({ selectedYear, setSelectedYear, minYear, maxYear } : TimeScrubberProps) {
    const years = [];
    for (let y = minYear; y <= maxYear; y++) {
        years.push(y);
    }

    const selectedRef   = useRef<HTMLSpanElement>(null);
    const isInitial     = useRef(true);

    useEffect(() => {
        requestAnimationFrame(() => {
            selectedRef.current?.scrollIntoView({ 
                behavior    : isInitial.current ? 'instant' : 'smooth', 
                block       : 'center'
            });
            isInitial.current = false;
        });
    }, [selectedYear]);


    const handleYearClick = (e : React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const year = target.dataset.year;

        if (year) {
            setSelectedYear(Number(year));
        }
    }

    const handleScroll = (e : React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            setSelectedYear(Math.min(selectedYear + 1, maxYear));
        } else if (e.deltaY < 0) {
            setSelectedYear(Math.max(selectedYear - 1, minYear));
        }
    }


    return (
        <div className = "scrubber__wrapper" onClick={handleYearClick} onWheel={handleScroll}>
            {years.map(year => (
                <span
                    key={year}
                    data-year = {year}
                    className={year === selectedYear ? 'scrubber__year scrubber__year--selected' : 'scrubber__year'}
                    ref = {year === selectedYear ? selectedRef : null}
                >
                    {year}
                </span>
            ))}
        </div>
    );
}