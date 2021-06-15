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

const StyledPromo = styled.div`
    display: flex;
    border: 2px solid #ebebeb;

    &:nth-of-type(2n) {
        flex-direction: row-reverse;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }

    @media(max-width: ${breakpoints.md}) {
        flex-direction: column;
        max-width: 60rem;
        margin: 0 auto;
    }

    &:not(:last-child) {
        margin-bottom: 10rem;
    }

    .promo__text {
        width: 50%;
        padding: 9rem 5rem;

        @media(max-width: ${breakpoints.md}) {
            width: 100%;
            max-width: 60rem;
        }
    }

    .promo__media {
        position: relative;
        width: 50%;
        z-index: -1000;

        @media(max-width: ${breakpoints.md}) {
            width: 100%;
            max-width: 60rem;
        }

        &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #8c9bae;
            z-index: 1000;
            opacity: .1;
        }
    }

    .promo__video {
        width: 100%;
    }
`

const Promo = ({ 
    title, 
    para, 
    videoSrc 
}) => (
    <StyledPromo className="promo">
        <div className="promo__text">
            <h3 className="heading-tertiary">{title}</h3>
            {para}
        </div>
        <div className="promo__media">
            <video autoPlay loop muted playsInline className="promo__video">
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    </StyledPromo>
)
export default Promo