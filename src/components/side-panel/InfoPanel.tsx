import { INFO_CONFIG } from "../../config/info"
import type { InfoBlock } from "../../config/info";

export default function InfoPanel({ config } : { config? : InfoBlock[] }) {
    return (
        <section className = 'side-panel__content'>
            <header className = 'side-panel__header'>
                <span className = 'text--normal text--bold'>Info</span>
            </header>
            <div className = 'info-panel__wrapper'>
                <div className = 'info-panel__content' data-testid = "infoPanelContent">
                    {(config ? config : INFO_CONFIG).map((block, i) => {
                        switch (block.type) {
                            case 'heading':
                                return <h2 key = {i} className = 'text--normal text--bold'>{block.content}</h2>;
                            case 'paragraph':
                                return <p key = {i} className = 'text--small'>{block.content}</p>;
                            case 'hyperlink':
                                return <a key = {i} href = {block.link as string} rel = 'noreferrer' target = '_blank' className = 'a__text text--small'>{block.content}</a>;
                            }
                    })}
                </div>
            </div>
        </section>
    )
}