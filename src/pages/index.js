import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/layout'
import ContentGrid from '../components/contentGrid'
import AboutMe from '../components/aboutme'
import LandingStyles from '../styles/homestyles.module.css'
import SEO from "../components/SEO"

export default function Home({data}) {
  return (
    <Layout className="dark">
      <SEO />
      <div className={LandingStyles.heroContainer}>
        <Img fluid={data.desktopLanding.edges[0].node.childImageSharp.fluid} style={{height: "100%"}} />
        <div className={LandingStyles.intro}>
          <h1>Hi, I'm Adit.</h1>
          <p>I'm a designer, researcher, and critical technologist using design and technologies of all sorts to wrangle with the messy realities of complex systems.</p>
        </div>
      </div>
      <ContentGrid />
      <AboutMe />
    </Layout>
  )
}

export const query = graphql`
  query {
    desktopLanding: allFile(filter: {base: {eq: "landing-colored.png"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth:1920) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
