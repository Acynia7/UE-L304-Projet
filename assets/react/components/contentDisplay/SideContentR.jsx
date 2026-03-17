import './display.scss';
import pic from '../../../images/fond-par-defaut.png';
export default function SideContentR({alt,children}) {
    
    return (
        <>
            <div className="home__side-content">
                <div className="o-container o-container--centered">
                    <div className="c-flex--row-r-responsive">
                        <div className="home__content c-content w50r">
                            <p>{children}</p>
                        </div>
                        <div className="home__image w50r">
                            <img src={pic} alt={alt} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
