/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
import EclipseSourceLogo from '../resources/eclipse-source.svg'
import TypeFoxLogo from '../resources/typefox.png'

const StyledSupport = styled.div`
     .header {
        position: relative;
        @media(max-width: ${breakpoints.xmd}) {
            padding-top: 15rem;
        }
        &__logo-box {
            margin-bottom: 3rem;
        }
        &__logo {
            height: 3rem;
        }
        .btn {
            max-width: 20rem;
            @media(max-width: 385px) {
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
            @media(max-width: 800px) {
                &:not(:last-child) {
                    margin-right: 2rem;
                }
            }
        }
        &__buttons {
            display:flex;
            justify-content: space-evenly;
            align-items: center;
            text-align: center;
            padding: 3rem 10vw;
            @media(max-width: 800px){
                padding: 3rem 0;
            }
            
        }
    }
    h1 {
        margin-bottom: 1rem;
        font-size: 3.4rem;
    }
    .support {
        padding: 1rem 0;
    }

    .support__container {
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }
    .reverse {
        flex-direction: row-reverse;
        @media(max-width: ${breakpoints.md}) {
            flex-direction: column-reverse;
        }
    }
    .supporter {
        flex: 1;

        &:not(:last-child) {
            @media(max-width: ${breakpoints.md}) {
                margin: 0 0 4rem 0;
            }
        }

        & > div {
            text-align: center;
        }

        h3 {
            margin-top: 2rem;
        }

        & > p {
            margin: 0 auto;
            margin-bottom: 1rem;
            max-width: 45rem;
        }

        img {
            height: 7rem;
        }
    }
`

const supporters = [
    {
        img: EclipseSourceLogo,
        title: 'EclipseSource',
        text: 'Eclipse Description'
    },
    {
        img: TypeFoxLogo,
        title: 'TypeFox',
        text: 'TypeFox Description'
    }
]

const Support = () => (
    <StyledSupport>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary">
                    Community Support
                    </h1>
                    <p>
                        Eclipse Theia helps you efficiently develop and deliver multi-language Cloud & Desktop IDEs and tools with modern, state-of-the-art web technologies.
                    </p>
                    <div className="header__buttons">
                        <a className="btn" href="" rel="noopener">Button 1</a>
                        <a className="btn" href="" rel="noopener">Button 2</a>
                    </div>
                </div>
            </div>
        </header>
        <section className="support row" id="support">
            <h1 className="heading-primary">
                Professional Support
            </h1>
            <div className={`support__container${Math.random() < 0.5 ? ' reverse' : ''}`}>
                {
                    supporters.map(
                        ({title, img, text},i) => {
                            return(
                            <div key={`${i}_${title}`} className="supporter">
                                <div>
                                    <img src={img} alt={`${title} Logo`} />
                                    <h3 className="heading-tertiary">{title}</h3>
                                </div>
                                <p>{text}</p>
                            </div>)
                        }
                    )
                }
            </div>
        </section>
    </StyledSupport>
)

export default Support
