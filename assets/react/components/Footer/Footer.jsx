import logo from '../../../images/logo-ecobattle-alpha.png';
import './Footer.scss';
export default function Footer(){
    return(
        <div className="footer--container">
            <div className="footer">
                <div className="footer--col-1">
                    <h2>Membres du projet</h2>
                    <div className="footer--lists">
                        <ul className='footer--list'>
                            <li>Emilie Valentin </li>
                            <li>Khadidja Djamaldiev</li>
                            <li>Safiya Jaouahir</li>
                            <li>Aurélien Piotte</li>
                            <li>Nathan Saccol</li>
                            <li>Berke Sen</li>
                        </ul>
                        <ul className='footer--list'>
                            <li>Fondatrice et développeur Back-End</li>
                            <li>Cheffe de projet</li>
                            <li>Développeur Back-End</li>
                            <li>Développeur Front-End</li>
                            <li>Développeur Front-End</li>
                            <li>Chef de Projet</li>
                        </ul>
                    </div>
                    
                </div>

                <div className="footer--col-2">
                    <h2>A propos du projet</h2>
                    <div className="footer--link">
                        <a href="/about#contact-us"><button>Nous contacter</button></a>
                        <a href="/about"><button>A propos</button></a>
                    </div>
                </div>

                <div className="footer--col-3">
                    <div className="footer--img">
                        <img src={logo} alt="Logo du projet ecobattle" />
                    </div>
                </div>
            </div>
            <div className="footer--bottom">
                <p>© 2026 Ecotech Solution SAS</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/privacy">Mentions Légales</a></li>
                </ul>
            </div>
        </div>       
    )
}