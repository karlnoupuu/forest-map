import type { TimeScrubberProps } from "./TimeScrubberProps";
import { useEffect, useRef } from "react";

import { TIME_SCRUBBER_RANGE } from "../../config/general";

export default function TimeScrubber({ selectedYear, setSelectedYear } : TimeScrubberProps) {
    const years = [];
    for (let y = TIME_SCRUBBER_RANGE.min; y <= TIME_SCRUBBER_RANGE.max; y++) {
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
            setSelectedYear(Math.min(selectedYear + 1, TIME_SCRUBBER_RANGE.max));
        } else if (e.deltaY < 0) {
            setSelectedYear(Math.max(selectedYear - 1, TIME_SCRUBBER_RANGE.min));
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