import React from 'react'
import DocsLayout from '../layouts/docs-layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const query = graphql`
  query {
        mdx(frontmatter: {slug: {eq: "index"}}) {
            frontmatter {
                title
                slug
            }
            body
        }
    }
`

const Docs = ({ data: { mdx: doc } }) => (
    <DocsLayout canonical='https://theia-ide.org/docs/'>
        <h1>{doc.title}</h1>
        <MDXRenderer>{doc.body}</MDXRenderer>
    </DocsLayout>
)

export default Docs