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

import Background from '../../resources/background-image.png'
import DocImage from '../DocImage'
import Nav from '../Nav'
import React from 'react'
import TheiaLogoDark from '../../resources/theia-logo-dark.svg'
import { breakpoints } from '../../utils/variables'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
     .header {
        position: relative;
        background-image: url(${Background});
        background-size: cover;
        background-repeat: no-repeat;
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
        h1 {
            margin-bottom: 3rem;
            font-size: 3.4rem;
        }
        .btn {
            &:not(:last-child) {
                margin-right: 2.5rem;
            }
            @media(max-width: 385px) {
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
            @media(max-width: 410px) {
                &:not(:last-child) {
                    margin-bottom: 2rem;
                }
            }
        }
        &__github-details {
            display: flex;
            justify-content: flex-end;
            margin: 5rem 0 0;
        }
        iframe {
            height: 2.5rem;
            width: 11rem;
        }
        .heading-tertiary {
            padding-bottom: 40px;
        }
    }
`

const Header = () => (
    <StyledHeader>
        <header className='header' role="banner">
            <div className="row">
                <Nav />
                <div className="header__text-box">
                    <div className="header__logo-box">
                        <img className="header__logo" src={TheiaLogoDark} alt="theia logo" />
                    </div>
                    <h1 className="heading-primary">
                    An Open, Flexible and Extensible Cloud & Desktop IDE Platform
                </h1>
                    <h2 className="heading-tertiary" style={{ fontSize: '2.2rem' }}>
                    Eclipse Theia helps you efficiently develop and deliver multi-language Cloud & Desktop IDEs and tools with modern, state-of-the-art web technologies.
                        <br/>
                        <a href="https://dev.to/svenefftinge/theia-1-0-finally-a-good-browser-ide-3ok0" rel="noopener noreferrer">Learn about the 1.0 Release!</a>
                    </h2>

                    <a className="btn" href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    <a className="btn btn--cta" href="/docs/blueprint_download/" rel="noopener">Try now &nbsp;&nbsp;&rarr;</a>
                </div>
                <div className="header__github-details">
                    <iframe title="Github Star Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=star&count=true" frameBorder={0} scrolling={0} />
                    <iframe title="Github Fork Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=fork&count=true" frameBorder={0} scrolling={0} />
                </div>
            </div>

        </header>
    </StyledHeader>
)

export default Header
