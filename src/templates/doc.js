import React from 'react'
import DocsLayout from '../layouts/docs-layout'
import { graphql } from 'gatsby'
import { getMenuContext } from '../docs/menu'

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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

const DocTemplate = ({ data }) => {
    const slug = data.markdownRemark.fields.slug
    let context = getMenuContext(slug)
    if(slug === 'architecture') {
        context.prev = '/docs/'
        context.prevTitle = 'Introduction'
    }

    return (
        <DocsLayout canonical={`/docs/${data.markdownRemark.fields.slug}/`} context={context}>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </DocsLayout>
    )
}

export default DocTemplate
