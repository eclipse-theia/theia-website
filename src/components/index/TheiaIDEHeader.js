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

import React from 'react'
import TheiaIDELogo from '../../resources/TheiaIDE.svg'
import TheiaIDEScreenshot from '../../resources/theia-screenshot.png'
import { breakpoints } from '../../utils/variables'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
    .header {
        position: relative;
        background-size: cover;
        background-color: #0B5394;
        background-repeat: no-repeat;
        padding-top: 3rem;
        padding-bottom: 3rem;
        color: white;
        border-bottom: 10px solid #f8f8f8;
        
        @media(max-width: ${breakpoints.xmd}) {
            padding-top: 5rem;
        }

        &__logo-box {
            margin-bottom: 3rem;
        }

        &__logo {
            height: 4rem;
        }

        .banner__image {
            height: 1rem;
        }

        &__banner {
            padding: 15px;
            text-align: center;
        }

        h1 {
            margin-bottom: 1rem;
            font-size: 3.4rem;
            text-align: center;
        }

        h2 {
            font-size: 2.1rem;
            text-align: center;
            margin: 1rem 0;
        }

        .btn {
            max-width: 21rem;
            margin: 0.5rem 1rem; /* Reduced vertical margin */
            @media(max-width: 385px) {
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
        }

        &__github-details {
            position: absolute;
            top: 10rem;
            right: 2rem;
        }

        &__buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 4rem;

            @media(max-width: 800px) {
                padding: 3rem 0;
                flex-direction: column; /* Stack buttons on small screens */
            }
        }

        iframe {
            height: 2.5rem;
            width: 12rem;
        }

        .wrap {
            display: block;
            margin: 0 auto;
            width: 100%;
            max-width: 33.5rem;
            text-align: center;
            padding: 1rem 0;

            @media(max-width: 800px) {
                max-width: 90%;
            }
        }

        .logo {
            display: block;
            margin: 1rem auto;
            width: 100%;
            max-width: 33.5rem;
            text-align: center;
            scale: 1.3;

            @media(max-width: 800px) {
                max-width: 90%;
            }
        }
        #theiaide::before {
           content: "";
            display: block;
            height: 1rem;
            margin-top: -1rem;
        }
    }
}
`;

const TheiaIDEHeader = () => (
    <StyledHeader>
        <div className="header">
            <div id="theiaide" className="row">
                <img className="logo" src={TheiaIDELogo} style={{ height: '4rem' }} alt="The Theia IDE Logo" />
                <h1>The Eclipse Theia IDE</h1>
                <img className="wrap" src={TheiaIDEScreenshot} alt="Theia IDE" />
                <h2>
                    A modern and open IDE for cloud and desktop. The Theia IDE is based on the Theia platform.
                </h2>

                <div className="header__buttons">
                    <a className="btn btn--cta" href="#theiaidedownload" rel="noopener">Download &nbsp;&nbsp;&rarr;</a>
                    <a className="btn btn--cta" href="https://try.theia-cloud.io/" rel="noopener">Try online</a>
                    <a className="btn" href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            </div>
        </div>
    </StyledHeader>
);

export default TheiaIDEHeader;

