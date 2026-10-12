/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import React from 'react'
import DocsLayout from '../layouts/docs-layout'
import { graphql } from 'gatsby'
import { getMenuContext } from '../docs/menu'
import BaseHead from '../layouts/basehead'
import LastUpdated from '../components/LastUpdated'

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        frontmatter {
            title
            canonical
            description
            faqSchema
        }
        html
        fields {
            slug
            lastModified
        }
    }
  }
`

const stripTags = html => html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * Builds schema.org FAQPage entries from the rendered markdown. Each `##` heading
 * becomes a question; the text up to the `<details>` block (the short answer that is
 * visible without expanding) becomes the accepted answer.
 */
const buildFaqEntries = html => {
    const entries = []
    const sections = /<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/g
    let section
    while ((section = sections.exec(html)) !== null) {
        const question = stripTags(section[1])
        const answer = stripTags(section[2].split('<details')[0])
        if (question && answer) {
            entries.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": { "@type": "Answer", "text": answer }
            })
        }
    }
    return entries
}

export const Head = ({ data }) => {
    const { canonical, title, description, faqSchema } = data.markdownRemark.frontmatter
    const faqEntries = faqSchema ? buildFaqEntries(data.markdownRemark.html) : []
    return (
        <>
            <BaseHead
                canonical={canonical || `/docs/${data.markdownRemark.fields.slug}/`}
                title={title}
                description={description}
            />
            {faqEntries.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqEntries
                        })
                    }}
                />
            )}
        </>
    )
}

const DocTemplate = ({ data }) => {
    const slug = data.markdownRemark.fields.slug
    const canonical = data.markdownRemark.frontmatter.canonical
    let context = getMenuContext(slug)
    if (slug === 'architecture') {
        context.prev = '/docs/'
        context.prevTitle = 'Introduction'
    }

    return (
        <DocsLayout canonical={canonical || `/docs/${data.markdownRemark.fields.slug}/`} context={context}>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            <LastUpdated date={data.markdownRemark.fields.lastModified} />
        </DocsLayout>
    )
}

export default DocTemplate
