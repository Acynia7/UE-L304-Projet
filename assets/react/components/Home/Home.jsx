import HomeHero from "./HomeHero";
import SideContentL from "../contentDisplay/SideContentL";
import SideContentR from "../contentDisplay/SideContentR";
import Spacer from "../contentDisplay/Spacer";

import './Home.scss';

export default function Home() {
    return (
        <div className="home">
            <HomeHero />
            <SideContentL alt='undefined'> 
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae vel labore ex minima, 
                veritatis iste quasi! Quod, placeat sequi commodi mollitia, sint ducimus sunt corrupti 
                debitis quisquam necessitatibus unde cupiditate dolor repellendus neque nihil sit 
                laboriosam quos laborum aliquid ad! Necessitatibus provident voluptatum voluptates 
                accusamus, qui dicta nisi aut velit! 
            </SideContentL>
            <Spacer size='60' />
            <SideContentR alt='undefined'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, sequi voluptates 
                doloremque cumque repellat numquam. Obcaecati veritatis est dolorum repudiandae vero 
                iste explicabo ut quod soluta harum dignissimos, accusamus inventore dolore, aliquid 
                eos dicta minus. Quibusdam iusto sequi accusamus architecto autem sint necessitatibus? 
                Esse, assumenda vel culpa possimus veritatis pariatur.    
            </SideContentR>
            <Spacer size='60' />
        </div>
    );
}
