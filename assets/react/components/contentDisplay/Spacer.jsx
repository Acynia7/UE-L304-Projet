import './display.scss';
export default function Spacer({size}){
    const className = `spacing-${size}`;

    return (
        <div className={className} />
    );
}