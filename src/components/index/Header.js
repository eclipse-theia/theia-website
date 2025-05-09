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
import Nav from '../Nav'
import React from 'react'
import CommonNews from './CommonNews'
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
        .banner__image {
            height: auto;
            width: 45rem; /* Default width */

            @media (max-width: 800px) {
                width: 35rem; /* Adjust for medium screens */
            }

            @media (max-width: 500px) {
                width: 25rem; /* Further reduce width for smaller screens */
            }

            @media (max-width: 385px) {
                width:20rem; /* Even smaller for very narrow screens */
            }
        }
        &__banner {
            padding: 15px;
            text-align: center;
        }
        h1 {
            margin-bottom: 1rem;
            font-size: 3.4rem;
        }
        .btn {
            max-width: 21rem;
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
        &__github-details {
            position: absolute;
            top: 10rem;
            right: 2rem;
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
        iframe {
            height: 2.5rem;
            width: 12rem;
        }
    }
`

const Header = () => (
    <StyledHeader>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__github-details">
                    <iframe title="Github Star Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=star&count=true" frameBorder={0} scrolling={0} />
                    <iframe title="Github Fork Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=fork&count=true" frameBorder={0} scrolling={0} />
                </div>
                <center>
                <h1 className="heading-primary">
                    Welcome to Eclipse Theia
                </h1>
                </center>
                <div className="header__banner">
                <h2 style={{ fontSize: '2.1rem' }}>
                    <p>The <a href="#theiaide"><b>Theia IDE</b></a> is a modern IDE for cloud and desktop built on the Theia Platform.</p>
                    <p>The <a href="theia-platform/">Theia Platform</a> is a framework for building custom, tailored cloud & desktop IDEs.</p>
                
                </h2>
                </div>
                <div className="header__buttons">
                        <a className="btn btn--cta" href="https://try.theia-cloud.io/" target="_blank" rel="noopener noreferrer">Try Theia IDE online</a>
                        <a style ={{backgroundColor: "#0B5394", borderColor: "#0B5394"}} className="btn btn--cta" href="#theiaide" rel="noopener">Get Theia IDE for desktop</a>
                        <a className="btn" href="theia-platform/">Explore the Theia Platform</a>
                 </div>
                <CommonNews/>
                </div>
        </header>
    </StyledHeader>
)

export default Header
