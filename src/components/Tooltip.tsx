export default function Tooltip({ text, visible } : { text : string, visible : boolean }) {
    return (
        <div className = {`tooltip__wrapper ${visible ? 'tooltip__wrapper--open' : 'tooltip__wrapper--closed'}`}>
            <span className = 'tooltip__text'>
                {text}
            </span>
        </div>
    );
}