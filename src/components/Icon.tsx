import { ICONS } from "../config/icons"

export function Icon(
    { name, 
      size = 'medium', 
      onMouseEnter, 
      onMouseLeave
    } : { 
        name : string;
        size  : string;
        onMouseEnter? : () => void;
        onMouseLeave? : () => void;
    }) {
    return (
        <div 
            className   = {`icon__wrapper icon__wrapper--${size}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {ICONS[name]}
        </div>
    );
}