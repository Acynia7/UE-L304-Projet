export default function AboutValors({ className, ...props }) {
    return (
        <div className={`about-valors ${className || ''}`} {...props}>
            <span className="about-valors__icon">
                {props.icon}
            </span>
            <span className="about-valors__title">
                {props.title}
            </span>
            <span className="about-valors__content">
                {props.children}
            </span>
        </div>
    )
}