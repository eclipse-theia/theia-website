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
import CompletionVideo from '../../resources/completion.mp4'
import TermianlVideo from '../../resources/terminal.mp4'
import LayoutVideo from '../../resources/layout.mp4'
import Promo from './Promo'

const StyledPromos = styled.div`
    .promos {
        margin: 15rem 0;
    }
`

const promos = [
    {
        title: "Supports JavaScript, Java, Python and many more",
        para: <p>
            Built on the <a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noopener noreferrer">Language Server Protocol</a>,
            Theia benefits from a growing ecosystem of <strong>over 60 available language servers</strong>, delivering intelligent editing support
            for all major programming languages.
        </p>,
        videoSrc: CompletionVideo
    },
    {
        title: "Integrated Terminal",
        para: <p>Theia integrates a full-featured terminal that reconnects on browser reload, keeping the full history.</p>,
        videoSrc: TermianlVideo
    },
    {
        title: "Flexible Layout",
        para: <p>Theia's shell is composed of lightweight modular widgets that provide a solid foundation for draggable dock layouts.</p>,
        videoSrc: LayoutVideo
    }
]

const Promos = () => (
    <StyledPromos>
        <section className="promos">
            <div className="row">
                { promos.map((promo, i) => <Promo key={i} {...promo} />) }
            </div>
        </section>
    </StyledPromos>
)

export default Promos