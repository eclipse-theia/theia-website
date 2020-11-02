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
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Arrow from '../resources/arrow.svg'

const Styled = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10rem;

    .arrow {
        display: inline-block;
        height: 6rem;

        &--left {
            transform: rotate(90deg);
        }

        &--right {
            transform: rotate(270deg);
        }
    }
`

const DocArrowNavigators = ({prev, next, prevTitle, nextTitle}) => {
    const pTitle = `Go to previous Page ${prevTitle ? `: ${prevTitle}` : ""}`
    const nTitle = `Go to next page ${nextTitle ? `: ${nextTitle}` : ""}`
    return (
    <Styled>
        <Link to={prev} title={pTitle} aria-label={pTitle} style={{pointerEvents: !prev && 'none' }}>
            <img src={Arrow} alt={pTitle} className="arrow arrow--left" style={{opacity: !prev ? '.3' : 1}}/>
        </Link>
        <Link to={next} title={nTitle} aria-label={nTitle} style={{pointerEvents: !next && 'none' }}>
            <img src={Arrow} alt={nTitle} className="arrow arrow--right" style={{opacity: !next ? '.3' : 1}} />
        </Link>
    </Styled>
)
}

export default DocArrowNavigators