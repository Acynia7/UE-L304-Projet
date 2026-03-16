import HomeHero from "./HomeHero";
import HomeSideContentL from "./HomeSideContentL";
import './Home.scss';
import HomeSideContentR from "./HomeSideContentR";
import HomeSpacer from "./HomeSpacer";

export default function Home() {
    return (
        <div className="home">
            <HomeHero />
            <HomeSideContentL alt='undefined'> 
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae vel labore ex minima, 
                veritatis iste quasi! Quod, placeat sequi commodi mollitia, sint ducimus sunt corrupti 
                debitis quisquam necessitatibus unde cupiditate dolor repellendus neque nihil sit 
                laboriosam quos laborum aliquid ad! Necessitatibus provident voluptatum voluptates 
                accusamus, qui dicta nisi aut velit! 
            </HomeSideContentL>
            <HomeSpacer size='60' />
            <HomeSideContentR alt='undefined'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, sequi voluptates 
                doloremque cumque repellat numquam. Obcaecati veritatis est dolorum repudiandae vero 
                iste explicabo ut quod soluta harum dignissimos, accusamus inventore dolore, aliquid 
                eos dicta minus. Quibusdam iusto sequi accusamus architecto autem sint necessitatibus? 
                Esse, assumenda vel culpa possimus veritatis pariatur.    
            </HomeSideContentR>

        </div>
    );
}
