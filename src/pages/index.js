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
import SponsoringHint from '../components/SponsoringHint';

export const Head = () => (
    <HeadWithIDESchema
        canonical="/"
        title="Theia IDE – AI-Native Open-Source Cloud and Desktop IDE"
        description="Theia IDE is an AI-native, open-source development environment for desktop and cloud. Bring your own API key and connect any LLM — cloud, self-hosted, or fully local — with no vendor lock-in and no telemetry on your code. Not a VS Code fork, and fully compatible with VS Code extensions."
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
                <SponsoringHint />
                <TheiaIDEDownloads />
            </main>
            <Footer background={true} />
        </Layout>
    )
}