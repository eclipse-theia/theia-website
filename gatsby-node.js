const path = require('path')

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
} 

exports.createPages = async ({ graphql, reporter, actions }) => {
    const { createPage } = actions
    const DocsTemplate = path.resolve('./src/templates/doc.js')

    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    if(result.errors) {
        reporter.panic("Failed to create Docs.", result.errors)
    }

    const docs = result.data.allMarkdownRemark.edges

    docs.forEach((doc) => {
        createPage({
            component: DocsTemplate,
            path: `/docs/${doc.node.fields.slug}`,
            context: {
                slug: doc.node.fields.slug
            }
        })
    })
}