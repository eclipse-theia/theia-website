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
import TheiaConLogo from '../../resources/theiacon-logo.svg'
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
            height: 15rem;
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

const TheiaIDEHeader = () => (
    <StyledHeader>
        <header className='header' role="banner">
            <div className="row">
                <h1 className="heading-primary">
                    The Eclipse Theia IDE
                </h1>
                <h2 style={{ fontSize: '2.1rem' }}>
                A modern and open IDE for cloud and desktop. The Theia IDE is based on the Theia platform.
                </h2>
                <div className="header__buttons">
                    <a className="btn btn--cta" href="/docs/blueprint_download/" rel="noopener">Download &nbsp;&nbsp;&rarr;</a>
                    <a className="btn btn--cta" href="https://try.theia-cloud.io/" rel="noopener">Try online &nbsp;&nbsp;&rarr;</a>
                    <a className="btn" href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                 </div>
                
                 <center><h2 style={{ fontSize: '1.5rem' }}>
                 Please note that the Theia IDE is currently rebranded from its original name “Theia Blueprint”.
                </h2></center>
                </div>
        </header>
    </StyledHeader>
)

export default TheiaIDEHeader
