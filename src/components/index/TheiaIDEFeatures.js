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

import CodeEditing from '../../resources/codeediting.mp4'
import ModernUX from '../../resources/modernux.mp4'
import TheiaIDEAI from '../../resources/theia-ide-ai-demo.mp4'
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
        margin-bottom: 2rem;
    }

    .promo__text {
        width: 50%;
        padding: 5rem 3rem;

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
const LogoContainer = styled.div`
    display: flex;
    width: 50%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    border: 0px solid #ddd; /* Optional: for visual boundary */
`;

const Logo = styled.img`
    width: calc(15% - 10px); /* 4 logos per row */
    height: 25%; /* 2 rows */
    margin: 0px 0px 0px px; /* Adjust for spacing */
    object-fit: contain;
    scale: 0.7
`;
 

const TheiaIDEFeatures = ({ adopters }) => (
        
    <div className="row">
    <StyledPromo className="promo">
        <div className="promo__text">
            <h3 className="heading-tertiary">Language Support</h3>
            <p>Experience world-class code editing support in Theia IDE, integrated with the Language Server Protocol (LSP). Develop in almost any programming language, including Python, Java, JavaScript, C++, and more—all within one environment.</p>
        </div>
        <div className="promo__media">
            <video autoPlay loop muted playsInline className="promo__video">
                <source src={CodeEditing} type="video/mp4" />
            </video>
        </div>
    </StyledPromo>
    <StyledPromo className="promo">
        <div className="promo__text">
           <h3 className="heading-tertiary">AI-Powered IDE (Alpha)</h3>
            <p>Experience the future of development with <a href="/docs/user_ai/">Theia IDE's AI support</a>. Built on <a href="https://eclipsesource.com/blogs/2024/10/07/introducing-theia-ai/">Theia AI</a>, the AI assistance offers unmatched transparency and control, allowing you to customize AI interactions, choose your preferred models—whether cloud-based, self-hosted, or local—tailor prompts to your workflow, and even create your own custom agents to automate individual workflows, all while maintaining full ownership of your data.</p>
        </div>
        <div className="promo__media">
            <video autoPlay loop muted playsInline className="promo__video">
                <source src={TheiaIDEAI} type="video/mp4" />
            </video>
        </div>
    </StyledPromo>
    <StyledPromo className="promo">
        <div className="promo__text">
            <h3 className="heading-tertiary">Open Source and Vendor Neutral</h3>
            <p>The Theia IDE is backed by a diverse and healthy open source ecosystem. Enjoy the added confidence of a fully open-source platform governed by a vendor-neutral community. Deploy and enrich your toolset on your own terms.</p>
        </div>
    <LogoContainer>
        {adopters.map((item, i) => (
                                <Logo key={i} src={'https://api.eclipse.org/adopters/assets/images/adopters/' + item.logo} alt={item.name}/>
                                ))
        }
    </LogoContainer>
    </StyledPromo>
    <StyledPromo className="promo">
        <div className="promo__text">
            <h3 className="heading-tertiary">Modern UX</h3>
            <p>Elevate your development workflow with Theia IDE's flexible workbench layout and user experience. Featuring theming support, a dynamic toolbar, detachable views, and efficient tab management, our web-based interface is designed to adapt to your needs, streamlining your projects for optimal productivity.</p>
        </div>
        <div className="promo__media">
            <video autoPlay loop muted playsInline className="promo__video">
                <source src={ModernUX} type="video/mp4" />
            </video>
        </div>
    </StyledPromo>
    </div>
        
)

export default TheiaIDEFeatures