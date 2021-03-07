import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import AboutStyles from '../styles/aboutme.module.css' 

export default function AboutMe(){
    const data = useStaticQuery(graphql`
    query {
      desktopLanding: allFile(filter: {base: {eq: "landing.png"}}) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth:720) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
      content: file(base: {eq: "aboutme.md"}) {
        id
        childMarkdownRemark {
          html
        }
      }
    }
  `)


    return(
        <div className={AboutStyles.container} id="aboutme">
            <div className={AboutStyles.aboutme}>
                <Img fluid={data.desktopLanding.edges[0].node.childImageSharp.fluid} />
                <h1 className={AboutStyles.header}><span className={AboutStyles.underline}>About Me</span></h1>
                <div className={AboutStyles.content} dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }} />
                <ul className={AboutStyles.infoList}>
                    <li className={AboutStyles.normal}>adit.nd@gmail.com</li>
                    <li className={AboutStyles.link}><a href="https://www.dropbox.com/s/dsuwp8ux1ysc9ot/resume2021_general.pdf?dl=0">resume</a></li>
                </ul>
            </div>
        </div>
    )
}