import React from 'react';

import Layout from '../layouts/layout';
import Header from '../components/index/Header';
import TheiaIDEFeatures from '../components/index/TheiaIDEFeatures';
import TheiaIDEHeader from '../components/index/TheiaIDEHeader';
import VSCodeExtensions from '../components/index/VSCodeExtensions';
import TheiaIDEDownloads from '../components/index/TheiaIDEDownloads';
import TheiaIDEExtensible from '../components/index/TheiaIDEExtensible';
import Footer from '../components/Footer';
import HeadWithIDESchema from '../layouts/headwithIDEschema';

export const Head = HeadWithIDESchema

export default ({ pageContext }) => {
    return (
        <Layout canonical='/'>
            <Header />
            <main role="main">
                <TheiaIDEHeader />
                <VSCodeExtensions />
                <TheiaIDEFeatures adopters={pageContext.adopters}/>
                <TheiaIDEExtensible />
                <TheiaIDEDownloads />
            </main>
            <Footer background={true} />
        </Layout>
    )
}