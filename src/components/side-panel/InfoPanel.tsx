import { INFO_CONFIG } from "../../config/info"

export default function InfoPanel() {
    return (
        <section className = 'side-panel__content'>
            <header className = 'side-panel__header'>
                <span className = 'text--large text--bold'>Info</span>
            </header>
            <div className = 'info-panel__wrapper'>
                <div className = 'info-panel__content'>
                    {INFO_CONFIG.map(def => (
                        <InfoSection key = {def.key} sectionHeader = {def.header} sectionText = {def.text} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function InfoSection({ sectionHeader, sectionText } : { sectionHeader : string, sectionText : string}) {
    return (
        <section className = 'info__content'>
            <h2 className = 'text--large text--bold'>{sectionHeader}</h2>
            <span className = 'text--small'>{sectionText}</span>
        </section>
    )
}