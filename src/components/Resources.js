/********************************************************************************
 * Copyright (C) 2021 EclipseSource and others.
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

import Nav from './Nav'
import React from 'react'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import Background from '../resources/background-image.png'
import Article from '../resources/article.svg'
import Video from '../resources/video.svg'


const StyledResources = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 3rem;
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
}
heading-primary {
    margin-bottom: 1rem;
    font-size: 3.4rem;
}
.heading-secondary {
    font-size: 3rem;
    margin-bottom: 2rem;
}
.category {
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.category:not(:last-child) {
    border-bottom: 1px solid #ccc;
}
.resources {
    padding: 3rem 0;
}
.icon {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background-size: contain;
    background-repeat: no-repeat;
}
.article {
    background-image: url(${Article});
    vertical-align: top;
}
.video {
    background-image: url(${Video});
    vertical-align: bottom;
}
`

const categories = [
    {
        title: 'News around Eclipse Theia',
        resources: [
            {
                title: 'Introducing the AI-powered Theia IDE: AI-driven coding with full Control',
                url: 'https://eclipsesource.com/blogs/2025/03/13/introducing-the-ai-powered-theia-ide/',
                type: 'article'
            },
            {
                title: 'Introducing Theia AI: The Open Framework for Building AI-native Custom Tools and IDEs',
                url: 'https://eclipsesource.com/blogs/2025/03/13/introducing-theia-ai/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia: The DeepSeek of AI Tooling?',
                url: 'https://thenewstack.io/eclipse-theia-the-deepseek-of-ai-tooling/',
                type: 'article'
            },
            {
                title: 'Introducing Theia Coder - the open AI coding agent with full control',
                url: 'https://eclipsesource.com/blogs/2025/03/06/introducing-theia-coder-open-coding-agent-with-full-control/',
                type: 'article'
            },
            {
                title: 'Theia Cloud 1.0: Simplifying Deployment and Management of Theia-Based Tools in Kubernetes',
                url: 'https://eclipsesource.com/blogs/2025/01/30/theia-cloud-release-1/',
                type: 'article'
            },
            {
                title: 'The Eclipse Theia Update 2024',
                url: 'https://eclipsesource.com/blogs/2024/12/18/eclipse-theia-news-2024/',
                type: 'video'
            },
            {
                title: 'Introducing the Theia IDE',
                url: 'https://eclipsesource.com/blogs/2024/06/27/introducing-the-theia-ide/',
                type: 'article'
            },
        ]
    },
    {
        title: 'TheiaCon Talk Recordings',
        resources: [
            {
                title: 'TheiaCon 2024',
                url: 'https://www.youtube.com/playlist?list=PLy7t4z5SYNaQAGs0tr_ZSv3h2GKH2G50X',
                type: 'video'
            },
            {
                title: 'TheiaCon 2023',
                url: 'https://www.youtube.com/watch?v=2rbMtztIHgw&list=PLy7t4z5SYNaQ0cajexl1uZhiZwiD93v9g',
                type: 'video'
            },
            {
                title: 'TheiaCon 2022',
                url: 'https://www.youtube.com/watch?v=BtWJD-72IJ8&list=PLy7t4z5SYNaRj46WedNTnAXLLHwuk3nro',
                type: 'video'
            },
            {
                title: 'TheiaCon 2021',
                url: 'https://www.youtube.com/watch?v=SPO8pudgJak&list=PLy7t4z5SYNaQnfc8RoVYBU9i9xqoK7X2_',
                type: 'video'
            },
        ]
    },
    {
        title: 'Introductions to Eclipse Theia',
        resources: [
            {
                title: 'Eclipse Theia is the Next Generation Eclipse Platform for IDEs and Tools!',
                url: 'https://eclipsesource.com/blogs/2022/03/09/eclipse-theia-is-the-next-generation-eclipse-platform-for-ides-and-tools/',
                type: 'article'
            },
            {
                title: 'The Theia IDE vs VS Code',
                url: 'https://eclipsesource.com/blogs/2024/07/12/vs-code-vs-theia-ide/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia vs. VS Code OSS',
                url: 'https://eclipsesource.com/blogs/2023/09/08/eclipse-theia-vs-code-oss/',
                type: 'article'
            },
            {
                title: 'Getting started with Eclipse Theia',
                url: 'https://youtu.be/KFmhzmPtAY0',
                type: 'video'
            },
            {
                title: 'What is Eclipse Theia?',
                url: 'https://eclipsesource.com/blogs/2018/06/20/welcome-at-eclipse-theia/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia - FAQ',
                url: 'https://eclipsesource.com/blogs/2019/12/24/eclipse-theia-ide-faq/',
                type: 'article'
            },
            {
                title: 'Getting Started with Eclipse Theia Towards A Common Platform for Automotive',
                url: 'https://eclipsesource.com/blogs/2025/01/10/eclipse-theia-common-platform-for-automotive/',
                type: 'article'
            },
            {
                title: 'The Eclipse Theia Architecture',
                url: 'https://youtu.be/SPO8pudgJak',
                type: 'video'
            },
            {
                title: 'How to adopt Eclipse Theia',
                url: 'https://youtu.be/KN2JUsFuEhU',
                type: 'video'
            },
            {
                title: 'Eclipse Theia is the next generation Eclipse RCP?!',
                url: 'https://eclipsesource.com/blogs/2022/03/16/eclipse-theia-is-the-next-generation-eclipse-rcp/',
                type: 'article'
            }
        ]
    },
    {
        title: 'Eclipse Theia Adopter Stories',
        resources: [
            {
                title: 'How Lonti Created a Unified IDE for APIs, Automation, and Application Development With Eclipse Theia',
                url: 'https://www.eclipse.org/topics/ide/articles/how-lonti-created-a-unified-ide-for-apis-automation-and-application-development-with-eclipse-theia/',
                type: 'article'
            },
            {
                title: 'Texas Instruments Elevates Code Composer Studio™ with Eclipse Theia',
                url: 'https://outreach.eclipse.foundation/theia-ti-codecomposer',
                type: 'article'
            },
            {
                title: 'Exploring Real-World Applications of Theia: Insights from TheiaCon 2024',
                url: 'https://eclipsesource.com/blogs/2025/01/23/exploring-real-world-applications-of-theia-theiacon/',
                type: 'article'
            },
            {
                title: 'How to get visible as a Theia adopter and contributor',
                url: 'https://eclipsesource.com/blogs/2023/11/22/how-to-become-visible-theia-adopter/',
                type: 'article'
            },
            {
                title: 'Theia Adopter Story: The new Arduino IDE 2.0',
                url: 'https://blogs.eclipse.org/post/john-kellerman/theia-adopter-story-new-arduino-ide-20',
                type: 'article'
            },
            {
                title: 'Code RealTime: Harnessing the Power of the Eclipse Cloud DevTools Ecosystem',
                url: 'https://blogs.eclipse.org/post/john-kellerman/code-realtime-harnessing-power-eclipse-cloud-devtools-ecosystem',
                type: 'article'
            },
            {
                title: 'logi.CLOUD, a modern engineering platform for industrial automation',
                url: 'https://blogs.eclipse.org/post/paul-buck/theia-adopter-story-logicloud-modern-engineering-platform-industrial-automation',
                type: 'article'
            },
            {
                title: 'A web-based modeling tool based on Eclipse Theia',
                url: 'https://eclipsesource.com/blogs/2020/07/24/a-web-based-modeling-tool-based-on-eclipse-theia/',
                type: 'article'
            }
        ]
    },
    {
        title: 'Technical topics about Eclipse Theia',
        resources: [
            {
                title: 'VS Code extensions vs. Theia extensions',
                url: 'https://eclipsesource.com/blogs/2021/03/24/vs-code-extensions-vs-theia-extensions/',
                type: 'article'
            },
            {
                title: 'Theia Playwright - End-to-end testing Theia applications',
                url: 'https://eclipsesource.com/blogs/2022/02/23/theia-playwright-end-to-end-testing-theia-applications/',
                type: 'article'
            },
            {
                title: 'Internationalization in Eclipse Theia',
                url: 'https://ecdtools.eclipse.org/resources/blogs/2021-12-16-theia-i18n/',
                type: 'article'
            },
            {
                title: 'Eclipse Theia - a platform for more than just code editors!',
                url: 'https://youtu.be/9c4hyPux5DY',
                type: 'video'
            }
        ]
    },
    {
        title: 'Topics related to Eclipse Theia',
        resources: [
            {
                title: 'Is Forking VS Code a Good Idea?',
                url: 'https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/',
                type: 'article'
            },
            {
                title: 'Modern (web-based) Tool and IDEs: Definitions, Concepts and Architecture',
                url: 'https://eclipsesource.com/blogs/2025/02/04/modern-web-based-tool-and-ide-definitions-concepts-architecture/',
                type: 'article'
            },
            {
                title: 'How to Build a Custom IDE or Tool',
                url: 'https://eclipsesource.com/blogs/2025/02/26/how-to-build-a-custom-ide-or-tool/',
                type: 'article'
            },
            {
                title: 'Eclipse Foundation Introduces Open Collaboration Tools (OCT) to Transform Remote Development',
                url: 'https://newsroom.eclipse.org/news/announcements/eclipse-foundation-introduces-open-collaboration-tools-oct-transform-remote',
                type: 'article'
            },
            {
                title: 'Building diagram editors in Eclipse Theia with GLSP',
                url: 'https://eclipsesource.com/blogs/2021/03/03/building-diagram-editors-in-eclipse-theia-with-glsp/',
                type: 'article'
            },
            {
                title: 'How to build a tree editor in Eclipse Theia',
                url: 'https://eclipsesource.com/blogs/2021/02/03/how-to-build-a-tree-editor-in-eclipse-theia/',
                type: 'article'
            }
        ]
    },
    {
        title: 'Theia AI and AI-powered Theia IDE',
        resources: [
            {
                title: 'Introducing the AI-powered Theia IDE: AI-driven coding with full Control',
                url: 'https://eclipsesource.com/blogs/2025/03/13/introducing-the-ai-powered-theia-ide/',
                type: 'article'
            },
            {
                title: 'Introducing Theia AI: The Open Framework for Building AI-native Custom Tools and IDEs',
                url: 'https://eclipsesource.com/blogs/2025/03/13/introducing-theia-ai/',
                type: 'article'
            },
            {
                title: 'AI-Native Tools with Full Control: Theia AI & The AI-Powered Theia IDE In Action',
                url: 'https://youtu.be/qqvzB10QNtU?si=71qovlCqx3L0IfBj',
                type: 'video'
            },
            {
                title: 'How AI and MCP Supercharge GitHub Workflows in Theia IDE',
                url: 'https://eclipsesource.com/blogs/2025/08/26/ai-runs-github-workflows/',
                type: 'video'
            },
            {
                title: 'GPT-5 vs Sonnet-4: Side-by-Side on Real Coding Tasks',
                url: 'https://eclipsesource.com/blogs/2025/08/19/gpt5-vs-sonnet4/',
                type: 'video'
            },
            {
                title: 'AI Driven E2E Testing with the Theia IDE',
                url: 'https://eclipsesource.com/blogs/2025/07/09/ai-driven-e2e-testing-theia-ide/',
                type: 'video'
            },
            {
                title: 'A Native Claude Code IDE? How It Could Look Like with Eclipse Theia',
                url: 'https://eclipsesource.com/blogs/2025/08/07/a-native-claude-code-ide-how-it-could-look-like-with-eclipse-theia/',
                type: 'video'
            },
            {
                title: 'Enhanced Image Support in the AI-powered Theia IDE / Theia AI',
                url: 'https://eclipsesource.com/blogs/2025/07/31/image-support-ai-powered-theia-ide/',
                type: 'video'
            },
            {
                title: 'Interactive AI Responses in Your Custom GitHub Copilot – New Theia AI Tutorial',
                url: 'https://eclipsesource.com/blogs/2025/07/29/interactive-ai-responses-in-your-custom-github-copilot-new-theia-ai-tutorial/',
                type: 'video'
            },
            {
                title: 'AI Driven E2E Testing with the Theia IDE',
                url: 'https://eclipsesource.com/blogs/2025/07/09/ai-driven-e2e-testing-theia-ide/',
                type: 'video'
            },
            {
                title: 'Theia Coder Agent Mode: From AI Assistant to Autonomous Developer',
                url: 'https://eclipsesource.com/blogs/2025/07/08/theia-coder-agent-mode/',
                type: 'video'
            },
            {
                title: 'Structured AI Coding with Task Context: A Better Way to Work with AI Agents',
                url: 'https://eclipsesource.com/blogs/2025/07/01/structure-ai-coding-with-task-context/',
                type: 'video'
            },
            {
                title: 'How to Build Custom AI Agents in the Theia IDE',
                url: 'https://eclipsesource.com/blogs/2025/06/18/how-to-build-custom-agents-in-theia-ai/',
                type: 'video'
            },
            {
                title: 'Installing MCP Servers via VS Code Extensions',
                url: 'https://eclipsesource.com/blogs/2025/06/12/installing-mcp-servers-via-vscode-extensions/',
                type: 'video'
            },
            {
                title: 'Custom GitHub Copilot with Theia AI – New Video Tutorial',
                url: 'https://eclipsesource.com/blogs/2025/05/27/custom-github-copilot-with-theia-ai-tutorial/',
                type: 'video'
            },
            {
                title: 'Enhancing AI Coding Agents with Project-Specific Information',
                url: 'https://eclipsesource.com/blogs/2025/05/06/enhancing-ai-coding-with-project-info/',
                type: 'article'
            },
            {
                title: 'Introducing SCANOSS Integration in Theia: Transparent License Compliance for AI-Generated Code',
                url: 'https://eclipsesource.com/blogs/2025/03/20/scanoss-integration-in-theia/',
                type: 'article'
            },
            {
                title: 'Introducing Theia Coder - the open AI coding agent with full control',
                url: 'https://eclipsesource.com/blogs/2025/03/06/introducing-theia-coder-open-coding-agent-with-full-control/',
                type: 'article'
            },
            {
                title: 'Getting Started with Theia Coder: The Flexible AI Coding Assistant for Theia IDE | No Vendor Lock-in',
                url: 'https://youtu.be/J1FECv6emEg?si=QKi3NY41t0Rd_4cc',
                type: 'video'
            },
            {
                title: 'Theia AI Change Sets: Managing Complex AI Change Suggestions',
                url: 'https://eclipsesource.com/blogs/2025/03/11/theia-ai-change-sets-managing-complex-ai-change-suggestions/',
                type: 'article'
            },
            {
                title: 'Let AI commit (to) your work - With Theia AI, Git and MCP',
                url: 'https://eclipsesource.com/blogs/2025/03/05/theia-ai-git-and-mcp/',
                type: 'article'
            },
            {
                title: 'Why Theia supports any LLM!',
                url: 'https://eclipsesource.com/blogs/2025/02/27/why-theia-supports-any-llm/',
                type: 'article'
            },
            {
                title: 'Introducing Interactive AI Flows in Theia AI',
                url: 'https://eclipsesource.com/blogs/2025/02/13/introducing-interactive-ai-flows-in-theia-ai/',
                type: 'article'
            },
            {
                title: 'Enhancing Your Tools with Chat Context in Theia AI',
                url: 'https://eclipsesource.com/blogs/2025/03/04/enhancing-your-tools-with-chat-context-in-theia-ai/',
                type: 'article'
            },
            {
                title: 'Building AI-Powered Tools and IDEs: Practical Techniques',
                url: 'https://eclipsesource.com/blogs/2024/10/28/building-ai-powered-tools-and-ides/',
                type: 'article'
            },    
            {
                title: 'The Vision of Theia AI: Empowering Tool Builders with Full Control over AI Solutions',
                url: 'https://eclipsesource.com/blogs/2024/09/16/theia-ai-vision/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Transparent Code Completion',
                url: 'https://eclipsesource.com/blogs/2024/09/18/theia-ai-sneak-preview-transparent-code-completion/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Choose Your Own LLM',
                url: 'https://eclipsesource.com/blogs/2024/09/20/theia-ai-sneak-preview-choose-your-own-llm/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Variables & Tool Functions',
                url: 'https://eclipsesource.com/blogs/2024/09/23/theia-ai-sneak-preview-variables-toolfunctions/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Create your own AI assistance!',
                url: 'https://eclipsesource.com/blogs/2024/09/25/theia-ai-sneak-preview-create-your-own-agent/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Custom Part Renderer and actionable responses',
                url: 'https://eclipsesource.com/blogs/2024/09/27/theia-ai-sneak-preview-custom-part-renderer/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Let your agents talk to each other!',
                url: 'https://eclipsesource.com/blogs/2024/09/30/theia-ai-sneak-preview-orchestrator/',
                type: 'article'
            },
            {
                title: 'Theia AI Sneak Preview: Powerful AI integration paired with the most flexible tool platform',
                url: 'https://eclipsesource.com/blogs/2024/10/02/theia-ai-flexible-platform/',
                type: 'article'
            },            
            {
                title: 'The Rise of Closed Source AI Tool Integrations',
                url: 'https://eclipsesource.com/blogs/2024/07/10/the-rise-of-closed-source-ai-tool-integrations/',
                type: 'article'
            }   
        ]
    },
]

const Resources = () => (
    <StyledResources>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary">
                        Other resources
                    </h1>
                </div>
            </div>
        </header>
        {categories.map(({ title, resources }, i) => {
            return (
                <section key={i} className="category row" id="resources">
                    <h2 className="heading-secondary">{title}</h2>
                    {resources.map(
                        ({ title, url, type }, i) => {
                            return (
                                <div key={`${i}_${title}`} className="resource">
                                    <div>
                                        <h3 className="heading-tertiary">
                                            <span className={`icon ${type}`}></span>&nbsp;
                                            <a href={url}>{title}</a>
                                        </h3>
                                    </div>
                                </div>)
                        }
                    )}
                </section>
            )
        }
        )}
    </StyledResources>
)
export default Resources
