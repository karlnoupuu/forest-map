import { ICONS } from "../../config/icons"

export function Icon(
    { name, 
      size = 'medium', 
      onMouseEnter, 
      onMouseLeave,
      onClick
    } : { 
        name : string;
        size  : string;
        onMouseEnter? : () => void;
        onMouseLeave? : () => void;
        onClick? : () => void;
    }) {
    return (
        <div 
            className   = {`icon__wrapper icon__wrapper--${size}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {ICONS[name]}
        </div>
    );
}