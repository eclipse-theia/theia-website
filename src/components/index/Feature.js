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
import { breakpoints } from '../../utils/variables'


const StyledFeature = styled.div`
    flex: 3.33%;

    &:not(:last-child) {
            margin-right: 8rem;

        @media(max-width: ${breakpoints.md}) {
            margin: 0 0 4rem 0;
        }
    }

    & > div {
        text-align: center;
    }

    h3 {
        margin-top: 2rem;
    }

    & > p {
        margin: 0 auto;
        margin-bottom: 1rem;
        max-width: 45rem;
    }

    img {
        height: 7rem;
    }
`

const Feature = ({ img, title, paragraphs }) => (
    <StyledFeature className="feature">
        <div>
            {img}
            <h3 className="heading-tertiary">{title}</h3>
        </div>
        {
            paragraphs.map((p, i) => <p key={`${i}${title}`}>{p}</p>)
        }
    </StyledFeature>
)

export default Feature