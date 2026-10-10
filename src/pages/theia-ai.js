import React from 'react';

import Layout from '../layouts/layout';
import TheiaAIHeader from '../components/index/TheiaAIHeader';
import TheiaAIUSP from '../components/index/TheiaAIUSP';
import TheiaAIOutro from '../components/index/TheiaAIOutro';
import Footer from '../components/Footer';
import TheiaAIFeatures from '../components/index/TheiaAIFeatures';
import TheiaAIVideosThumbnails from '../components/index/TheiaAIVideosThumbnails';
import SupportHint from '../components/SupportHint';
import SponsoringHint from '../components/SponsoringHint';
import HeadWithTheiaAI from '../layouts/headwithTheiaAI';

export const Head = () => (
    <HeadWithTheiaAI
        canonical="/theia-ai/"
        title="Theia AI – Open-Source AI Harness Platform for Tools and IDEs"
        description="Open-source, vendor-neutral AI harness platform for building AI-native tools and IDEs. Ready-to-use default harness, customizable agents, any LLM, MCP support."
    />
);

export default ({ pageContext }) => {
    return (
        <Layout canonical='/'>
            <TheiaAIHeader />
            <main role="main">
                <TheiaAIUSP />
                <TheiaAIVideosThumbnails />
                <SupportHint variant="ai" />
                <TheiaAIFeatures adopters={pageContext.adopters} />
                <SponsoringHint />
                <TheiaAIOutro />
            </main>
            <Footer background={true} />
        </Layout>
    )
}