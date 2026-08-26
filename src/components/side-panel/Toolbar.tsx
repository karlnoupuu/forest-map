import { TOOLS_CONFIG } from "../../config/toolbar";
import { Icon } from "../common/Icon";

export default function Toolbar({ panelState, setPanelState } : { panelState : string, setPanelState : React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className = 'toolbar__wrapper'> 
            {TOOLS_CONFIG.map(tool => (
                <button key = {tool.name} onClick = {() => setPanelState(tool.content)} className = {`toolbar__button ${tool.content === panelState ? 'toolbar__button--active' : ''}`}>
                    <Icon key = {tool.name} name = {tool.name} size = {tool.size}/>
                </button>
            ))}
        </div>
    );
}

