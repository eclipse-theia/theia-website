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
import TheiaConLogo from '../../resources/theiacon-logo.svg'
const PlatformHeader = () => (
    <div className="header__banner">
        <h2 style={{ fontSize: '2.1rem' }}>
            <a href="https://eclipsesource.com/blogs/2025/07/10/eclipse-theia-1-63-release-news-and-noteworthy/" rel="noopener noreferrer">Learn about the latest 1.63 Release</a> and <a href="https://eclipsesource.com/blogs/2025/06/13/the-eclipse-theia-community-release-2025-05/">the latest Community Release (2025-05)</a>.
            <br />
            Stay up-to-date: <a href="https://twitter.com/theia_ide">follow us on Twitter</a> and <a href="https://accounts.eclipse.org/mailing-list/friends-of-theia">register to the "Friends of Theia" mailing list</a>.
            <br />
            
        </h2>
        <br />
         <a href="https://www.eclipse.org/events/2025/theiacon/">
                        <img className="banner__image" src={TheiaConLogo}></img>
                    </a>
                    <h1 style={{ fontSize: '2.2rem' }}>
                        The Call for Presentations is now OPEN for the <a href="https://www.eclipse.org/events/2025/theiacon/">2025 TheiaCon</a>!<br/>
                        (Virtual Event | 29 - 30 October, 2025)<br/>
                        <a href="https://forms.gle/jGfU7mscY9k7xCop8">Submit your proposal</a> today to be a speaker and <a href="https://eclipse.zoom.us/webinar/register/WN_tSNF38qYR6OPdtIUCnnSHA">get registered</a>!
                    </h1>
                    <div className="header__buttons">
                        <a className="btn btn--cta" href="https://forms.gle/jGfU7mscY9k7xCop8" rel="noopener">
                            Submit Proposal
                        </a>
                        <a className="btn btn--cta" href="https://eclipse.zoom.us/webinar/register/WN_tSNF38qYR6OPdtIUCnnSHA" rel="noopener">
                            Get registered
                        </a>
                    </div>
    </div>
)

export default PlatformHeader
