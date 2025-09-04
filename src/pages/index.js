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
import YouTubeVideosThumbnails from '../components/index/YouTubeVideosThumbnails';

export const Head = () => (
    <HeadWithIDESchema
        canonical="/"
        title="Theia IDE – AI-Native Open-Source Cloud and Desktop IDE"
        description="Theia IDE is an AI-native, modern, open-source development environment that runs on desktop and in the cloud. Not a VS Code fork, Theia offers transparent AI assistance with full control over your data, supports the Language Server Protocol (LSP), and is fully compatible with VS Code extensions."
    />
);

export default ({ pageContext }) => {
    return (
        <Layout canonical='/'>
            <Header />
            <main role="main">
                <TheiaIDEHeader />
                <YouTubeVideosThumbnails />
                <VSCodeExtensions />
                <TheiaIDEFeatures adopters={pageContext.adopters}/>
                <TheiaIDEExtensible />
                <TheiaIDEDownloads />
            </main>
            <Footer background={true} />
        </Layout>
    )
}