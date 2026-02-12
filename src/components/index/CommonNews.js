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
            <a href="https://eclipsesource.com/blogs/2026/02/12/eclipse-theia-1-68-release-news-and-noteworthy/" rel="noopener noreferrer">Learn about the latest 1.68 Release</a> and <a href="https://eclipsesource.com/blogs/2025/12/11/the-eclipse-theia-community-release-2025-11/">the latest Community Release (2025-11)</a>.
            <br />
            In case you missed TheiaCon 2025, all talk recordings are available now, see <a href="https://www.youtube.com/playlist?list=PLy7t4z5SYNaQyTt3QT9nddDLIuEiUKPoX">here</a>!
            <br />
            Stay up-to-date: <a href="https://accounts.eclipse.org/mailing-list/friends-of-theia">register to the "Friends of Theia" mailing list</a> and <a href="https://x.com/theia_ide">follow us on X</a>.
            <br />

        </h2>
    </div>
)

export default PlatformHeader
