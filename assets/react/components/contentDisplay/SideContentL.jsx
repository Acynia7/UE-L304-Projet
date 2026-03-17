import './display.scss';
import '../_components.scss';
import pic from '../../../images/fond-par-defaut.png';
export default function SideContentL({alt,children}) {
    
    return (
        <>
            <div className="home__side-content">
                <div className="o-container o-container--centered">
                    <div className="c-flex--row-responsive">
                        <div className="home__image w50r">
                            <img src={pic} alt={alt} />
                        </div>
                        <div className="home__content c-content w50r">
                            <p>{children}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
