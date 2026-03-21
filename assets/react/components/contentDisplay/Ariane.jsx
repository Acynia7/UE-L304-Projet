import { useLocation } from "react-router-dom";
import Spacer from "./Spacer";

export default function Ariane({...props}){

    const location = useLocation();

    return(
        <div className="ariane">
            <div className="o-container--centered">
                <div className="ariane--path">
                    <span>
                        {props.alt || location.pathname}
                    </span>
                </div>
                <div className="c-title">
                    <h1>
                        {props.title}
                    </h1>
                </div>
                <div className="c-content">
                    <p>
                        {props.children}
                    </p>
                </div>
            </div>
            <Spacer size='20' />
        </div>
    )
}