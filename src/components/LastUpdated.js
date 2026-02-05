/********************************************************************************
 * Copyright (C) 2026 EclipseSource and others.
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

const StyledLastUpdated = styled.div`
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    font-size: 1.3rem;
    color: #666;
    font-style: italic;
`

const LastUpdated = ({ date }) => {
    if (!date) {
        return null
    }

    const formattedDate = new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <StyledLastUpdated>
            Last updated: {formattedDate}
        </StyledLastUpdated>
    )
}

export default LastUpdated
