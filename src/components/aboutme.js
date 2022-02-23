import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {container, face, aboutContent, header, underline, link} from '../styles/aboutme.module.css'
import Activities from '../components/activities'

export default function AboutMe(){
    const data = useStaticQuery(graphql`
    query {
      content: file(base: {eq: "aboutme.md"}) {
        id
        childMarkdownRemark {
          html
        }
      }
    }
  `)


    return(
        <div className={container} id="aboutme">
            <div className={face}>
              <StaticImage src="../pages/about_me.png" alt="Headshot of Adit" placeholder="tracedSVG" width="250" transformOptions={{duotone:{highlight: '#FFFFFF', shadow: '#4154E8'}}}  />
            </div>
            <div className={aboutContent}>
                <h1 className={header}><span className={underline}>About Me</span></h1>
                <div dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }} />
                <h4>Get in touch: <a href="mailto:adit.nd@gmail.com">adit.nd@gmail.com</a></h4>
                {/* <ul className={AboutStyles.infoList}>
                    <li className={AboutStyles.normal}>adit.nd@gmail.com</li>
                    <li className={AboutStyles.link}><a href="https://www.dropbox.com/s/dsuwp8ux1ysc9ot/resume2021_general.pdf?dl=0">resume</a></li>
                </ul> */}
                <Activities />
                <h4 className={link}><a href="https://www.dropbox.com/s/dsuwp8ux1ysc9ot/resume2021_general.pdf?dl=0">resume</a></h4>
            </div>
            
        </div>
    )
}