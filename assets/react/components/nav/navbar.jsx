import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import "./navbar.scss";

const pages = [

    {
        name: "Home",
        path: "/"
    },
    {
        name: "A propos",
        path: "/about"
    },
    {
        name: "dashboard",
        sub_items:
        {
            dashboard:{
                name: "Dashboard",
                path: "/dashboard"                
            },
            challenge:{
                name: "Challenge",
                path: "/challenge"
            },
            classement:{
                name: "Classement", 
                path: "/classement"
            },
            profil:{
                name: "Profil",
                path: "/profil"
            },    
        },
    },
    {
        name: "Contact",
        path: "/contact"
    }
];

function navResponsive() {
    var elementClass = document.querySelector("nav");
    var body = document.querySelector("html");

    if (elementClass.className === "navbar__element")
    {
        elementClass.className += " navbar__element--responsive";
        body.className += " of_hidden";
    }
    else
    {
        elementClass.className = "navbar__element";
        body.className = "";
    }
}    

function openList() {
    var elementClass = document.querySelector(".navbar__sub-list");
    if (elementClass.className === "navbar__sub-list")
    {
        elementClass.className += " navbar__sub-list--open";
    }
    else
    {
        elementClass.className = "navbar__sub-list";
    }
}

function getPresence() 
{
    const width = window.innerWidth;

    return width >900
    ? 1
    : 0
}

export default function Navbar({...props}) {
    
    const [presence, setPresence] = useState(getPresence());

    useEffect(function()
    {
        window.addEventListener('resize', definePresence);

        return () => window.removeEventListener('resize', definePresence);

        function definePresence(e)
        {
            setPresence(getPresence());
        }
    },
    []);

    useEffect(function()
    {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 0) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    },
    []);

    function ArrowDownResponsive()
    {
        (presence == 1)
        ? openList()
        : undefined
    }
    
    const location = useLocation();

    const nav_items = pages.map(function (page)
    {
        const items = Object.keys(page.sub_items || { } ).map(function(sub_item_name)
        {
            const sub_item = page.sub_items[sub_item_name]

            return (
                <li key={ sub_item_name} className="navbar__sub-item">
                    <a key={ sub_item_name } href={ sub_item.path }
                        className= {
                            location.pathname == sub_item.path
                            ? 'navbar__sub-link is-active'
                            : 'navbar__sub-link'
                        }
                        >

                        {sub_item.name}
                    </a>
                </li>
            );
        });

        if(!page.path){
            return (
                <li key={ page.name } className="navbar__item">
                    <button type="button"
                        key={ page.name }
                        onClick={ ArrowDownResponsive }
                        className={
                            location.pathname == page.path
                            ? 'navbar__link is-active'
                            : 'navbar__link'
                        }
                        >

                        {page.name}
                    </button>
                    <button type="button"
                        onClick={ openList }
                        className="navbar__arrow-phone--button"
                    >
                        <div className="navbar__arrow-phone">
                            <RiArrowDownSLine />
                        </div>
                    </button>
                    <ul className="navbar__sub-list">
                        { items }
                    </ul>
                </li>
            );
        }
        return(
            <li key={ page.name } className="navbar__item">
                <Link key={page.name} to={ page.path }
                    className={
                        location.pathname == page.path
                        ? 'navbar__link is-active'
                        : 'navbar__link'
                    }
                    >
                    { page.name }
                    { items }
                </Link>
            </li>
        );
    });

    return (
        <div className="navbar">
            <div className="navbar__responsive-open">
                <button type="button"
                    onClick={ navResponsive }
                    className="navbar__responsive-open-button"
                >
                    <IoMenu />
                </button>
            </div>
            <div className="navbar__container">
                <nav className="navbar__element">
                    {/* <div className="navbar__responsive-logo">
                        <Image />
                    </div> */}
                    <div className="navbar__responsive-close">
                        <button type="button" onClick={ navResponsive }>
                            <IoClose />
                        </button>
                    </div>
                    <ul className="navbar__list">

                        { nav_items }
                    </ul>
                </nav>
            </div>
        </div>
    )
}