/********************************************************************************
 * Copyright (C) 2022 EclipseSource and others.
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
import LearnMore from '../../resources/learn-more.svg'
import TryIt from '../../resources/try-it.svg'
import AdoptIt from '../../resources/download.svg'
import Contribute from '../../resources/contribute.svg'
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
        img: <img src={TryIt} alt="Try it" />,
        title: "Try it",
        paragraphs: [<>
        Eclipse Theia is a framework for building tools and IDEs. You can try it by <a href="https://theia-ide.org/docs/composing_applications/">building your own IDE/tools based on Theia</a> within minutes. Alternatively, you can <a href="#theiaide">download and use the Theia IDE</a>, a template tool based on Eclipse Theia or <a href="https://try.theia-cloud.io/">try it online</a>.
        </>]
    },
    {
        img: <img src={LearnMore} alt="Learn more" />,
        title: "Learn more",
        paragraphs: [<>
            Learn more about Eclipse Theia, <a href="https://theia-ide.org/docs/">how to get started with it</a>, <a href="https://theia-ide.org/docs/composing_applications/">how to build your own tool/IDE</a> and <a href="https://theia-ide.org/docs/project_goals/">about the project's goals</a>. Browse the <a href="https://theia-ide.org/docs/">documentation</a> and <a href="https://theia-ide.org/resources/">resource section</a>. Also, checkout the available introduction video below!
        </>]
    },
    {
        img: <img src={AdoptIt} alt="Adopt it" />,
        title: "Adopt it",
        paragraphs: [ <>
           Checkout the <a href="https://github.com/eclipse-theia/theia/releases">available releases</a> including changelogs, migration guides and news and noteworthy articles. Browse the <a href="https://github.com/eclipse-theia/theia">project's sources</a> and consume/download Theia packages from the <a href="https://www.npmjs.com/search?q=keywords:theia-extension">npm registry</a>.
        </>]
    },
    {
        img: <img src={Contribute} alt="Contribute" />,
        title: "Contribute",
        paragraphs: [<>
        Eclipse Theia is an open source project governed by the Eclipse Foundation. We are happy for any contributions! Please check out the <a href="https://github.com/eclipse-theia/theia/blob/master/CONTRIBUTING.md">contribution guide</a>, our <a href="https://github.com/eclipse-theia/theia/blob/master/CODE_OF_CONDUCT.md">code of conduct</a> and consider starting with <a href="https://github.com/eclipse-theia/theia/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22">good first issues</a>.
        </>]
    }
]

const GettingStarted = () => (
    <StyledFeatures>
        <section className="row features" id="gettingstarted">
            <h3 className="heading-tertiary">Getting started with the Eclipse Theia Platform</h3>
            <div className="feature__container">
                {features.map(
                    (feature, i) => <Feature key={`${i}+${feature.title}`} {...feature} />
                )}
            </div>
        </section>
    </StyledFeatures>
)

export default GettingStarted
