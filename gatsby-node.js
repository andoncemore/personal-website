const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const MarkdownIt = require('markdown-it')
md = new MarkdownIt();

exports.onPreInit = () => {
  console.log("Testing...")
}

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField } = actions;
    

    // Add some attributes to the Markdown Files
    if(node.internal.type === `MarkdownRemark`){
        const parent = getNode(node.parent);
        let collection = parent.sourceInstanceName;
        
        // const slug = createFilePath({node,getNode})
        const slug = createFilePath({node,getNode}).split("/").filter(e => e != '').splice(-1)[0];
        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });
        createNodeField({
            node,
            name: 'slug',
            value: `/${collection}/${slug}/`
        });

        // Enabling markdown written into the YAML Frontmatter
        if(collection === "portfolio" || collection === "case-studies"){
            // console.log(JSON.stringify(node.frontmatter, null, 4))
            if("description" in node.frontmatter){
              let htmlresult = md.render(node.frontmatter.description);
              createNodeField({
                node,
                name: 'htmlDescription',
                value: htmlresult
              });
            }
            if("info" in node.frontmatter){
              let points = node.frontmatter.info.map((s) => {
                let htmltext = md.render(s);
                return(
                  {html: htmltext, link: htmltext.includes("href=") }
                )
              });
              createNodeField({
                node,
                name: 'htmlInfo',
                value: points
              });
            }
            
        }

    }
};


exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/portfolio-page.js`)
    const result = await graphql(`
    {
      portfolio: allMarkdownRemark(filter: {fields: {collection: {eq: "portfolio"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
      casestudies: allMarkdownRemark(filter: {fields: {collection: {eq: "case-studies"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
      notes: allMarkdownRemark(filter: {fields: {collection: {eq: "portfolio"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
    `)
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.portfolio.edges.forEach(({node}) =>{
        createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context:{
                slug: node.fields.slug,
                name: node.parent.name
            }
        });
    })
    result.data.casestudies.edges.forEach(({node}) =>{
        createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context:{
              slug: node.fields.slug,
              name: node.parent.name
            }
        });
    })
    // result.data.notes.edges.forEach(({node}) =>{
    //     createPage({
    //       path: node.fields.slug,
    //       component: blogPostTemplate
    //     });
    // })
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.path,
//       component: blogPostTemplate,
//       context: {} // additional data can be passed via context
//     })
//   })
}