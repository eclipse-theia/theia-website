import { graphql, useStaticQuery } from 'gatsby'

const useDocs = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx {
                nodes {
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    `)

    return data.allMdx.nodes.map(doc => ({
        title: doc.frontmatter.title,
        slug: doc.frontmatter.slug
    }))
}

export default useDocs