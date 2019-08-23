const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
        query {
            allMdx {
                nodes {
                    frontmatter {
                        slug
                    }
                }
            }
        }
  `)

    if (result.errors) {
        reporter.panic('failed to create docs', result.errors)
    }

    const docs = result.data.allMdx.nodes

    console.log(docs)

    docs.forEach(doc => {
        actions.createPage({
            path: `/docs/${doc.frontmatter.slug}`,
            component: require.resolve('./src/templates/doc.js'),
            context: {
                slug: doc.frontmatter.slug,
            },
        })
    })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  })
}
