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

/**
 * 
 * This component displays organizations and individuals providing professional
 * support for Eclipse Theia.
 * 
 * Selection Criteria:
 * The listed parties are selected based on meritocracy. The basic guidelines are:
 * - 3 Committers for a company (1 for an individual)
 * - 24 contributions over the last 12 months
 * - Member of the Eclipse Foundation
 * 
 * The final judgment is done by the Theia project leads through an open and
 * transparent process to ensure fairness and inclusion of all qualifying contributors.
 */

import Nav from './Nav'
import React from 'react'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import EclipseSourceLogo from '../resources/eclipse-source.svg'
import TypeFoxLogo from '../resources/typefox.png'
import CastleRidgeLogo from '../resources/castleridge.png'
import Background from '../resources/background-image.png'
import orgCommitStats from '../utils/org-commit-stats.json'

const StyledSupport = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 2rem;
    border-bottom: 10px solid #f8f8f8;
    @media(max-width: ${breakpoints.xmd}) {
        padding-top: 12rem;
    }
    &__logo-box {
        margin-bottom: 3rem;
    }
    &__logo {
        height: 3rem;
    }
    .btn {
        max-width: 20rem;
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
}
h1 {
    margin-bottom: 1rem;
    font-size: 3.4rem;
}
.support {
    padding: 3rem 0;
}

