import HomeHero from "./HomeHero";
import SideContentL from "../contentDisplay/SideContentL";
import SideContentR from "../contentDisplay/SideContentR";
import Spacer from "../contentDisplay/Spacer";

import './Home.scss';
import CenterContent from "../contentDisplay/CenterContent";

import pic1 from '../../../images/homepage-1.png'
import pic2 from '../../../images/homepage-2.png'

export default function Home() {
    return (
        <div className="home">
            <HomeHero />
            <SideContentL alt='Étudiants collaborant sur un défi écologique' imageSrc={pic1}>
                Unissez vos forces, relevez le défi, changez la planète. Parce que chaque action compte, nous avons créé un espace où l'effort collectif 
                devient un moteur de changement. Rejoignez une communauté engagée, participez à des challenges environnementaux concrets et mesurez votre 
                impact en temps réel. Ensemble, transformons nos habitudes pour protéger notre avenir.
            </SideContentL>
            <Spacer size='60' />
            <CenterContent>
                La compétition pour l'avenir est lancée. Ici, chaque geste individuel alimente un score collectif : le campus le plus engagé remportera la 
                victoire... et fera gagner la planète.
            </CenterContent>
            <Spacer size='60' />
            <SideContentR alt='Impact environnemental des actions collectives' imageSrc={pic2}>
                Mesurez l'impact de votre établissement, défiez les autres écoles et prouvez que votre génération est prête à mener la transition écologique. 
                Prêt à porter haut les couleurs de votre campus ?  
            </SideContentR>

            <Spacer size='40' />
        </div>
    );
}
