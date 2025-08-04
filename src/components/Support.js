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
                    <h1 className="heading-primary">
                    Professional Support
                    </h1>
                    <h2 style={{ fontSize: '2.2rem' }}>
                    The following contributing companies provide professional support and services for Eclipse Theia:
                    </h2>
                </div>
            </div>
        </header>
        <section className="support row" id="support">
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
                                            </div>
                                            <div className="contributions-period">
                                                in the last 12 months
                                            </div>
                                            <div className={`contributor-type ${stats.type}`}>
                                                {stats.type}
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
    </StyledSupport>
)

export default Support