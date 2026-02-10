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

import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import styled from '@emotion/styled'
import DocsLayout from '../../layouts/docs-layout'
import BaseHead from '../../layouts/basehead'
import { colors } from '../../utils/variables'

const StyledSearchResults = styled.div`
    .search-header {
        margin-bottom: 3rem;

        h1 {
            margin-bottom: 1rem;
        }

        .search-info {
            color: #666;
            font-size: 1.5rem;
        }
    }

    .search-form {
        margin-bottom: 3rem;

        input {
            width: 100%;
            max-width: 50rem;
            padding: 12px 16px;
            font-size: 1.6rem;
            font-family: inherit;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: border-color 0.2s, box-shadow 0.2s;

            &:focus {
                outline: none;
                border-color: ${colors.lightBlue};
                box-shadow: 0 0 0 3px rgba(0, 116, 217, 0.1);
            }
        }
    }

    .results-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .result-item {
        padding: 2rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        border: 1px solid #eee;
        transition: border-color 0.2s, background-color 0.2s;

        &:hover,
        &:focus-within {
            background: #f0f7ff;
        }

        a {
            text-decoration: none;
            color: inherit;
            display: block;
        }

        .result-title {
            font-size: 1.8rem;
            font-weight: 500;
            color: ${colors.lightBlue};
            margin-bottom: 0.8rem;
            transition: color 0.2s;

            mark {
                background-color: #fff3cd;
                padding: 0 2px;
                border-radius: 2px;
            }
        }

        &:hover .result-title,
        &:focus-within .result-title {
            color: ${colors.blue};
            text-decoration: underline;
        }

        a:focus {
            outline: none;
        }

        .result-snippet {
            font-size: 1.4rem;
            color: #555;
            line-height: 1.6;

            mark {
                background-color: #fff3cd;
                padding: 0 2px;
                border-radius: 2px;
            }
        }
    }

    .no-results {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;

        h2 {
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.5rem;
        }
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;

        p {
            font-size: 1.5rem;
        }
    }
`

const cleanMarkdownBody = (body) => {
    return body
        .replace(/^---[\s\S]*?---/m, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#*_~>]/g, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const getMatchSnippet = (body, query, snippetLength = 200) => {
    if (!body || !query) return ''

    const cleanBody = cleanMarkdownBody(body)
    const lowerBody = cleanBody.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const matchIndex = lowerBody.indexOf(lowerQuery)

    if (matchIndex === -1) {
        return cleanBody.slice(0, snippetLength) + (cleanBody.length > snippetLength ? '...' : '')
    }

    const halfLength = Math.floor((snippetLength - query.length) / 2)
    let start = Math.max(0, matchIndex - halfLength)
    let end = Math.min(cleanBody.length, matchIndex + query.length + halfLength)

    if (start > 0) {
        const spaceIndex = cleanBody.indexOf(' ', start)
        if (spaceIndex !== -1 && spaceIndex < matchIndex) {
            start = spaceIndex + 1
        }
    }
    if (end < cleanBody.length) {
        const spaceIndex = cleanBody.lastIndexOf(' ', end)
        if (spaceIndex > matchIndex + query.length) {
            end = spaceIndex
        }
    }

    let snippet = cleanBody.slice(start, end)
    if (start > 0) snippet = '...' + snippet
    if (end < cleanBody.length) snippet = snippet + '...'

    return snippet
}

const highlightMatch = (text, query) => {
    if (!query || !text) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
    )
}

const headingToAnchor = (heading) => {
    return heading
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

const findMatchAnchor = (body, query, title) => {
    if (!body || !query) return null

    // If the query matches the title, don't jump to a section
    if (title && title.toLowerCase().includes(query.toLowerCase())) {
        return null
    }

    const bodyWithoutFrontmatter = body.replace(/^---[\s\S]*?---/m, '')
    const lowerBody = bodyWithoutFrontmatter.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const matchIndex = lowerBody.indexOf(lowerQuery)

    if (matchIndex === -1) return null

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

const getResultUrl = (slug, body, title, query) => {
    const anchor = findMatchAnchor(body, query, title)
    return anchor ? `${slug}#${anchor}` : slug
}

export const Head = ({ location }) => {
    const params = new URLSearchParams(location.search)
    const query = params.get('q') || ''
    return <BaseHead title={query ? `Search: ${query}` : 'Search Documentation'} />
}

const SearchPage = ({ location }) => {
    const data = useStaticQuery(graphql`
        query SearchPageQuery {
            localSearchDocs {
                index
                store
            }
        }
    `)

    const params = new URLSearchParams(location.search)
    const initialQuery = params.get('q') || ''

    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [inputValue, setInputValue] = useState(initialQuery)
    const inputRef = useRef(null)

    const index = data.localSearchDocs?.index
    const store = data.localSearchDocs?.store

    const results = useFlexSearch(searchQuery, index, store)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const q = params.get('q') || ''
        setSearchQuery(q)
        setInputValue(q)
    }, [location.search])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchQuery(inputValue)
        if (typeof window !== 'undefined') {
            const newUrl = inputValue
                ? `/docs/search/?q=${encodeURIComponent(inputValue)}`
                : '/docs/search/'
            window.history.pushState({}, '', newUrl)
        }
    }

    return (
        <DocsLayout canonical="/docs/search/" showArrows={false}>
            <StyledSearchResults>
                <div className="search-header">
                    <h1>Search Documentation</h1>
                    {searchQuery && (
                        <p className="search-info" role="status" aria-live="polite">
                            {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </p>
                    )}
                </div>

                <form className="search-form" onSubmit={handleSubmit} role="search">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        aria-label="Search documentation"
                    />
                </form>

                {searchQuery ? (
                    results.length > 0 ? (
                        <ul className="results-list">
                            {results.map((result) => (
                                <li key={result.id} className="result-item">
                                    <Link to={getResultUrl(result.slug, result.body, result.title, searchQuery)}>
                                        <div className="result-title">
                                            {highlightMatch(result.title, searchQuery)}
                                        </div>
                                        <div className="result-snippet">
                                            {highlightMatch(getMatchSnippet(result.body, searchQuery), searchQuery)}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-results">
                            <h2>No results found</h2>
                            <p>Try different keywords or check your spelling.</p>
                        </div>
                    )
                ) : (
                    <div className="empty-state">
                        <p>Enter a search term to find documentation.</p>
                    </div>
                )}
            </StyledSearchResults>
        </DocsLayout>
    )
}

export default SearchPage
