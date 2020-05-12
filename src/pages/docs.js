import React from 'react'
import DocsLayout from '../layouts/docs-layout'
import { graphql } from 'gatsby'

export const query = graphql`
    query {
        markdownRemark(fields: {slug: {eq: "index"}}) {
            frontmatter {
                title
            }
            html
            fields {
                slug
            }
        }
    }
`

const Docs = ({ data }) => {
    const context =  { next: "/docs/architecture/", nextTitle: "Architecture Overview" }

    return (
        <DocsLayout canonical={`/docs/`} context={context}>
            <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}/>
        </DocsLayout>
    )
}

export default Docs
