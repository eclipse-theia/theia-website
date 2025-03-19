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

const StyledHeader = styled.div`
    .row {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`

const TheiaAIOutro = () => (
    <StyledHeader>
            <div className="row">
                <h1>Feature Requests, Bug Reports and Support</h1>
                Help us make the Theia AI even better, by <a href="https://github.com/eclipse-theia/theia/discussions">sharing your experience and suggestions</a>.
                Please refer to the <a href="/docs/theia_ai/">Theia AI Documentation</a> and the <a href="/docs/user_ai/">User Documentation for the AI-powered Theia IDE</a>.
                Need further help with Theia? To get support by the community go to the <a href="https://github.com/eclipse-theia/theia/discussions">Discussions at GitHub</a>. To get professional support for Theia see the <a href="/support/">support page</a>.
            </div>
    
    </StyledHeader>
)

export default TheiaAIOutro