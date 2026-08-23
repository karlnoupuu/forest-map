export default function BlobPanel({timeScrubber } : { timeScrubber : React.ReactNode}) {    
    return (
        <div className = 'panel__shadow'>
            <div className = 'panel__wrapper'>
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="panel-clip" clipPathUnits="userSpaceOnUse">
                            <path d={generateLPath()} />
                        </clipPath>
                    </defs>
                </svg>
                <div className = 'title__wrapper'>
                    <div className = 'title__icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <span className = 'title__span'>
                        Metsaavastaja
                    </span>
                </div>
                <div className = 'panel__timescrubber'>
                    {timeScrubber}
                </div>
            </div>
        </div>
    )
}

const L_CONFIG = {
    top: {
        width: 320,
        height: 64,
    },
    bottom: {
        width: 96,
        height: 384,
    },
    radius: 32,
}

function generateLPath() : string {
  const { top, bottom, radius: r } = L_CONFIG;
  const totalHeight = top.height + bottom.height;

  return `
    M 0,0
    L ${top.width},0
    L ${top.width},${top.height - r}
    Q ${top.width},${top.height} ${top.width - r},${top.height}
    L ${bottom.width + r},${top.height}
    Q ${bottom.width},${top.height} ${bottom.width},${top.height + r}
    L ${bottom.width},${totalHeight - r}
    Q ${bottom.width},${totalHeight} ${bottom.width - r},${totalHeight}
    L 0,${totalHeight}
    Z
  `;
}