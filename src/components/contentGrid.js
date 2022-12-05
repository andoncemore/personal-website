import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import {portfolioContainer, projectGrid, featuredProject, image, sizing, description, caseStudy, small, smallProject, iconStyle} from '../styles/homestyles.module.css'
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
              external
              locked
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
              external
              locked
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

  const featuredGridItem = (node) => {
    return (<>
    <div className={image}>
      <div className={sizing}>
        <div><GatsbyImage image={getImage(node.frontmatter.thumbnail)} style={{height: "100%"}} objectFit="contain"/></div>
      </div>
    </div>
    <div className={description}>
      <h1>{node.frontmatter.locked ? lockIcon() : ""}{node.frontmatter.title}</h1>
      <ul><li>{node.frontmatter.date}</li></ul>
      <p>{node.frontmatter.shortDescription}</p>
    </div>
    </>)
  }

  const notFeaturedGridItem = (node) => {
    return (<>
    <div className={image}>
      <div className={sizing}>
        <div><GatsbyImage image={getImage(node.frontmatter.thumbnail)} style={{height: "100%"}} objectFit="contain" /></div>
      </div>
    </div>
    <h1>{node.frontmatter.locked ? lockIcon() : ""}{node.frontmatter.title}</h1>
    </>)
  }

  const lockIcon = () =>
    <svg className={iconStyle} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>

  return(
      <div className={portfolioContainer} id="projects">
        {/* <h1><span className={LandingStyles.underline}>Projects</span></h1> */}
        <div className={projectGrid}>
          {data.featured.edges.map((edge, index) => {
              if(edge.node.frontmatter.external){
                return (
                  <a key={index} className={featuredProject} href={edge.node.frontmatter.external}>
                    {featuredGridItem(edge.node)}
                  </a>
                )
              }
              else{
                return (
                  <Link key={index} className={featuredProject} to={edge.node.frontmatter.locked ? '/locked' : edge.node.fields.slug}>
                    {featuredGridItem(edge.node)}
                  </Link>
                )
              }

          })}
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
          {data.notFeatured.edges.map((edge, index) => {
            if(edge.node.frontmatter.external){
              return (
                <a key={index} className={smallProject} href={edge.node.frontmatter.external}>
                  {notFeaturedGridItem(edge.node)}
                </a>
              )
            }
            else{
              return(
              <Link key={index} className={smallProject} to={edge.node.frontmatter.locked ? '/locked' : edge.node.fields.slug}>
                {notFeaturedGridItem(edge.node)}
              </Link>
              )
            }
            
          })}
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
