module.exports = {
    siteMetadata: {
        title: 'Theia - Cloud and Desktop IDE Platform',
        description: "Theia is an open-source cloud &nbsp; desktop IDE framework implemented in TypeScript."
    },
    plugins: [
        'gatsby-plugin-emotion',
        'gatsby-plugin-react-helmet',
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
                    'gatsby-remark-autolink-headers',
                    "gatsby-remark-external-links",
                    "gatsby-remark-prismjs"
                ]
            }
        }
    ]
}
