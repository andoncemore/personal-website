import React, {useRef, useEffect, useState} from "react"
import { graphql } from 'gatsby'
import Article from "../components/article"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {projectOverview, tagList,description, infoList, link, normal, highlighted } from "../styles/projectOverview.module.css"
import {wide} from "../styles/articleImages.module.css"
import {casestudy, portfolio} from "../styles/articleText.module.css"
import ResponsiveIframe from '../components/responsive_iframe'
import SEO from "../components/SEO"

export default function Template({data, location}) {
  // This is the data
  const { posts: post } = data // data.markdownRemark holds your post data
  

  return (
    <Article location={location}>
        <SEO title={post.frontmatter.title ? post.frontmatter.title : ""} description={post.frontmatter.shortDescription} />
        {post.frontmatter.featuredImage && 
            <GatsbyImage image={getImage(post.frontmatter.featuredImage)} className={wide} loading="eager" />}
            
        {post.frontmatter.iframe && 
            <ResponsiveIframe iframeString={post.frontmatter.iframe} className={wide} title={post.frontmatter.title ? post.frontmatter.title : "Video"} />
        }

        <div className={projectOverview}>
            {post.frontmatter.title && <h1>{post.frontmatter.title}</h1>}
            {/* {post.frontmatter.date && <p className={OverviewStyles.date}>{post.frontmatter.date}</p>} */}
            {(post.fields.collection === "case-studies" || post.frontmatter.tags) &&
                <ul className={tagList}>
                    {post.fields.collection === "case-studies" && <li><span className={highlighted}>Process Case Study</span></li>}
                    {post.frontmatter.tags && 
                        post.frontmatter.tags.map((elt, index) => (
                            <li key={index}>{elt}</li>
                        ))
                    }
                </ul>
            }

            {post.fields.htmlDescription && 
                <div className={description} dangerouslySetInnerHTML={{ __html: post.fields.htmlDescription }} />
            }
            {post.fields.htmlInfo && 
                <ul className={infoList}>
                    {post.fields.htmlInfo.map((elt, index) => (
                    <li key={index} className={elt.link ? link : normal}><div dangerouslySetInnerHTML={{ __html: elt.html }} /></li>
                ))}
                </ul>
            }
            <hr />
        </div>
        <div className={`articleContent ${post.fields.collection === "case-studies" ? casestudy : portfolio}`} dangerouslySetInnerHTML={{ __html: post.html }} />
    </Article>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    posts: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
          htmlDescription
          htmlInfo {
              html
              link
          }
          collection
      }
      frontmatter {
        title
        shortDescription
        date
        tags
        iframe
        featuredImage {
            childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 1080, placeholder:BLURRED)
            }
        }
      }
    }
  }
`