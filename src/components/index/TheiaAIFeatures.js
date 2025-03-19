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

import React, { useState } from 'react'

import GlspFixWithAI from '../../resources/glsp-fix-with-ai.mp4'
import AskAndContinue from '../../resources/ask-and-continue.webm'
import TheiaChatContext from '../../resources/chat-context.webm'
import CustomChangeSet from '../../resources/custom-change-set.webm'
import GitAgent from '../../resources/git-agent.mp4'
import Terminal from '../../resources/ai-terminal.mp4'
import GitAgentCreateBranch from '../../resources/git-agent-create-branch.mp4'
import Coder from '../../resources/coder-create-quiz-game.mp4'
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
        z-index: 1;
        cursor: pointer;

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
            z-index: 1000;
            opacity: .1;
        }
    }

    .promo__video {
        width: 100%;
    }

    .expand-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
    }
`

const VideoModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    .modal-content {
        position: relative;
        width: 90%;
        max-width: 1200px;
    }

    .modal-video {
        width: 100%;
        max-height: 90vh;
    }

    .close-button {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        background: transparent;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
`

const LogoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
    justify-items: center;
    align-items: center;
    padding: 2rem 1rem;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 380px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Logo = styled.img`
    width: 100%;
    max-width: 50px;
    height: auto;
    object-fit: contain;
    margin: 0.5rem;
`;

const TheiaAIFeatures = ({ adopters }) => {
    const [modalVideo, setModalVideo] = useState(null);

    const openModal = (videoSrc, videoType) => {
        setModalVideo({ src: videoSrc, type: videoType });
    }

    const closeModal = () => {
        setModalVideo(null);
    }

    return (
        <div className="row">
            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Specialized AI Agents</h3>
                    <p>Build AI agents customized for your domain's knowledge and workflows with ready components for function calling, context retrieval, multi-turn conversations, custom UX elements and integration with external AI components.</p>
                    <a href="https://theia-ide.org/docs/theia-ai/" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more about developing custom agents →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(GlspFixWithAI, "video/mp4")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={GlspFixWithAI} type="video/mp4" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Interactive AI Workflows</h3>
                    <p>Move beyond one-shot responses with AI agents that engage users in dynamic, multi-step interactions, presenting actionable options and guiding through complex workflows.</p>
                    <a href="https://theia-ide.org/docs/theia-ai/interactive-flows" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore interactive AI flows →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(AskAndContinue, "video/webm")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={AskAndContinue} type="video/webm" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Context-Aware AI Support</h3>
                    <p>Provide agents with relevant context using advanced retrieval techniques. Optionally, users can scope requests by dragging files, symbols, or domain-specific elements into the chat.</p>
                    <a href="https://eclipsesource.com/blogs/2025/03/04/enhancing-your-tools-with-chat-context-in-theia-ai/" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore Theia AI's context variable system →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(TheiaChatContext, "video/webm")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={TheiaChatContext} type="video/webm" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Organized Change Suggestions</h3>
                    <p>Keep AI-proposed changes organized through structured Change Sets that separate suggestions from conversation, enabling users to systematically review complex modifications.</p>
                    <a href="https://theia-ide.org/docs/theia-ai/change-sets" className="text-indigo-600 hover:text-indigo-800 font-medium">Discover how change sets simplify suggestions →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(CustomChangeSet, "video/webm")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={CustomChangeSet} type="video/webm" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Custom UI Integration</h3>
                    <p>Extend AI capabilities beyond simple chat views into specialized tool components, providing contextual suggestions directly where users work.</p>
                    <a href="https://eclipsesource.com/blogs/2025/03/12/beyond-ai-chat-agents-with-theia-ai/" className="text-indigo-600 hover:text-indigo-800 font-medium">Explore custom UI integrations →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(Terminal, "video/mp4")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={Terminal} type="video/mp4" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Advanced Prompt Management</h3>
                    <p>Leverage dynamic templates, flexible variable management, variants, reusable fragments, and runtime modifications for rapid development iterations and user customization.</p>
                    <p><a href="/docs/user_ai/#view-and-modify-prompts" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more about prompt management in the Theia IDE →</a></p>
                    <a href="/docs/theia_ai/" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more about creating custom agents →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(GitAgent, "video/mp4")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={GitAgentCreateBranch} type="video/mp4" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Model Context Protocol Support</h3>
                    <p>Enhance your AI-powered tool with Anthropic's MCP, enabling seamless integration with external tools and context sources.</p>
                    <p><a href="https://eclipsesource.com/blogs/2024/12/19/theia-ide-and-theia-ai-support-mcp/" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more about MCP support →</a></p>
                    <p><a href="https://eclipsesource.com/blogs/2025/03/05/theia-ai-git-and-mcp/" className="text-indigo-600 hover:text-indigo-800 font-medium">Example for integraing Theia AI, Git and MCP →</a></p>
                </div>
                <div className="promo__media" onClick={() => openModal(GitAgentCreateBranch, "video/mp4")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={GitAgent} type="video/mp4" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">AI-powered Theia IDE</h3>
                    <p>Experience Theia AI live in action. The AI-powered Theia IDE, built on Theia AI is an open source development environment that puts the power of AI in your hands—with full transparency and control. Theia IDE gives you complete visibility and flexibility over your AI interactions.</p>
                    <a href="https://eclipsesource.com/blogs/2025/03/13/introducing-the-ai-powered-theia-ide/" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more the AI-powered Theia IDE →</a>
                </div>
                <div className="promo__media" onClick={() => openModal(Coder, "video/mp4")}>
                    <div className="expand-icon">⤢</div>
                    <video className="promo__video" autoPlay loop muted playsInline>
                        <source src={Coder} type="video/mp4" />
                    </video>
                </div>
            </StyledPromo>

            <StyledPromo className="promo">
                <div className="promo__text">
                    <h3 className="heading-tertiary">Part of the Open Theia Platform</h3>
                    <p>Theia AI is part of the powerful Theia platform that allows you to tailor every aspect of your tool to your individual needs. Efficiently develop and deliver Cloud & Desktop IDEs and tools with modern web technologies and join the open source and vendor neutral ecosystem of successful tool builders in the Theia ecosystem.</p>
                    <a href="/theia-platform" className="text-indigo-600 hover:text-indigo-800 font-medium">Learn more about the Theia Platform →</a>
                </div>
                <div className="promo__media">
                    <LogoContainer>
                        {adopters.map((item, i) => (
                            <Logo key={i} src={'https://api.eclipse.org/adopters/assets/images/adopters/' + item.logo} alt={item.name}/>
                        ))}
                    </LogoContainer>
                </div>
            </StyledPromo>

            {modalVideo && (
                <VideoModal onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>×</button>
                        <video className="modal-video" controls autoPlay>
                            <source src={modalVideo.src} type={modalVideo.type} />
                        </video>
                    </div>
                </VideoModal>
            )}
        </div>
    )
}

export default TheiaAIFeatures