/********************************************************************************
 * Copyright (C) 2021 EclipseSource and others.
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
import Layout from '../layouts/layout'
import Resources from '../components/Resources'
import Footer from '../components/Footer'
import BaseHead from '../layouts/basehead'

export const Head = () => (
    <BaseHead
        canonical="/resources/"
        title="Theia Resources – Videos, Articles and Talks on Eclipse Theia"
        description="Curated videos, articles, talks and tutorials about Eclipse Theia: the Theia Platform, Theia AI and the AI-powered Theia IDE."
    />
)

export default () => {
    return (
        <Layout canonical='/'>
            <main role="main">
                <Resources />
            </main>
            <Footer background={true} />
        </Layout>
    )
}
