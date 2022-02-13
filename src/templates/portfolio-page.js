import React, {useRef, useEffect, useState} from "react"
import { graphql } from 'gatsby'
import Article from "../components/article"
import Img from "gatsby-image"
import OverviewStyles from "../styles/projectOverview.module.css"
import ImageStyles from "../styles/articleImages.module.css"
import TextStyles from "../styles/articleText.module.css"
import PhotoSwipeWrapper from '../components/photoSwipeWrapper'
import ResponsiveIframe from '../components/responsive_iframe'
import SEO from "../components/SEO"

export default function Template({data, location}) {
  // This is the data
  const { posts: post } = data // data.markdownRemark holds your post data
  
  // This is the state variables
  const articleContent = useRef(null);
  const itemRef = useRef({
      items: []
  });
//   const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(-1);

  const parseSrcset = (attr, ratio) => {
    let removed = attr.replace( /[\r\n]+/gm, "" )
    let split = removed.split(",");
    let fluid = split.map(img => {
        let d = img.split(' ');
        return {width: parseInt(d[1],10), height: parseInt(d[1],10)/ratio, src: d[0]}
    }).sort((a,b) => a.width - b.width);
    return fluid;
  }




  useEffect(() => {
    //   if(itemRef.current.items.length === 0){
        // const allImages = Object.assign({}, ...data.images.edges.map((x) => ({[x.node.childImageSharp.fixed.originalName]: x.node.childImageSharp.fixed })));
        let cleanedImages = data.fluidImages.edges.filter((img) => img.node.childImageSharp !== null);
        const allFluidImages = Object.assign({}, ...cleanedImages.map((img) => {
            return {[img.node.childImageSharp.fluid.originalName]: parseSrcset(img.node.childImageSharp.fluid.srcSet, img.node.childImageSharp.fluid.aspectRatio)};
          }));
        // console.log(allFluidImages);
        let domImages = articleContent.current.querySelectorAll(".gatsby-resp-image-wrapper");
        itemRef.current.items = Array.from(domImages).map((elm,index) => {
            let filename = elm.querySelector("img").getAttribute('src').split("/").pop()
            // console.log(filename)
            let queriedImage = allFluidImages[filename];
            // console.log(queriedImage);
            let item = {fluidImages:allFluidImages[filename]};
            item['elt'] = elm.querySelector("img");
            // let item = {src: queriedImage.src, w: queriedImage.width, h: queriedImage.height};
            let caption = elm.nextElementSibling;
            if(caption){
                item['title'] = caption.innerHTML
            }
            elm.onclick = (event) => {
                event.preventDefault();
                handleOpen(index);
                // console.log("Clicked on the image");
            }
            return item ;
        })
        // console.log(itemRef.current.items);
    //   }
  },[data])



  const handleOpen = (i) => {
      setIndex(i);
  }

  return (
    <Article location={location}>
        <SEO title={post.frontmatter.title ? post.frontmatter.title : ""} description={post.frontmatter.shortDescription} />
        {post.frontmatter.featuredImage && 
            <Img className={ImageStyles.wide} fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}

        {post.frontmatter.iframe && 
            <ResponsiveIframe iframeString={post.frontmatter.iframe} className={ImageStyles.wide} />
        }

        <div className={OverviewStyles.projectOverview}>
            {post.frontmatter.title && <h1>{post.frontmatter.title}</h1>}
            {/* {post.frontmatter.date && <p className={OverviewStyles.date}>{post.frontmatter.date}</p>} */}
            {(post.fields.collection === "case-studies" || post.frontmatter.tags) &&
                <ul className={OverviewStyles.tagList}>
                    {post.fields.collection === "case-studies" && <li><span className={OverviewStyles.highlighted}>Process Case Study</span></li>}
                    {post.frontmatter.tags && 
                        post.frontmatter.tags.map((elt, index) => (
                            <li key={index}>{elt}</li>
                        ))
                    }
                </ul>
            }

            {post.fields.htmlDescription && 
                <div className={OverviewStyles.description} dangerouslySetInnerHTML={{ __html: post.fields.htmlDescription }} />
            }
            {post.fields.htmlInfo && 
                <ul className={OverviewStyles.infoList}>
                    {post.fields.htmlInfo.map((elt, index) => (
                    <li key={index} className={elt.link ? OverviewStyles.link : OverviewStyles.normal}><div dangerouslySetInnerHTML={{ __html: elt.html }} /></li>
                ))}
                </ul>
            }
            <hr />
        </div>
        <div ref={articleContent} className={`articleContent ${post.fields.collection === "case-studies" ? TextStyles.casestudy : TextStyles.portfolio}`} dangerouslySetInnerHTML={{ __html: post.html }} />
        <PhotoSwipeWrapper index={index} items={itemRef.current.items} onClose={() => setIndex(-1)} />
    </Article>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $name: String!) {
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
                fluid(maxWidth: 1080) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
      }
    }
    fluidImages: allFile(filter: {relativeDirectory: {eq: $name}, internal: {mediaType: {regex: "/image/"}}}) {
        edges{
            node{
                childImageSharp {
                    fluid(maxWidth: 1920) {
                        srcSet
                        aspectRatio
                        originalName
                    }
                }
            }
        }
    }
  }
`