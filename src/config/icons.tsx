import type { ReactNode } from 'react';

export const ICONS : Record<string, ReactNode> = {
    questionMarkCircle      : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
    ),
    magnifyingGlass         : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    ),
    chartBarSquare          : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
    ),
    adjustmentsHorizontal   : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
    ),
    webappIcon              : (
        <svg viewBox="0 0 57 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.6667 44.6667V52.6667M30 44.6667H52.1333C52.6553 44.6593 53.1636 44.499 53.5952 44.2055C54.0269 43.912 54.3629 43.4983 54.5617 43.0156C54.7604 42.5329 54.8132 42.0025 54.7133 41.4902C54.6135 40.9778 54.3654 40.5061 54 40.1333L46 31.3333H46.8C47.3219 31.326 47.8302 31.1656 48.2619 30.8722C48.6936 30.5787 49.0296 30.1649 49.2284 29.6823C49.4271 29.1996 49.4798 28.6692 49.38 28.1569C49.2801 27.6445 49.0321 27.1727 48.6667 26.8L40.6667 18H41.2C41.7447 18.0491 42.2913 17.9296 42.7657 17.6576C43.2402 17.3857 43.6196 16.9744 43.8524 16.4796C44.0853 15.9847 44.1604 15.4303 44.0675 14.8913C43.9747 14.3524 43.7184 13.855 43.3333 13.4667L32.6667 2L28.9333 6M2 48.5L14.572 35.928M17.6446 37.5355C11.5299 34.0052 9.43489 26.1864 12.9652 20.0716C16.4955 13.9569 24.3144 11.8619 30.4291 15.3922C36.5438 18.9225 38.6388 26.7414 35.1085 32.8561C31.5782 38.9708 23.7593 41.0658 17.6446 37.5355Z" stroke="#8DA101" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
};