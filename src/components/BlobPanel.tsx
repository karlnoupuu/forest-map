import { Icon } from "./Icon";

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
                <div className = 'title__container'>
                    <div className = 'title__wrapper'>
                        <Icon name = {'webappIcon'} size = {'large'} />
                        <span className = 'title__span'>
                            Metsaavastaja
                        </span>
                    </div>
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