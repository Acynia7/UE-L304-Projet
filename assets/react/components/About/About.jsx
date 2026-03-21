import Ariane from "../contentDisplay/Ariane";
import Spacer from "../contentDisplay/Spacer";
import Team from "../contentDisplay/Team";
import AboutData from "./AboutData";
import './About.scss';
import '../_components.scss'
import AboutValors from "./AboutValors";
import ContactForm from "./ContactForm";

export default function About() {
    return (
        <div className="about">

            <Ariane alt='🌱 Notre histoire' title="A propos d'EcoBattle">
                Une plateforme gamifiée pour engager les étudiants dans la transition écologique, un défi à la fois.
            </Ariane>
            <AboutData />
            <div className="c-flex--row-r-responsive o-container--centered g-40">
                <AboutValors icon='🌍' title='Impact écologique' className='blue'>
                    Chaque défi est conçu pour avoir un impact concret sur l'empreinte carbone des participants et sensibiliser aux enjeux environnementaux.
                </AboutValors>
                <AboutValors icon='🤝' title="Esprit D'équipe" className='green'>
                    La force  du collectif prime sur l'individu. Rejoins une équipe, partage tes actions et fais monter ton université au classement.
                </AboutValors>
                <AboutValors icon='🎮' title='Plaisir & Engagement' className='red'>
                    L'écologie ne doit pas être une contrainte. La gamification transforme les bons gestes en aventures ludiques et motivantes.
                </AboutValors>
            </div>
            <ContactForm />
            <Team />
            
        </div>
    );
}
