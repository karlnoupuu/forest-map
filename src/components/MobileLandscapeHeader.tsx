export default function MobileLandscapeHeader({ timeScrubber } : { timeScrubber : React.ReactNode}) {

    return (
        <div className = 'mobile__header'>
            <div className = 'panel__timescrubber'>
                {timeScrubber}
            </div>
        </div>
    )
}