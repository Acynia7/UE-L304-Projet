import { useLocation } from "react-router-dom";

export default function Ariane({...props}){

    const location = useLocation();

    return(
        <div className="ariane">
            <div className="o-container--centered">
                <div className="c-title">
                    <h1>
                        {props.title}
                    </h1>
                </div>
                <div className="ariane--path">
                    <span>
                        {location.pathname}
                    </span>
                </div>
            </div>
        </div>
    )
}