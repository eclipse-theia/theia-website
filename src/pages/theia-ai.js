import React from 'react';

import Layout from '../layouts/layout';
import TheiaAIHeader from '../components/index/TheiaAIHeader';
import TheiaAIUSP from '../components/index/TheiaAIUSP';
import TheiaAIOutro from '../components/index/TheiaAIOutro';
import Footer from '../components/Footer';
import TheiaAIFeatures from '../components/index/TheiaAIFeatures';
import TheiaAIVideosThumbnails from '../components/index/TheiaAIVideosThumbnails';
import HeadWithTheiaAI from '../layouts/headwithTheiaAI';

export const Head = () => (
    <HeadWithTheiaAI
        canonical="/"
        title="Theia AI: The Open Framework for Building AI-native Custom Tools and IDEs"
        description="Transform your domain-specific tools and specialized IDEs with seamlessly integrated AI capabilities while maintaining complete control over your implementation."
    />
);

export default ({ pageContext }) => {
    return (
        <Layout canonical='/'>
            <TheiaAIHeader />
            <main role="main">
                <TheiaAIUSP />
                <TheiaAIVideosThumbnails />
                <TheiaAIFeatures adopters={pageContext.adopters} />
                <TheiaAIOutro />
            </main>
            <Footer background={true} />
        </Layout>
    )
}