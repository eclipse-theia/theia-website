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

import styled from '@emotion/styled'
import { breakpoints } from '../../utils/variables'
import TheiaLogoEdited from '../../resources/theia-logo-edited.svg'


const StyledBanner = styled.div`
    .banner {
        margin-top: 5rem;
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
            margin-top: 5rem;
        }

        p {
            margin-bottom: 2rem;
        }

        li {
            margin-left: 2rem;
        }

        strong {
            font-weight: 500;
        }

        img {
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
        }

        div {
            width: 50%;
            max-width: 45rem;
            margin: 0 auto;

            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                img {
                    margin: 0 auto 5rem;
                    height: 18rem;
                    transform: none;
                }
            }
        }

        h3 {
            margin-bottom: 2rem;
            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
                margin: 0 auto;
                margin-bottom: 2rem;
                text-align: center;
            }
        }
    }
`

const Banner = () => (
    <StyledBanner>
        <section className="row banner">
            <div>
                <img src={TheiaLogoEdited} alt="Theia Logo" />
            </div>
            <div>
                <h3 className="heading-tertiary">Theia versus VS Code</h3>
                <p>We believe <strong>VS Code is an excellent product</strong>. That is why Theia embraces many of the design decisions and even directly supports VS Code extensions.</p>
                <div style={{ width: '100%', margin: '2rem 0', maxWidth: 'auto' }}>The most significant differences are:
                                <ul>
                        <li><strong>Theia's architecture is more modular</strong> and allows for way more customizations,</li>
                        <li>Theia is <strong>designed from the ground to run on Desktop and Cloud</strong>, and</li>
                        <li>Theia is developed under a <strong>vendor-neutral Open-Source Foundation</strong>.</li>
                    </ul>
                </div>
            </div>
        </section>
    </StyledBanner>
)

export default Banner