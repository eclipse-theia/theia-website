/********************************************************************************
 * Copyright (C) 2021 EclipseSource and others.
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

import Nav from './Nav'
import React, { useState, useEffect } from 'react'
import Parser from 'rss-parser'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'

const StyledBlogs = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 3rem;
    @media(max-width: ${breakpoints.xmd}) {
        padding-top: 15rem;
    }
    &__logo-box {
        margin-bottom: 3rem;
    }
    &__logo {
        height: 3rem;
    }
}
heading-primary {
    margin-bottom: 1rem;
    font-size: 3.4rem;
}
.heading-secondary {
    font-size: 3rem;
    margin-bottom: 2rem;
}
.blog-list {
    padding-top: 2rem;
    background-color: #f8f8f8;
}
.blog-list .blog-post {
    color: #000;
    text-decoration: none;
}
.blog-post {
    display: block;
    margin-top: 2rem;
    margin-bottom: 2rem;
    background-color: #fff;
    padding: 3rem;
}
.blog-post:hover {
    background-color: #7ac4e7;
}
.blog-post:first-of-type {
    margin-top: 0;
}
.blog-post h4 {
    font-size: 2rem;
    margin: 1rem 0 0.5rem;
}
.post-summary {
    margin-bottom: 1rem;
}
.post-origin {
    font-size: 1.2rem;
    color: #767676;
}

`

const formatSummary = (summary) => {
    let formatted = summary.replace(/<(.|\n)*?>/g, ' ');
    if (formatted.length < 400) return formatted;
    formatted = formatted.substr(0, 400);
    return formatted.substr(0, formatted.lastIndexOf(' ')) + '...';
}

const Blogs = () => {
    const [feed, setFeed] = useState({ title: '', items: []});

    useEffect(() => {
        fetch('https://planeteclipse.org/planet/ecdtools.xml')
            .then(response => response.text())
            .then(str => {
                let parser = new Parser({
                    customFields: {
                        item: [
                          ['category', 'categories', {keepArray: true}],
                        ]
                    }
                });
                parser.parseString(str, (err,feed) => {
                    if (err) throw err;
                    const regex = /theia/gi;
                    feed.items = feed.items.filter(item => {
                        return item.categories.some(cat => regex.test(cat.$.term));
                    })
                    setFeed(feed);
                })
            });
    }, []);

    return (
        <StyledBlogs>
            <header className='header' role="banner">
                <div className="row">
                    <Nav shouldRenderLogo={true} />
                    <div className="header__text-box">
                        <h1 className="heading-primary">
                            Blogs
                        </h1>
                    </div>
                </div>
            </header>
            <section className='blog-list'>
                {
                    feed.items.map((post, i) => {
                        return (
                            <a key={i} className='blog-post row' href={ post.link }>
                                <p className='post-date'>{ new Date(post.pubDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }</p>
                                <h4 className='post-heading'>{ post.title }</h4>
                                <p className='post-summary'>{ formatSummary(post.summary) }</p>
                                <span className='post-origin'>Origin: { post.link }</span>
                            </a>
                        )
                    })
                }
            </section>
        </StyledBlogs>
    );
}
export default Blogs
