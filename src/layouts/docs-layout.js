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
import Layout from '../layouts/layout'
import DocSideBar from '../components/DocSideBar'
import DocTopicChooser from '../components/DocTopicChooser'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { breakpoints } from '../utils/variables'
import DocArrowNavigators from '../components/DocArrowNavigators'

const DocContainer = styled.div`
    display: flex;

    .main {
        position: relative;
        overflow-x: hidden;
        @media(max-width: ${breakpoints.xmd}) {
            padding: 15rem 3rem ;
        }

        @media(min-width: ${breakpoints.xmd}) {
            width: 70%;
        }

        @media(max-width: ${breakpoints.xmd}) {
            min-width: 100vw;
        }
    }

    .docs-row {
        width: 85%;
        max-width: 100rem;
        margin: 0 auto;
        padding-bottom: 10rem;

        @media(max-width: ${breakpoints.sm}) {
            width: 100%;
        }

        @media(min-width: ${breakpoints.sm}) {
            min-height: 90rem;
        }
    }

    h1 {
        margin-bottom: 3rem;
    }

    h2 {
        margin: 2.5rem 0;
        font-size: 2.6rem;
    }

    p {
        margin: 1rem 0;
    }

    ul {
        margin-bottom: 3rem;
        list-style-position: inside;

        ul {
            margin-left: 3rem;
            margin-bottom: 0;
        }
    }

    li {
        margin-top: .8rem;
    }

    li > p {
        display: inline;
    }

    code,
    pre {
        max-width: 100%;
    }

    .doc-image {
        width: 100%;
        margin: 2rem 0;
        margin-right: auto;
        box-shadow: 0 1.5rem 3rem rgba(0,0,0, .25);
    }
`

const DocsLayout = ({children, canonical, context}) => (
    <Layout canonical={canonical}>
        <DocContainer>
            <DocSideBar />
            <DocTopicChooser />
            <div className="main">
                <div>
                    <div className="docs-row">
                        <Nav />
                        {children}
                        <DocArrowNavigators {...context} />
                    </div>
                    <Footer />
                </div>
            </div>
        </DocContainer>
    </Layout>
)

export default DocsLayout