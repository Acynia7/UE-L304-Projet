export default function CenterContent({...props}){
    return(
        <div className="cc">
            <div className="o-container--centered">
                <div className="c-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}