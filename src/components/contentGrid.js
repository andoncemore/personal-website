import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import LandingStyles from '../styles/homestyles.module.css'
import Img from "gatsby-image"
import Activities from '../components/activities'

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
                  fluid(maxHeight: 85, maxWidth: 181, grayscale: true) {
                    ...GatsbyImageSharpFluid
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
                  fluid(maxHeight: 150, maxWidth: 321) {
                    ...GatsbyImageSharpFluid
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
      <div className={LandingStyles.portfolioContent} id="projects">
          <div>
            <div className={LandingStyles.divider}>
                <h2><span>Projects</span></h2>
            </div>
            {data.featured.edges.map((edge) => 
                <Link className={LandingStyles.featuredProject} to={edge.node.fields.slug}>
                    <div className={LandingStyles.featuredImage}>
                        <Img fluid={edge.node.frontmatter.thumbnail.childImageSharp.fluid} style={{height: "100%"}} />
                    </div>
                    <div className={LandingStyles.featuredContent}>
                        <h4>{edge.node.frontmatter.date}</h4>
                        <h1>{edge.node.frontmatter.title}</h1>
                        <p>{edge.node.frontmatter.shortDescription}</p>
                    </div>
                </Link>
            )}
            <div className={LandingStyles.smallProjectGrid}>
                {data.notFeatured.edges.map((edge) => 
                    <Link className={LandingStyles.smallProject} to={edge.node.fields.slug}>
                        <div className={LandingStyles.smallImage}>
                            <Img fluid={edge.node.frontmatter.thumbnail.childImageSharp.fluid} style={{height: "100%"}} />
                        </div>
                        <h1>{edge.node.frontmatter.title}</h1>
                    </Link>
                )}
            </div>
          </div>
          <div>
            <div className={LandingStyles.divider}>
                <h2><span>Process Case Studies</span></h2>
            </div>
            {data.caseStudies.edges.map((edge) => 
                <Link className={LandingStyles.caseStudy} to={edge.node.fields.slug}>
                    <h4>{edge.node.frontmatter.date}</h4>
                    <h1>{edge.node.frontmatter.title}</h1>
                    <p>{edge.node.frontmatter.shortDescription}</p>
                </Link>
            )}
            <div className={LandingStyles.divider}>
                <h2><span>Exhibitions, Writing, Etc.</span></h2>
            </div>  
            <Activities />
          </div>
      </div>
  )
}

export default ContentGrid;
