import './About.scss';

export default function AboutData({...props}){
    return(
        <div className="about-data">
            <div className="about-data__container o-container--centered">
                <div className="about-data__left">
                    <div className="about-data__span">
                        <span>NOTRE MISSION</span>
                    </div>
                    <div className="about-data__title">
                        <h2>Transformer les gestes écoresponsables en défis motivants</h2>
                    </div>
                    <div className="about-data__content">
                        <p>
                            EcoBattle est né d'un constat simple : les étudiants sont conscients des enjeux climatiques, mais peinent à passer 
                            à l'action au quotidien. Notre plateforme exploite les mécaniques de gamification pour rendre l'écologie engageante, 
                            compétitive et collective.
                        </p>
                        <br />
                        <p>
                            Grâce à un système de défis journaliers et hebdomadaires, de points, d'équipes et de classements inter-universitaires, 
                            chaque petit geste devient une victoire partagée.
                        </p>
                    </div>
                </div>
                <div className="about-data__right">
                    <div className="about-data__stats">
                        <div className="about-data__case">
                            <div className="about-data__number">
                                <p>150+</p>
                            </div>
                            <div className="about-data__sub-number">
                                <p>JOUEURS</p>
                            </div>    
                        </div>
                        <div className="about-data__case">
                            <div className="about-data__number">
                                <p>45</p>
                            </div>
                            <div className="about-data__sub-number">
                                <p>ÉQUIPES</p>
                            </div>
                        </div>
                        <div className="about-data__case">
                            <div className="about-data__number">
                                <p>80</p>
                            </div>
                            <div className="about-data__sub-number">
                                <p>DÉFIS</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-data__number-content">
                        <p>
                            Des étudiants à travers la France<br />
                            relèvent déjà des défis écologiques<br />
                            ensemble.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
