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
