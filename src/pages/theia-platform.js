/********************************************************************************
 * Copyright (C) 2024 EclipseSource and others.
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
import React from 'react';

import Layout from '../layouts/layout'
import PlatformHeader from '../components/index/PlatformHeader'
import Features from '../components/index/Features'
import Footer from '../components/Footer'
import ContributorsAndAdopters from '../components/index/ContributorsAndAdopters'
import Products from '../components/index/Products'
import GettingStarted from '../components/index/GettingStarted'
import IntrosToTheia from '../components/index/IntrosToTheia'
import SupportHint from '../components/SupportHint'
import HeadWithPlatformSchema from '../layouts/headwithPlatformschema';

export const Head = HeadWithPlatformSchema

export default ({ pageContext }) => {
    return (
        <Layout canonical='/'>
            <PlatformHeader />
            <main role="main">
                <Products />
                <Features />
                <SupportHint variant="platform" />
                <ContributorsAndAdopters adopters={pageContext.adopters}/>
                <GettingStarted/>
                <IntrosToTheia />
            </main>
            <Footer background={true} />
        </Layout>
    )
}