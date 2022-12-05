import React from "react"
import Layout from '../components/layout'
import {padding} from '../styles/pagePadding.module.css'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import "../styles/typography.css"
import "../styles/article.css"

export default function Locked({ location }){
    return(
        <Layout location={location}>
            <main className={padding} style={{textAlign: 'center'}}>
                <h2>
                    Contact <a href="mailto:adit.nd@gmail.com">adit.nd@gmail.com</a> for access to this project.  
                </h2>
                <AnchorLink to='/#projects'>
                    <h4 style={{display:'inline-flex', alignItems:'center'}}>
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        back
                    </h4>
                </AnchorLink>

            </main>
        </Layout>
    )
}