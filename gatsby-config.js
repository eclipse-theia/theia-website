module.exports = {
    pathPrefix: process.env.PATH_PREFIX,
    siteMetadata: {
        // Site-level fallback only. Pages set their own title and description via their
        // Head export; keeping this neutral stops new pages from silently inheriting the
        // Theia Platform page's copy.
        title: 'Eclipse Theia – Open-Source IDEs, Tools and AI for Cloud & Desktop',
        description: "Eclipse Theia is an open-source, vendor-neutral project for building custom cloud and desktop IDEs and tools, including Theia AI and the ready-to-use Theia IDE."
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
        },
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'docs',
                engine: 'flexsearch',
                engineOptions: {
                    tokenize: 'forward'
                },
                query: `
                    {
                        allMarkdownRemark {
                            nodes {
                                id
                                frontmatter {
                                    title
                                }
                                fields {
                                    slug
                                }
                                rawMarkdownBody
                            }
                        }
                    }
                `,
                ref: 'id',
                index: ['title', 'body'],
                store: ['id', 'slug', 'title', 'body'],
                normalizer: ({ data }) =>
                    data.allMarkdownRemark.nodes.map((node) => ({
                        id: node.id,
                        slug: `/docs/${node.fields.slug}/`,
                        title: node.frontmatter.title,
                        body: node.rawMarkdownBody,
                    })),
            },
        }
    ]
}
