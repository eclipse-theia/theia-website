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

export const Head = () => (
    <HeadWithIDESchema
        canonical="/"
        title="Theia IDE – Open-Source Cloud and Desktop IDE"
        description="Theia IDE is a modern, open-source development environment that runs on desktop and in the cloud. Not a VS Code fork, Theia supports the Language Server Protocol (LSP), is fully compatible with VS Code extensions, and features advanced AI support — all while keeping full control of your data. Explore the open and flexible alternative to VS Code today!"
    />
);

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