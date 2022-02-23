import React from "react"
import { Link } from "gatsby"
import {activities, table} from '../styles/activities.module.css'


export default function Activities(){
    return(
        <React.Fragment>
            <div className={activities}>
                <div className={table}>
                    <div>Experience</div>
                    <div>
                        <ul><li>NASA JPL</li><li>Intern, Human Centered Designer II</li></ul>
                        <p>2019 - Current</p>
                    </div>
                    <div>
                        <ul><li>Emulate</li><li>Associate Product Designer</li></ul>
                        <p>2016-2018</p>
                    </div>
                    <div>
                        <ul><li>Superflux</li><li>Product Designer</li></ul>
                        <p>Summer 2016</p>
                    </div>
                    <div>
                        <ul><li>Onshape</li><li>User Experience Intern</li></ul>
                        <p>Summer 2015</p>
                    </div>
                </div>
                <div className={table}>
                    <div>Education</div>
                    <div>
                        <ul><li>MFA Media Design Practices</li><li>ArtCenter College of Design</li></ul>
                        <p>2018-2020</p>
                    </div>
                    <div>
                        <ul><li>BS Mechanical Engineering</li><li>Olin College of Engineering</li></ul>
                        <p>2012-2016</p>
                    </div>
                </div>
                <div className={table}>
                    <div>Exhibited Work</div>
                    <div>
                        <ul><li><a href="https://art.metro.net/event/broken-news/">Union Station, Los Angeles</a></li><li><Link to="portfolio/broken-news">Broken News</Link></li></ul>
                        <p>October 2021</p>
                    </div>
                    <div>
                        <ul><li><a href="https://deepcity.ch">DeepCity</a></li><li><Link to="portfolio/unstable-label">Unstable Label</Link></li></ul>
                        <p>March 2021</p>
                    </div>
                    <div>
                        <ul><li><a href="https://abiertodediseno.mx/en/home-2020/">Abierto Mexicano de Diseño</a></li><li><Link to="portfolio/unstable-label">Unstable Label</Link></li></ul>
                        <p>October 2020</p>
                    </div>
                    <div>
                        <ul><li><a href="https://2020.primerconference.us/emerging-designer-exhibition">PRIMER 2020 Emerging Designer Exhibition</a></li><li><Link to="portfolio/unstable-label">Unstable Label</Link></li></ul>
                        <p>July 2020</p>
                    </div>
                    <div>
                        <ul><li>ArtCenter Grad Show 2020</li><li><Link to="portfolio/unstable-label">Unstable Label</Link></li></ul>
                        <p>May 2020</p>
                    </div>
                    <div>
                        <ul><li>ArtCenter MDP WIP Show 2019</li><li><Link to="portfolio/machined-data">Machined Data</Link></li></ul>
                        <p>December 2019</p>
                    </div>
                    <div>
                        <ul><li><a href="https://vimeo.com/329479367">Wobbly Realities Livestream</a></li><li><Link to="portfolio/machine-edit-cooking-show">Machine-Edit Cooking Show</Link></li></ul>
                        <p>March 2019</p>
                    </div>
                    <div>
                        <ul><li>ArtCenter MDP WIP Show 2018</li><li><Link to="portfolio/roaming-view">Roaming View</Link></li></ul>
                        <p>December 2018</p>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}