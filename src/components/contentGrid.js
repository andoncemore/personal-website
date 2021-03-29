import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import LandingStyles from '../styles/homestyles.module.css'
import Img from "gatsby-image"


const ContentGrid = () => {
  const data = useStaticQuery(graphql`
    {
      caseStudies: allMarkdownRemark(filter: {fields: {collection: {eq: "case-studies"}}, frontmatter: {}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              shortDescription
              date(formatString: "YYYY")
            }
          }
        }
      }
      notFeatured: allMarkdownRemark(filter: {fields: {collection: {eq: "portfolio"}}, frontmatter: {main: {ne: true}}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 350, grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
      featured: allMarkdownRemark(filter: {fields: {collection: {eq: "portfolio"}}, frontmatter: {main: {eq: true}}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              shortDescription
              date(formatString: "YYYY")
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 650, grayscale: true) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return(
      <div className={LandingStyles.portfolioContainer} id="projects">
        {/* <h1><span className={LandingStyles.underline}>Projects</span></h1> */}
        <div className={LandingStyles.projectGrid}>
          {data.featured.edges.map((edge) => 
              <Link className={LandingStyles.featuredProject} to={edge.node.fields.slug}>
                  <div className={LandingStyles.image}>
                    <div className={LandingStyles.sizing}>
                      <div><Img fluid={edge.node.frontmatter.thumbnail.childImageSharp.fluid} style={{height:"100%"}} imgStyle={{objectFit: "contain"}} /></div>
                    </div>
                  </div>
                  <div className={LandingStyles.description}>
                      <h1>{edge.node.frontmatter.title}</h1>
                      <ul><li>{edge.node.frontmatter.date}</li></ul>
                      <p>{edge.node.frontmatter.shortDescription}</p>
                  </div>
              </Link>
          )}
          {data.caseStudies.edges.map((edge) => 
              <Link className={LandingStyles.caseStudy} to={edge.node.fields.slug}>
                  <div className={LandingStyles.description}>
                    <h1>{edge.node.frontmatter.title}</h1>
                    <p>{edge.node.frontmatter.shortDescription}</p>
                  </div>
              </Link>
          )}
        </div>
        <div className={`${LandingStyles.projectGrid} ${LandingStyles.small}`}>
          {data.notFeatured.edges.map((edge) => 
              <Link className={LandingStyles.smallProject} to={edge.node.fields.slug}>
                  <div className={LandingStyles.image}>
                      <div className={LandingStyles.sizing}>
                        <div><Img fluid={edge.node.frontmatter.thumbnail.childImageSharp.fluid} style={{height: "100%"}} imgStyle={{objectFit: "contain"}} /></div>
                      </div>
                  </div>
                  <h1>{edge.node.frontmatter.title}</h1>
              </Link>
          )}
        </div>
        <svg width="900" height="600" viewBox="0 0 900 600" style={{position: 'absolute', height: 0}}>
            <filter id="myfilter">
                <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                .33 .33 .33 0 0
                .33 .33 .33 0 0
                 0   0   0  1 0">
                </feColorMatrix>
                <feComponentTransfer color-interpolation-filters="sRGB">
                <feFuncR type="table" tableValues=".25490196  1"></feFuncR>
                    <feFuncG type="table" tableValues=".32941176  1"></feFuncG>
                    <feFuncB type="table" tableValues=".90980392  1"></feFuncB>
                </feComponentTransfer>
            </filter>
        </svg>
      </div>
  )
}

export default ContentGrid;
