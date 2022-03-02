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
import React from 'react'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'
import Article from '../resources/article.svg'
import Video from '../resources/video.svg'


const StyledResources = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 3rem;
    border-bottom: 10px solid #f8f8f8;
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
.category {
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.category:not(:last-child) {
    border-bottom: 1px solid #ccc;
}
.resources {
    padding: 3rem 0;
}
.icon {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    background-size: contain;
    vertical-align: sub;
}
.article {
    background-image: url(${Article});    
}
.video {
    background-image: url(${Video});
}
`

const categories = [
    {
        title: 'Category 1',
        resources: [
            {
                title: 'Article 1 about topic 1',
                url: 'http://article.com',
                type: 'article'
                
            },
            {
                title: 'Article 2 about topic 1',
                url: 'http://article2.com',
                type: 'article'
            }
        ]
    },
    {
        title: 'Category 2',
        resources: [
            {
                title: 'Video 1 about topic 2',
                url: 'http://article.com',
                type: 'video'
                
            },
            {
                title: 'Article 3 about topic 2',
                url: 'http://article3.com',
                type: 'article'
            }
        ]
    },
    {
        title: 'Category 3',
        resources: [
            {
                title: 'Article 3 about topic 3',
                url: 'http://article3.com',
                type: 'article'
            },
            {
                title: 'Video 1 about topic 3',
                url: 'http://article.com',
                type: 'video'
                
            }
        ]
    },
]

const Resources = () => (
    <StyledResources>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary">
                    Other resources
                    </h1>
                </div>
            </div>
        </header>
        {categories.map(({title, resources}, i) => {
            return (
                <section key={i} className="category row" id="resources">
                    <h2 className="heading-secondary">{title}</h2>
                    {resources.map(
                        ({title, url, type},i) => {
                            return(
                            <div key={`${i}_${title}`} className="resource">
                                <div>
                                    <h3 className="heading-tertiary">
                                        <span className={`icon ${type}`}></span>&nbsp;
                                        <a href={url}>{title}</a>
                                    </h3>
                                </div>
                            </div>)
                        }
                    )}
                </section>
            )}
        )}
    </StyledResources>
)
export default Resources
