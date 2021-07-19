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
import IconExtension from '../../resources/icon-extension.svg'
import IconCloudScreen from '../../resources/icon-cloud-screen.svg'
import IconOpenSource from '../../resources/icon-open-source.svg'
import Html from '../../resources/icon-html.svg'

import { Link } from 'gatsby'
import Feature from './Feature'

const StyledFeatures = styled.div`
    .features {
        padding: 1rem 0;
    }

    .feature__container {
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
        }
    }
`

const features = [
    {
        img: <img src={IconCloudScreen} alt="Cloud Screen" />,
        title: "Cloud & Desktop",
        paragraphs: ['Not sure whether you need a web or desktop version or both?', 'With Theia you can develop one IDE and run it in a browser or as a native desktop application from a single source.']
    },
    {
        img: <img src={IconExtension} alt="Icon Extension" />,
        title: "Extensible",
        paragraphs: ['Theia is designed in a modular way to allow extenders and adopters to customize and extend every aspect.', 
        <>
            This goes way beyond “just adding extensions”, because Eclipse Theia  lets you build fully customized or white-labeled products!
        </>]
    },
    {
        img: <img src={IconOpenSource} alt="Vendor Neutral Open Source" />,
        title: "Vendor Neutral",
        paragraphs: [ <>
            Theia is truly vendor-neutral and developed by a diverse community. Unlike other “open source” projects, Theia is actually hosted at an Open-Source Foundation, protecting it against single-vendor decisions that are against the interest of the community.
            Learn more <a href="https://www.eclipse.org/projects/dev_process/">here</a>.
        </>]
    },
    {
        img: <img src={Html} alt="Modern Tech" />,
        title: "Modern Tech",
        paragraphs: ['Theia is based on a state-of-the-art web-based  technology stack. It provides language support via LSP and DAP. Further, it can host VS Code extensions and provides full terminal access.']
    }
]

const Features = () => (
    <StyledFeatures>
        <section className="features" id="features">
            <div className="row feature__container">
                {features.map(
                    (feature, i) => <Feature key={`${i}+${feature.title}`} {...feature} />
                )}
            </div>
        </section>
    </StyledFeatures>
)

export default Features