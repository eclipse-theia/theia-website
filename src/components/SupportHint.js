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

const StyledSupportHint = styled.section`
    background: #f8f9ff;
    padding: 4rem 0;
    margin: 2rem 0;
    border-top: 1px solid #e6f2ff;
    border-bottom: 1px solid #e6f2ff;

    .support-hint {
        &__container {
            max-width: 120rem;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }

        &__box {
            background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
            border: 2px solid #2a87ca;
            border-radius: 12px;
            padding: 3rem 4rem;
            margin: 0 auto;
            max-width: 80rem;
            box-shadow: 0 8px 20px rgba(42, 135, 202, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 24px rgba(42, 135, 202, 0.12);
            }

            @media (max-width: ${breakpoints.md}) {
                padding: 2rem 1.5rem;
                margin: 0 1rem;
            }
        }

        &__title {
            font-size: 2.4rem;
            font-weight: 600;
            color: #1a5490;
            margin: 0 0 1.2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            @media (max-width: ${breakpoints.sm}) {
                font-size: 2rem;
                flex-direction: column;
                gap: 0.5rem;
            }
        }

        &__description {
            font-size: 1.6rem;
            color: #2a5a7a;
            margin: 0 0 2rem 0;
            line-height: 1.5;

            @media (max-width: ${breakpoints.sm}) {
                font-size: 1.4rem;
            }
        }

        &__button {
            display: inline-block;
            background: linear-gradient(135deg, #2a87ca 0%, #1a5490 100%);
            color: white;
            padding: 1.2rem 3rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.6rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(42, 135, 202, 0.3);

            &:hover {
                background: linear-gradient(135deg, #1a5490 0%, #0d2d4a 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(42, 135, 202, 0.4);
                color: white;
                text-decoration: none;
            }

            &:active {
                transform: translateY(0);
            }

            @media (max-width: ${breakpoints.sm}) {
                font-size: 1.4rem;
                padding: 1rem 2rem;
            }
        }
    }
`

const SupportHint = ({ variant = 'platform' }) => {
    const content = {
        ai: {
            icon: '💡',
            title: 'Need help building AI-powered solutions with Theia AI?',
            description: 'Get professional support from experienced Theia contributors and committers specializing in AI-native development.',
            buttonText: 'Explore Professional Support'
        },
        platform: {
            icon: '🚀',
            title: 'Building solutions with Theia Platform?',
            description: 'Get professional support, training, and custom development from Theia experts to accelerate your project.',
            buttonText: 'Discover Professional Support'
        }
    }

    const { icon, title, description, buttonText } = content[variant]

    return (
        <StyledSupportHint>
            <div className="support-hint__container">
                <div className="support-hint__box">
                    <h3 className="support-hint__title">
                        <span role="img" aria-label={variant === 'ai' ? 'lightbulb' : 'rocket'}>{icon}</span>
                        {title}
                    </h3>
                    <p className="support-hint__description">
                        {description}
                    </p>
                    <a href="/support" className="support-hint__button">
                        {buttonText} →
                    </a>
                </div>
            </div>
        </StyledSupportHint>
    )
}

export default SupportHint