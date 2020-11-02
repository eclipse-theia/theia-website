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
import { Link } from 'gatsby'
import Feature from './Feature'

const StyledFeatures = styled.div`
    .features {
        padding: 12rem 0;
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
        paragraphs: ['Not sure whether you need a web or desktop version or both?', 'With Theia you can develop one IDE and run it in browsers or native desktop application from a single source.']
    },
    {
        img: <img src={IconOpenSource} alt="Vendor Neutral Open Source" />,
        title: "Vendor Neutral",
        paragraphs: ['The Theia project is hosted at the Eclipse Foundation, a not-for-profit corporation, and is developed by a diverse community.', <>
            Unlike other "open-source" projects, projects hosted at an Open-Source Foundation are protected against single-vendor decisions against the interest of the diverse community.
            Learn more <a href="https://www.eclipse.org/projects/dev_process/">here</a>.
        </>]
    },
    {
        img: <img src={IconExtension} alt="Icon Extension" />,
        title: "Extensible",
        paragraphs: ['Theia is designed in a modular way to allow extenders and adopters customizing and extending every aspect of it.', 
        <>
            Composing a custom IDE-like product is as easy as listing all needed extensions in a package.json file. Adding new
            functionality by implementing <Link to='/docs/authoring_extensions'>
            your own extensions</Link> is easy, too and provides all the flexibility you need.
        </>]
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