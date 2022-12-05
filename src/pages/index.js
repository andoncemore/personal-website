import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from '../components/layout'
import ContentGrid from '../components/contentGrid'
import AboutMe from '../components/aboutme'
import {heroContainer, intro} from '../styles/homestyles.module.css'
import Seo from "../components/SEO"

export default function Home({data, location}) {
  return (
    <Layout className="dark" location={location}>
      <Seo title="Adit Dhanushkodi" />
      <div className={heroContainer}>
        <StaticImage src="./landing-colored.png" alt="Closeup of someone looking through a cardboard binocular" style={{height: "100%"}} loading="eager" layout="fullWidth" />
        <div className={intro}>
          <h1>Hi, I'm Adit.</h1>
          <p>I'm a designer, researcher, and critical technologist immersed in the messy realities of complex systems, turning systems thinking into tangible stuff.</p>
          {/* <p>I'm a designer, researcher, and critical technologist using design and technologies of all sorts to wrangle with the messy realities of complex systems.</p> */}
        </div>
      </div>
      <ContentGrid />
      <AboutMe />
    </Layout>
  )
}
