const path = require('path')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        fallback: {
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            timers: require.resolve("timers-browserify"),
            url: require.resolve("url/"),
        },
      },
    });
  };

exports.onCreatePage = async ({ page, reporter, actions }) => {
    if (page.path === '/' || page.path === '/theia-platform/' || page.path ==='/theia-ai/') {
        try {
            const response = await fetch(
                'https://api.eclipse.org/adopters/projects/ecd.theia', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                })
            const responseJson = await response.json()
            const adopters = responseJson[0].adopters
            actions.deletePage(page)
            actions.createPage({
                ...page,
                context: {
                    ...page.context,
                    adopters,
                },
            })
        } catch (error) {
            reporter.panic(
                'Failed to fetch Theia Adopters from "api.eclipse.org"',
                error
            )
        }
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