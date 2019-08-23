module.exports = {
    siteMetadata: {
        title: 'Theia - Cloud and Desktop IDE',
        description: "Theia is an open-source cloud &nbsp; desktop IDE framework implemented in TypeScript."
    },
    plugins: [
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                defaultLayouts: {
                    default: require.resolve('./src/layouts/layout.js')
                }
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'docs',
                path: `${__dirname}/src/docs`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-external-links",
                    }
                ]
            }
        }
    ]
}
