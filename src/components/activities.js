import React from "react"
import { Link } from "gatsby"
import ActivityStyle from '../styles/activities.module.css'


export default function Activities(){
    return(
        <ul className={ActivityStyle.list}>
            <li>
                <a href="http:google.com">PRIMER 2020</a>
                <Link to="/portfolio/post-2">Unstable Label</Link>
                <p>Interactive Web Essay</p>
                <p>June 2016</p>
            </li>
            <li>
                <p>PRIMER 2020</p>
                <Link to="/portfolio/post-2">Unstable Label</Link>
                <p>Interactive Web Essay</p>
                <p>June 2016</p>
            </li>
            <li>
                <p>Unstable Label</p>
                <p>Interactive Web Essay</p>
                <p>June 2016</p>
            </li>
        </ul>
    )
}