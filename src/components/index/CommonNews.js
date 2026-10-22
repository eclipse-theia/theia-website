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
            <a href="https://eclipsesource.com/blogs/2026/10/08/eclipse-theia-1-76-release-news-and-noteworthy/" rel="noopener noreferrer">Learn about the latest 1.76 Release</a> and <a href="https://eclipsesource.com/blogs/2026/09/15/the-eclipse-theia-community-release-2026-08/">the latest Community Release (2026-08)</a>.
            <br />
            Read about <a href="https://newsroom.eclipse.org/eclipse-newsletter/2026/march/eclipse-theia-eclipse-foundation-tool-platform-production">Eclipse Theia: The Eclipse tool platform in production</a>.
            <br />
            Stay up-to-date: <a href="https://accounts.eclipse.org/mailing-list/friends-of-theia">register to the "Friends of Theia" mailing list</a> and <a href="https://x.com/theia_ide">follow us on X</a>.
            <br />

        </h2>
        <br />
        <a href="https://www.eclipse.org/events/2026/theiacon/">
            <img className="banner__image" src={TheiaConLogo} alt="TheiaCon 2026"></img>
        </a>
        <h1 style={{ fontSize: '2.2rem' }}>
            TheiaCon is almost here! Join <a href="https://www.eclipse.org/events/2026/theiacon/">TheiaCon 2026</a>, a free, virtual event on 28 - 29 October.<br/>
            Secure your spot today:
        </h1>
        <div className="header__buttons">
            <a className="btn btn--cta" href="https://luma.com/theiacon2026" rel="noopener">
                Register now
            </a>
        </div>
    </div>
)

export default PlatformHeader
