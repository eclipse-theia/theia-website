/********************************************************************************
 * Copyright (C) 2026 EclipseSource and others.
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

/**
 * Strips the Table of Contents section from raw markdown.
 * The TOC contains markdown links that duplicate heading text,
 * causing false first-matches in search and snippets.
 */
export const stripTocSection = (markdown) => {
    const tocHeadingRegex = /^#{1,6}\s+Table of Contents\s*$/im
    const tocMatch = tocHeadingRegex.exec(markdown)
    if (!tocMatch) return markdown

    // Find the next heading after the TOC to determine where the TOC ends
    const afterToc = markdown.slice(tocMatch.index + tocMatch[0].length)
    const nextHeadingMatch = /^#{1,6}\s+/m.exec(afterToc)
    const tocEnd = nextHeadingMatch
        ? tocMatch.index + tocMatch[0].length + nextHeadingMatch.index
        : markdown.length

    return markdown.slice(0, tocMatch.index) + markdown.slice(tocEnd)
}

export const headingToAnchor = (heading) => {
    return heading
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

export const findMatchAnchor = (body, query, title) => {
    if (!body || !query) return null

    // If the query matches the title, don't jump to a section
    if (title && title.toLowerCase().includes(query.toLowerCase())) {
        return null
    }

    const bodyWithoutFrontmatter = body.replace(/^---[\s\S]*?---/m, '')
    const lowerQuery = query.toLowerCase()

    // Extract all headings with their positions
    const headingRegex = /^#{1,6}\s+(.+)$/gm
    const headings = []
    let match

    while ((match = headingRegex.exec(bodyWithoutFrontmatter)) !== null) {
        headings.push({
            text: match[1].trim(),
            index: match.index
        })
    }

    if (headings.length === 0) return null

    // Priority 1: If the query matches a heading directly, use that heading.
    // This avoids landing on the TOC when the actual section heading exists.
    for (const heading of headings) {
        if (heading.text.toLowerCase().includes(lowerQuery)) {
            return headingToAnchor(heading.text)
        }
    }

    // Priority 2: Find match in body, skipping the TOC section.
    // TOC sections contain markdown links like "- [Text](#anchor)" that
    // duplicate heading text and cause false first-matches.
    const lowerBody = bodyWithoutFrontmatter.toLowerCase()

    let tocStart = -1
    let tocEnd = -1
    for (let i = 0; i < headings.length; i++) {
        if (headings[i].text.toLowerCase() === 'table of contents') {
            tocStart = headings[i].index
            tocEnd = i + 1 < headings.length ? headings[i + 1].index : bodyWithoutFrontmatter.length
            break
        }
    }

    // Find the first match that's not inside the TOC section
    let matchIndex = -1
    let searchFrom = 0
    while (searchFrom < lowerBody.length) {
        const idx = lowerBody.indexOf(lowerQuery, searchFrom)
        if (idx === -1) break
        if (tocStart === -1 || idx < tocStart || idx >= tocEnd) {
            matchIndex = idx
            break
        }
        searchFrom = idx + 1
    }

    if (matchIndex === -1) return null

    // Find the closest heading before the match
    let closestHeading = null
    for (const heading of headings) {
        if (heading.index <= matchIndex) {
            closestHeading = heading
        } else {
            break
        }
    }

    if (!closestHeading) return null

    return headingToAnchor(closestHeading.text)
}
