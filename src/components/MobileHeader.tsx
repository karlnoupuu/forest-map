import { Icon } from "./common/Icon"

export default function MobileHeader({ timeScrubber } : { timeScrubber : React.ReactNode}) {

    return (
        <div className = 'mobile__header'>
            <div className = 'title__wrapper'>
                <Icon name = {'webappIcon'} size = {'medium'} />
                <span className = 'title__span text--large text--bold'>
                    Metsaavastaja
                </span>
            </div>
            <div className = 'panel__timescrubber'>
                {timeScrubber}
            </div>
        </div>
    )
}