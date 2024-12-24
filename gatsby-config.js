module.exports = {
    pathPrefix: process.env.PATH_PREFIX,
    siteMetadata: {
        title: 'Theia Platform – Open, Flexible, and Extensible Framework for Building Cloud & Desktop IDEs and Tools',
        description: "Discover the Theia Platform, an open-source framework for building custom and tailored cloud and desktop IDEs and tools using modern web technologies without forking. Fully extensible and vendor-neutral, Theia enables the development of tailored, white-labeled, and domain-specific tools, supporting Language Server Protocol (LSP), VS Code extensions, and AI integration."
    },
    plugins: [
        'gatsby-plugin-emotion',
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
                    "gatsby-remark-prismjs",
                    "gatsby-plugin-catch-links"
                ]
            }
        }
    ]
}
