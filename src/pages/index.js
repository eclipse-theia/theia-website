import React from 'react'

import Layout from '../layouts/layout'
import Header from '../components/index/Header'
import Features from '../components/index/Features'
import Banner from '../components/index/Banner'
import Promos from '../components/index/Promos'
import Footer from '../components/Footer'

export default () => {
    return (
        <Layout canonical='/'>
            <Header />
            <main role="main">
                <Features />
                <Banner />
                <Promos />
            </main>
            <Footer background={true} />
        </Layout>
    )
}
