import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import {portfolioContainer, projectGrid, featuredProject, image, sizing, description, caseStudy, small, smallProject} from '../styles/homestyles.module.css'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


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
                  gatsbyImageData(layout: CONSTRAINED, width: 350, placeholder:TRACED_SVG, transformOptions: {grayscale: true})
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
                  gatsbyImageData(layout: CONSTRAINED, width: 650, placeholder:TRACED_SVG, transformOptions: {grayscale: true})
                }
              }
            }
          }
        }
      }
    }
  `)
  return(
      <div className={portfolioContainer} id="projects">
        {/* <h1><span className={LandingStyles.underline}>Projects</span></h1> */}
        <div className={projectGrid}>
          {data.featured.edges.map((edge, index) => 
              <Link key={index} className={featuredProject} to={edge.node.fields.slug}>
                  <div className={image}>
                    <div className={sizing}>
                      <div><GatsbyImage image={getImage(edge.node.frontmatter.thumbnail)} style={{height: "100%"}} objectFit="contain"/></div>
                    </div>
                  </div>
                  <div className={description}>
                      <h1>{edge.node.frontmatter.title}</h1>
                      <ul><li>{edge.node.frontmatter.date}</li></ul>
                      <p>{edge.node.frontmatter.shortDescription}</p>
                  </div>
              </Link>
          )}
          {data.caseStudies.edges.map((edge, index) => 
              <Link key={index} className={caseStudy} to={edge.node.fields.slug}>
                  <div className={description}>
                    <h1>{edge.node.frontmatter.title}</h1>
                    <p>{edge.node.frontmatter.shortDescription}</p>
                  </div>
              </Link>
          )}
        </div>
        <div className={`${projectGrid} ${small}`}>
          {data.notFeatured.edges.map((edge, index) => 
              <Link key={index} className={smallProject} to={edge.node.fields.slug}>
                  <div className={image}>
                      <div className={sizing}>
                        <div><GatsbyImage image={getImage(edge.node.frontmatter.thumbnail)} style={{height: "100%"}} objectFit="contain" /></div>
                      </div>
                  </div>
                  <h1>{edge.node.frontmatter.title}</h1>
              </Link>
          )}
        </div>
        <svg style={{position: 'absolute', height: 0}}>
            <filter id="myfilter">
                <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                .33 .33 .33 0 0
                .33 .33 .33 0 0
                 0   0   0  1 0">
                </feColorMatrix>
                <feComponentTransfer colorInterpolationFilters="sRGB">
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
