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

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import styled from '@emotion/styled'
import { colors } from '../utils/variables'
import SearchIcon from '../resources/search.svg'

const StyledSearch = styled.div`
    --input-padding-right: ${props => props.$showKbd ? '80px' : '12px'};
    position: relative;
    width: 100%;
    margin-bottom: 2rem;

    .search-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 12px;
        width: 16px;
        height: 16px;
        pointer-events: none;
        opacity: 0.5;
    }

    .search-input {
        width: 100%;
        padding: 10px var(--input-padding-right) 10px 36px;
        font-size: 1.4rem;
        font-family: inherit;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: #fff;
        transition: border-color 0.2s, box-shadow 0.2s;
        text-overflow: ellipsis;
        overflow: hidden;

        &:focus {
            outline: none;
            border-color: ${colors.lightBlue};
            box-shadow: 0 0 0 3px rgba(0, 116, 217, 0.1);
        }

        &::placeholder {
            color: #999;
        }
    }

    .kbd-shortcut {
        position: absolute;
        right: 10px;
        display: flex;
        align-items: center;
        gap: 3px;
        pointer-events: none;
        color: #969faf;
        font-size: 1.2rem;

        kbd {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 20px;
            height: 20px;
            padding: 0 5px;
            font-family: inherit;
            font-size: 1.1rem;
            font-weight: 500;
            color: #969faf;
            background: #f5f6f7;
            border: 1px solid #d3d6db;
            border-radius: 3px;
        }
    }

    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
    }

    .search-result-item {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background-color 0.15s;

        &:last-child {
            border-bottom: none;
        }

        &:hover,
        &:focus,
        &.highlighted {
            background-color: #f0f7ff;
            outline: none;
        }

        .result-title {
            font-size: 1.4rem;
            font-weight: 500;
            color: ${colors.lightBlue};
            margin-bottom: 4px;
            transition: color 0.2s;

            mark {
                background-color: #fff3cd;
                padding: 0 2px;
                border-radius: 2px;
            }
        }

        &:hover .result-title,
        &:focus .result-title {
            color: ${colors.blue};
            text-decoration: underline;
        }

        .result-snippet {
            font-size: 1.2rem;
            color: #666;
            line-height: 1.4;

            mark {
                background-color: #fff3cd;
                padding: 0 2px;
                border-radius: 2px;
            }
        }
    }

    .no-results {
        padding: 16px;
        text-align: center;
        color: #888;
        font-size: 1.4rem;
    }
`

const highlightMatch = (text, query) => {
    if (!query || !text) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
    )
}

const cleanMarkdownBody = (body) => {
    return body
        .replace(/^---[\s\S]*?---/m, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_~>]/g, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const getMatchSnippet = (body, query, snippetLength = 120) => {
    if (!body || !query) return ''

    const cleanBody = cleanMarkdownBody(body).replace(/#/g, '')
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

const DocSearch = ({ className, inputRef: externalInputRef, isMobile = false }) => {
    const data = useStaticQuery(graphql`
        query SearchIndexQuery {
            localSearchDocs {
                index
                store
            }
        }
    `)

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [isMac, setIsMac] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef(null)
    const internalInputRef = useRef(null)
    const inputRef = externalInputRef || internalInputRef
    const resultsRef = useRef([])

    const index = data.localSearchDocs?.index
    const store = data.localSearchDocs?.store

    const results = useFlexSearch(query, index, store)

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        setHighlightedIndex(-1)
    }, [results])

    // Keyboard shortcut Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [inputRef])

    const handleInputChange = (e) => {
        const value = e.target.value
        setQuery(value)
        setIsOpen(value.length > 0)
    }

    const handleResultClick = useCallback((slug, body, title, searchQuery) => {
        setIsOpen(false)
        setQuery('')
        const anchor = findMatchAnchor(body, searchQuery, title)
        const url = anchor ? `${slug}#${anchor}` : slug
        navigate(url)
    }, [])

    const navigateToSearchPage = useCallback((searchQuery) => {
        setIsOpen(false)
        setQuery('')
        navigate(`/docs/search/?q=${encodeURIComponent(searchQuery)}`)
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
            inputRef.current?.blur()
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            if (highlightedIndex >= 0 && results[highlightedIndex]) {
                handleResultClick(results[highlightedIndex].slug, results[highlightedIndex].body, results[highlightedIndex].title, query)
            } else if (query.trim()) {
                navigateToSearchPage(query.trim())
            }
            return
        }

        if (!isOpen || results.length === 0) return

        switch (e.key) {
            case 'Tab':
                if (e.shiftKey) {
                    if (highlightedIndex > 0) {
                        e.preventDefault()
                        setHighlightedIndex(highlightedIndex - 1)
                        resultsRef.current[highlightedIndex - 1]?.focus()
                    } else if (highlightedIndex === 0) {
                        e.preventDefault()
                        setHighlightedIndex(-1)
                        inputRef.current?.focus()
                    }
                } else {
                    if (highlightedIndex < results.length - 1) {
                        e.preventDefault()
                        const nextIndex = highlightedIndex + 1
                        setHighlightedIndex(nextIndex)
                        resultsRef.current[nextIndex]?.focus()
                    }
                }
                break
            case 'ArrowDown':
                e.preventDefault()
                setHighlightedIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : 0
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : results.length - 1
                )
                break
            default:
                break
        }
    }

    const showResults = isOpen && query.length > 0

    const showKbd = !isMobile && !isFocused

    return (
        <StyledSearch className={className} ref={containerRef} $showKbd={showKbd}>
            <div className="search-container">
                <img className="search-icon" src={SearchIcon} alt="" aria-hidden="true" />
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        setIsFocused(true)
                        if (query.length > 0) setIsOpen(true)
                    }}
                    onBlur={(e) => {
                        if (!containerRef.current?.contains(e.relatedTarget)) {
                            setIsFocused(false)
                        }
                    }}
                    aria-label="Search documentation"
                    aria-expanded={showResults}
                    aria-haspopup="listbox"
                    aria-controls={showResults ? 'search-results-listbox' : undefined}
                    aria-activedescendant={highlightedIndex >= 0 ? `search-result-${highlightedIndex}` : undefined}
                    role="combobox"
                    aria-autocomplete="list"
                />
                {showKbd && (
                    <span className="kbd-shortcut">
                        <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
                        <span>+</span>
                        <kbd>K</kbd>
                    </span>
                )}
            </div>
            <div
                aria-live="polite"
                aria-atomic="true"
                className="visually-hidden"
                style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0
                }}
            >
                {showResults && results.length > 0
                    ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
                    : showResults && results.length === 0
                        ? 'No results found'
                        : ''}
            </div>
            {showResults && (
                <div className="search-results" role="listbox" id="search-results-listbox">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div
                                key={result.id}
                                id={`search-result-${index}`}
                                ref={(el) => (resultsRef.current[index] = el)}
                                className={`search-result-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                                onClick={() => handleResultClick(result.slug, result.body, result.title, query)}
                                onKeyDown={handleKeyDown}
                                role="option"
                                aria-selected={index === highlightedIndex}
                                tabIndex={0}
                            >
                                <div className="result-title">
                                    {highlightMatch(result.title, query)}
                                </div>
                                <div className="result-snippet">
                                    {highlightMatch(getMatchSnippet(result.body, query), query)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No results found for "{query}"</div>
                    )}
                </div>
            )}
        </StyledSearch>
    )
}

export default DocSearch
