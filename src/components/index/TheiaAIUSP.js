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
import UXIcon from '../../resources/ux-icon.svg'
import AgentIcon from '../../resources/ai-agent-icon.svg'
import LLMIcon from '../../resources/language-model-icon.svg'
import IntegrationsIcon from '../../resources/integrations-icon.svg'
import Html from '../../resources/icon-html.svg'

import Feature from './Feature'

const StyledFeatures = styled.div`
    .features {
        padding: 1rem 0;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    .feature__container {
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }
`

const features = [
    {
        img: <img src={UXIcon} alt="Control User Experience" />,
        title: "Control User Experience",
        paragraphs: [ 
        'Design custom AI interactions with flexible chat interfaces, inline suggestions, or entirely custom UI elements that integrate seamlessly into your tool environment.',
        <>
        👉 <a href="https://eclipsesource.com/blogs/2025/03/12/beyond-ai-chat-agents-with-theia-ai/">Beyond AI Chat Agents with Theia AI</a>
        </>]
    },
    {
        img: <img src={AgentIcon} alt="Control AI Agents" />,
        title: "Control AI Agents",
        paragraphs: ['Create domain-specific AI agents with specialized knowledge that can interact natively with your tool components and support multi-turn comunication flows.',
            <>
            👉 <a href="https://eclipsesource.com/blogs/2025/02/13/introducing-interactive-ai-flows-in-theia-ai/">Introducing Interactive AI Flows</a>
            </> 
        ]
    },
    {
        img: <img src={LLMIcon} alt="Control Language Models" />,
        title: "Control Language Models",
        paragraphs: ['Connect to any AI model of your choice—cloud-based services, self-hosted solutions, or fully local LLMs. Balance capabilities, response time, costs and be ready for the models of tomorrow.',
            <>
            👉 <a href="https://eclipsesource.com/blogs/2025/02/27/why-theia-supports-any-llm/">Why Theia supports any LLM!</a>
            </> 
        ]
    },
    {
        img: <img src={IntegrationsIcon} alt="Control Data & Integrations" />,
        title: "Control Data & Integrations",
        paragraphs: [
            'Integrate AI seamlessly with your tool ecosystem with full control over APIs, databases, and services while determining exactly what data is shared with AI services.',
            <>
            👉 <a href="https://eclipsesource.com/blogs/2025/03/04/enhancing-your-tools-with-chat-context-in-theia-ai/">Enhancing Your Tools with Chat Context</a>
            </> ]
    }
]

const Features = () => (
    <StyledFeatures>
        <section className="features" id="features">
            <div className="row feature__container">
                {features.map(
                    (feature, i) => <Feature key={`${i}+${feature.title}`} {...feature} />
                )}
            </div>
        </section>
    </StyledFeatures>
)

export default Features