.support__container {
    display: flex;

    @media(max-width: ${breakpoints.md}) {
        flex-direction: column;
    }
}
.reverse {
    flex-direction: row-reverse;
    @media(max-width: ${breakpoints.md}) {
        flex-direction: column-reverse;
    }
}
.supporter {
    flex: 1;
    margin: 2rem 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    padding: 2rem;
    margin: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    }

    & > div {
        text-align: center;
    }

    h3 {
        margin-top: 1.6rem;
        font-size: 1.8rem;
    }

    & > p {
        margin: 0 auto;
        margin-bottom: 1rem;
        max-width: 45rem;
    }

    img {
        height: 7rem;
    }

    .contributor-stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1.5rem 0;
        padding: 0.8rem 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    .contributions {
        font-size: 1.6rem;
        font-weight: bold;
        color: #2a87ca;
        margin-bottom: 0.5rem;
        cursor: pointer;
        position: relative;
        
        &:hover .contribution-tooltip {
            visibility: visible;
            opacity: 1;
        }
    }
    
    .contribution-tooltip {
        visibility: hidden;
        opacity: 0;
        background-color: #333;
        color: white;
        text-align: center;
        border-radius: 6px;
        padding: 8px 12px;
        position: absolute;
        z-index: 1000;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
        font-size: 0.9rem;
        font-weight: normal;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: opacity 0.3s ease, visibility 0.3s ease;
        
        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: #333;
        }
    }

    .interactions {
        font-size: 1.4rem;
        font-weight: bold;
        color: #5ca3d9;
        margin-bottom: 0.5rem;
        cursor: pointer;
        position: relative;
        
        &:hover .interaction-tooltip {
            visibility: visible;
            opacity: 1;
        }
    }
    
    .interaction-tooltip {
        visibility: hidden;
        opacity: 0;
        background-color: #333;
        color: white;
        text-align: left;
        border-radius: 6px;
        padding: 10px 12px;
        position: absolute;
        z-index: 1000;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
        font-size: 0.9rem;
        font-weight: normal;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: opacity 0.3s ease, visibility 0.3s ease;
        
        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: #333;
        }
        
        .tooltip-item {
            display: block;
            margin-bottom: 2px;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    
    .contributions-period {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0.8rem;
    }

    .contributor-type {
        display: inline-block;
        padding: 0.4rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        
        &.company {
            background-color: #f0f7e6;
            color: #6baa3d;
        }
        
        &.individual {
            background-color: #e6f4fa;
            color: #2a87ca;
        }
    }
}
`

// Get commit stats for each supporter
const getCommitStats = (supporterName) => {
    // Special case for CastleRidge which maps to tsmaeder in the stats
    if (supporterName === 'Castle Ridge Software') {
        return orgCommitStats.find(stat => stat.name === 'tsmaeder');
    }
    return orgCommitStats.find(stat => stat.name === supporterName);
};

// Sort supporters by commit count
const supporters = [
    {
        img: EclipseSourceLogo,
        title: 'EclipseSource',
        link: 'https://eclipsesource.com',
        support: 'https://eclipsesource.com/technology/eclipse-theia/',
        training: 'https://eclipsesource.com/technology/eclipse-theia/#training',
        sponsored: 'https://eclipsesource.com/technology/eclipse-theia/#sponsored',
        tool: 'https://eclipsesource.com/services/tools/',
        ai: 'https://eclipsesource.com/services/ai-in-tools-and-ides/'
    },
    {
        img: TypeFoxLogo,
        title: 'TypeFox',
        link: 'https://typefox.io',
        support: 'https://www.typefox.io/cloud-and-desktop-ides/',
        training: 'https://www.typefox.io/cloud-and-desktop-ides/',
        sponsored: 'https://www.typefox.io/cloud-and-desktop-ides/',
        tool: 'https://www.typefox.io/cloud-and-desktop-ides/'
    },
    {
        img: CastleRidgeLogo,
        title: 'Castle Ridge Software',
        link: 'https://www.linkedin.com/company/castleridge',
        support: 'https://www.linkedin.com/company/castleridge',
        sponsored: 'https://www.linkedin.com/company/castleridge',
        tool: 'https://www.linkedin.com/company/castleridge'
    }
].sort((a, b) => {
    const statsA = getCommitStats(a.title);
    const statsB = getCommitStats(b.title);
    return (statsB?.totalCommits || 0) - (statsA?.totalCommits || 0);
});

const Support = () => (
    <StyledSupport>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary" style={{ lineHeight: '1.2', marginBottom: '1rem' }}>
                        Support (for) Eclipse Theia
                    </h1>
                    <div style={{ fontSize: '1.8rem', textAlign: 'left', lineHeight: '1.6' }}>
                        <p>👉 <a href="#support-services" style={{ color: '#2a87ca', textDecoration: 'underline', fontWeight: '500' }}>Support & Development Services</a></p>
                        <p>👉 <a href="#sponsoring" style={{ color: '#2a87ca', textDecoration: 'underline', fontWeight: '500' }}>Project Sponsoring</a></p>
                    </div>
                </div>
            </div>
        </header>
        <section className="support row" id="support-services">
            <h2 style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '2rem' }}>
                Professional Support and Development Services
            </h2>
            <p style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '3rem', maxWidth: '80rem', margin: '0 auto 3rem auto' }}>
                The following contributing companies provide professional support and services for Eclipse Theia, including adopting Theia and building custom tools and IDEs:
            </p>
            <div className="support__container">
                {
                    supporters.map(
                        ({title, link, img, training, support, sponsored, tool, ai}, i) => {
                            const stats = getCommitStats(title);
                            return(
                            <div key={`${i}_${title}`} className="supporter">
                                <div>
                                    <a href={link}><img src={img} alt={`${title} Logo`} /></a>
                                    
                                    {stats && (
                                        <div className="contributor-stats">
                                            <div className="contributions">
                                                {stats.totalCommits} contributions
                                                <div className="contribution-tooltip">
                                                    These are accepted pull requests
                                                </div>
                                            </div>
                                            <div className="interactions">
                                                {stats.totalInteractions} interactions
                                                <div className="interaction-tooltip">
                                                    <span className="tooltip-item">Interactions on discussions: {stats.interactions.discussions}</span>
                                                    <span className="tooltip-item">Interactions on issues: {stats.interactions.issues}</span>
                                                    <span className="tooltip-item">Interactions on pull requests: {stats.interactions.pullRequests}</span>
                                                </div>
                                            </div>
                                            <div className="contributions-period">
                                                in the last 12 months
                                            </div>
                                            <div className={`contributor-type ${stats.type}`}>
                                                {stats.type === 'individual' ? 'contractor' : stats.type}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <h3 className="heading-tertiary"><a href={support}>Support</a></h3>
                                    {(training) && <h3 className="heading-tertiary"><a href={training}>Training</a></h3>}
                                    {(sponsored) && <h3 className="heading-tertiary"><a href={sponsored}>Sponsored Development</a></h3>}
                                    {(tool) && <h3 className="heading-tertiary"><a href={tool}>Custom Tools & IDEs</a></h3>}
                                    {(ai) && <h3 className="heading-tertiary"><a href={ai}>AI-powered Tools & IDEs</a></h3>}
                                </div>
                            </div>)
                        }
                    )
                }
            </div>
        </section>
        
        <section className="support row" id="sponsoring">
            <h2 style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '2rem' }}>
               Theia Project Sponsoring
            </h2>
            <div style={{ maxWidth: '120rem', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>

                    <p style={{ fontSize: '1.6rem', marginBottom: '2rem'}}>
                        Strategic sponsoring ensures sustainable development and priority support for organizations building long-term products on Theia. Your investment directly funds core development resources, accelerating innovation and maintaining platform stability for mission-critical applications.
                    </p>
                    <p style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>
                        There are two complementary ways to support the Theia ecosystem — through individual sponsored development, which lets your organization directly fund Theia through tailored agreements with a service provider of your choice, or through collective sponsoring, which sustains the broader ecosystem by funding community-wide priorities.
                    </p>
                </div>
                <div className="support__container">
                    <div className="supporter" style={{ flex: '1', margin: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: '#2a87ca' }}>Sponsored Development</h3>
                            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#555' }}>
                            Choose this option if your organization wants to directly influence what gets built and fund tailored improvements as well as general project maintenance aligned with your needs. You'll work closely with one of the following core Theia service providers to plan and steer specific developments while contributing back to the open-source ecosystem.
                            </p>
                            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '2rem', color: '#555', fontStyle: 'italic' }}>
                            Service provider specific benefits may include priority releases, additional support levels, and direct access to core development teams. Check out the individual offerings below.
                            </p>
                            {supporters.map(({ title, link, img, sponsored }, i) => {
                                if (sponsored) {
                                    return (
                                        <div key={`sponsor_${i}_${title}`} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                            <a href={sponsored} style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                                                <img src={img} alt={`Sponsored development by ${title}`} style={{ height: '3.5rem', maxWidth: '100%' }} />
                                            </a>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="supporter" style={{ flex: '1', margin: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: '#2a87ca' }}>Collective Sponsoring</h3>
                            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '2rem', color: '#555' }}>
                            Choose this option if you want to support the sustainability of Theia without managing individual contracts. Your contribution directly funds core development resources, with funds distributed among contributors based on meritocracy (i.e., their share of contributions) and guided by community-wide priorities.
                            </p>
                            <a href="https://opencollective.com/eclipse-theia" className="btn btn--cta" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem' , transform: 'none' }}>
                                Visit Open Collective
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </StyledSupport>
)

export default Support