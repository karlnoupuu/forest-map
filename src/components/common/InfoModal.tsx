export default function InfoModal({ infoText, mobileConfirm, onDismiss} : { infoText : string, mobileConfirm : boolean, onDismiss: () => void; }) {
    return (
        <div className = {`modal__mask ${mobileConfirm ? '' : 'modal__mask--visible'}`}>
            <div className = 'modal__wrapper'>
                <span className = 'modal__text text--medium text--bold'>
                    {infoText}
                </span>
                <button className = 'modal__button text--medium text--bold' onClick = {onDismiss}>
                    Got it!
                </button>
            </div>
        </div>
    );
}