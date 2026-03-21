import { IoMdContact } from "react-icons/io";


export default function Team(){
    return(
        <div className="team">
            <div className="o-container--centered team--container">
                <div className="team--row">
                    <div className="team--box">
                        <div className="team__icon orange">
                            EV
                        </div>
                        <h2>Emilie Valentin</h2>
                        <span className="team__span">Développeur Back-End</span>
                        <span>Fondatrice du projet</span>
                    </div>
                    <div className="team--box">
                        <div className="team__icon orange">
                            KD
                        </div>
                        <h2>Khadidja Djamaldiev</h2>
                        <span className="team__span">Cheffe de Projet</span>
                    </div>
                    <div className="team--box">
                        <div className="team__icon blue">
                            SJ
                        </div>
                        <h2>Safiya Jaouahir</h2>
                        <span className="team__span">Développeur Back-End</span>
                    </div>
                </div>
                <div className="team--row">
                    <div className="team--box">
                        <div className="team__icon blue">
                            AP
                        </div>
                        <h2>Aurélien Piotte</h2>
                        <span className="team__span">Développeur Front-End</span>
                    </div>
                    <div className="team--box">
                        <div className="team__icon green">
                            NS
                        </div>
                        <h2>Nathan Saccol</h2>
                        <span className="team__span">Développeur Front-End</span>
                    </div>
                    <div className="team--box">
                        <div className="team__icon green">
                            BS
                        </div>
                        <h2>Berke Sen</h2>
                        <span className="team__span">Chef de Projet</span>
                    </div>
                </div>
            </div>
        </div>
    )
}