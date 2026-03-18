import Ariane from "../contentDisplay/Ariane";
import CenterContent from "../contentDisplay/CenterContent";
import SideContentL from "../contentDisplay/SideContentL";
import SideContentR from "../contentDisplay/SideContentR";
import Spacer from "../contentDisplay/Spacer";
import Team from "../contentDisplay/Team";

export default function About() {
    return (
        <div className="about">

            <Ariane title='A propos' />
            <SideContentL alt='undefined'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, modi. Exercitationem iure ut modi laborum eius ipsa! Voluptatem quas quidem at. Exercitationem vel repudiandae, sit consequuntur excepturi omnis, accusamus deleniti placeat odit, fugiat maiores iste quaerat! Sapiente nobis quas dicta neque. Id, iusto odio aliquid consectetur debitis obcaecati nesciunt odit!
            </SideContentL>
            <Spacer size='50' />
            <CenterContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem blanditiis deserunt explicabo culpa quaerat at beatae id eveniet ea quos velit facilis delectus, error doloribus rem voluptate corrupti laboriosam ab optio dolore placeat. Deserunt error suscipit numquam. Incidunt autem dolore illum, eos animi omnis, modi quia delectus obcaecati explicabo voluptates!
            </CenterContent>
            <Spacer size='50' />
            <SideContentR alt='undefined'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsa necessitatibus rem officiis eius corporis dolore cumque, facere perferendis repudiandae distinctio illum architecto dicta, nihil delectus tempore doloribus nulla explicabo unde. Error impedit, neque officiis dolorem voluptas beatae nisi numquam dolor expedita a quisquam aut eum aspernatur! Aliquam, assumenda voluptatem.
            </SideContentR>
            <Spacer size='50' />
            <CenterContent>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vitae accusamus iste, tempora sunt dolorem, minima illo a recusandae, quae in beatae ducimus. Quisquam exercitationem dolorem, nostrum non enim quia.
            </CenterContent>
            <Spacer size='50' />
            <Team />
            <Spacer size='50' />
        </div>
    );
}
