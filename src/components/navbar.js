import React, {useState} from "react"
import { Link } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import NavStyles from "../styles/navbar.module.css"
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';


export default function Navbar({className, location}){

    const navElements = [
        {matches: ["/portfolio", "/#projects", "/case-studies"], name:"portfolio"},
        {matches: ["/sketchbook"], name:"sketchbook"},
        {matches: ["/#aboutme"], name:"about me"}
    ];

    const isActive = (pathname) => {
        if(location){
            return (location.pathname+location.hash).includes(pathname);
        }
        else{
            return false;
        }
        
    }

    const getActivePageName = () => {
        var closest = navElements.find((element) => {
            return element.matches.find(loc => isActive(loc))
        });
        if(closest){ return closest.name; }
        else{ return "contents" }
    };

    const { buttonProps, itemProps, isOpen } = useDropdownMenu(3);
    // const [mobile, setMobile] = useState(false);
    const breakpoints = useBreakpoint();

    return(
        <nav className={`${NavStyles.navbar} ${className === 'dark' ? NavStyles.dark : ""}`}>
            <Link className={NavStyles.logo} to="/"><span className={NavStyles.underline}>adit</span></Link>
            <div className={(breakpoints.xs ? NavStyles.mobileToggle : "")}>
                <button className={NavStyles.mobileNav} {...buttonProps}>
                    <p>{getActivePageName()}</p>
                    <svg height="24px" viewBox="0 0 12 20"><path d="M6.00005 12.6172L2.99775 8.69166L9.00234 8.69166L6.00005 12.6172Z"/></svg>
                </button>
                <div className={NavStyles.siteNav} style={{"visibility":((isOpen || !breakpoints.xs) ? "visible" : "hidden")}} role='menu'>
                    <AnchorLink {...itemProps[0]} className={isActive("/#projects") || isActive("/portfolio") || isActive("/case-studies") ? NavStyles.active : "" } to="/#projects" >portfolio</AnchorLink>
                    {/* <Link getProps={({ location }) => whatLocation(location)} to="/">projects</Link> */}
                    <Link {...itemProps[1]} className={isActive("/sketchbook") ? NavStyles.active : "" } to="/sketchbook/">sketchbook</Link>
                    <AnchorLink {...itemProps[2]} className={isActive("/#aboutme") ? NavStyles.active : "" } to="/#aboutme">about me</AnchorLink>
                </div>
            </div>
            
        </nav>
    )
}