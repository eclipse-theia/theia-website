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
    width: 4rem;
    height: 4rem;
    background-size: contain;
    background-repeat: no-repeat;
}
.article {
    background-image: url(${Article});
    vertical-align: top;   
}
.video {
    background-image: url(${Video});
    vertical-align: bottom;
}
`

const categories = [
    {
        title: 'Release announcements',
        resources: [
            {
                title: 'Eclipse Theia 1.23 Release: News and Noteworthy',
                url: 'https://eclipsesource.com/blogs/2022/03/01/eclipse-theia-1-23-release-news-and-noteworthy/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia 1.22 Release: News and Noteworthy',
                url: 'https://eclipsesource.com/blogs/2022/02/07/eclipse-theia-1-22-release-news-and-noteworthy/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia 1.21 Release: News and Noteworthy',
                url: 'https://eclipsesource.com/blogs/2022/01/12/eclipse-theia-1-21-release-news-and-noteworthy/',
                type: 'article'
            }
        ]
    },
    {
        title: 'Introductions to Eclipse Theia',
        resources: [
            {
                title: 'Why Eclipse Theia',
                url: 'https://youtu.be/xs0haWTulrY',
                type: 'video'
            },
            {
                title: 'What is Eclipse Theia?',
                url: 'https://eclipsesource.com/blogs/2018/06/20/welcome-at-eclipse-theia/',
                type: 'article'
                
            },
            {
                title: 'Eclipse Theia - FAQ',
                url: 'https://eclipsesource.com/blogs/2019/12/24/eclipse-theia-ide-faq/',
                type: 'article'
            },
            {
                title: '5 Reasons to Adopt Eclipse Theia',
                url: 'https://blogs.eclipse.org/post/brian-king/5-reasons-adopt-eclipse-theia',
                type: 'video'
            },
            {
                title: 'The Eclipse Theia Architecture',
                url: 'https://youtu.be/SPO8pudgJak',
                type: 'video'
            },
            {
                title: 'How to adopt Eclipse Theia',
                url: 'https://youtu.be/KN2JUsFuEhU',
                type: 'video'
            },
            {
                title: 'Eclipse Theia Builds Momentum',
                url: 'https://blogs.eclipse.org/post/brian-king/eclipse-theia-builds-momentum',
                type: 'article'
            }
        ]
    },
    {
        title: 'Eclipse Theia Adopter Stories',
        resources: [
            {
                title: 'logi.CLOUD, a modern engineering platform for industrial automation',
                url: 'https://blogs.eclipse.org/post/paul-buck/theia-adopter-story-logicloud-modern-engineering-platform-industrial-automation',
                type: 'article'
            },
            {
                title: 'A web-based modeling tool based on Eclipse Theia',
                url: 'https://eclipsesource.com/blogs/2020/07/24/a-web-based-modeling-tool-based-on-eclipse-theia/',
                type: 'article'
            }
        ]
    },
    {
        title: 'Technical topics about Eclipse Theia',
        resources: [
            {
                title: 'VS Code extensions vs. Theia extensions',
                url: 'https://eclipsesource.com/blogs/2021/03/24/vs-code-extensions-vs-theia-extensions/',
                type: 'article'
            },
            {
                title: 'Theia Playwright - End-to-end testing Theia applications',
                url: 'https://eclipsesource.com/blogs/2022/02/23/theia-playwright-end-to-end-testing-theia-applications/',
                type: 'article'
            },
            {
                title: 'Internationalization in Eclipse Theia',
                url: 'https://ecdtools.eclipse.org/resources/blogs/2021-12-16-theia-i18n/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia - a platform for more than just code editors!',
                url: 'https://youtu.be/9c4hyPux5DY',
                type: 'video'
            }
        ]
    },
    {
        title: 'Topics related to Eclipse Theia',
        resources: [
            {
                title: 'Eclipse Theia compared to VS Code',
                url: 'https://eclipsesource.com/blogs/2019/12/06/the-eclipse-theia-ide-vs-vs-code/',
                type: 'article'
                
            },
            {
                title: 'Migrating Eclipse plugins to Eclipse Theia or VS Code',
                url: 'https://eclipsesource.com/blogs/2021/05/27/migrating-eclipse-plugins-to-eclipse-theia-or-vs-code/',
                type: 'article'
            },
            {
                title: 'Building diagram editors in Eclipse Theia with GLSP',
                url: 'https://eclipsesource.com/blogs/2021/03/03/building-diagram-editors-in-eclipse-theia-with-glsp/',
                type: 'article'
                
            },
            {
                title: 'Eclipse Theia compared to Eclipse Che',
                url: 'https://eclipsesource.com/blogs/2018/12/03/eclipse-che-vs-eclipse-theia/',
                type: 'article'
                
            },
            {
                title: 'How to build a tree editor in Eclips Theia',
                url: 'https://eclipsesource.com/blogs/2021/02/03/how-to-build-a-tree-editor-in-eclipse-theia/',
                type: 'article'
                
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
