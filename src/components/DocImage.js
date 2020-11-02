/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
import { breakpoints } from '../utils/variables'

const StyledDocImage = styled.div`
    .docimage {
        width: ${({width}) => width ? width : '100%'};
        min-width: 30rem;
        margin: 2rem 0;
        &-container {
            max-width: 114.5rem;
            margin: 0 auto;

            @media(max-width: ${breakpoints.sm}) {
                overflow-x: scroll;
            }
        }
    }
`

const DocImage = ({ name, alt, shadow, width , styles}) => (
    <StyledDocImage width={width}>
        <div className="docimage-container">
            <img className="docimage" src={`/${name}`} alt={alt} style={{boxShadow: shadow ? "0 1.5rem 3rem rgba(0,0,0, .25)" : null, ...styles}}/>
        </div>
    </StyledDocImage>
)

export default DocImage