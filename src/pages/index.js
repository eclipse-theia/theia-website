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

import Layout from '../layouts/layout'
import Header from '../components/index/Header'
import Features from '../components/index/Features'
import Banner from '../components/index/Banner'
import Promos from '../components/index/Promos'
import Footer from '../components/Footer'
import ContributorsAndAdopters from '../components/index/ContributorsAndAdopters'
import Products from '../components/index/Products'
import GettingStarted from '../components/index/GettingStarted'
import IntrosToTheia from '../components/index/IntrosToTheia'


export default () => {
    return (
        <Layout canonical='/'>
            <Header />
            <main role="main">
                <Products />
                <Features />
                <ContributorsAndAdopters />
                <GettingStarted/>
                <IntrosToTheia />
                <Banner />
                <Promos />
            </main>
            <Footer background={true} />
        </Layout>
    )
}
