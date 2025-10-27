/********************************************************************************
 * Copyright (C) 2024 EclipseSource and others.
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
import { breakpoints } from '../utils/variables'

const StyledSponsoringHint = styled.div`
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
    padding: 2rem 0;
    margin: 2rem 0;
    border-left: 4px solid #2a87ca;

    .sponsoring-hint {
        &__container {
            max-width: 120rem;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;

            @media (max-width: ${breakpoints.md}) {
                flex-direction: column;
                text-align: center;
            }
        }

        &__text {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1rem;

            @media (max-width: ${breakpoints.md}) {
                flex-direction: column;
                gap: 0.5rem;
            }
        }

        &__icon {
            font-size: 2rem;
            flex-shrink: 0;
        }

        &__message {
            font-size: 1.6rem;
            color: #1a5490;
            margin: 0;
            font-weight: 500;

            @media (max-width: ${breakpoints.sm}) {
                font-size: 1.4rem;
            }
        }

        &__button {
            display: inline-block;
            background: #2a87ca;
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 10rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            white-space: nowrap;
            flex-shrink: 0;

            &:hover {
                background: #1a5490;
                transform: translateY(-2px);
                color: white;
                text-decoration: none;
            }

            &:active {
                transform: translateY(0);
            }

            @media (max-width: ${breakpoints.sm}) {
                font-size: 1.3rem;
                padding: 0.8rem 2rem;
            }
        }
    }
`

const SponsoringHint = () => {
    return (
        <StyledSponsoringHint>
            <div className="sponsoring-hint__container">
                <div className="sponsoring-hint__text">
                    <span className="sponsoring-hint__icon" role="img" aria-label="heart">💙</span>
                    <p className="sponsoring-hint__message">
                        Support the evolution of Theia — become a sponsor.
                    </p>
                </div>
                <a href="/support#sponsoring" className="sponsoring-hint__button">
                    Learn More →
                </a>
            </div>
        </StyledSponsoringHint>
    )
}

export default SponsoringHint
