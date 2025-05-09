import React from 'react';
import BaseHead from './basehead';

const HeadWithIDESchema = ({ canonical, title, description }) => (
    <>
        <BaseHead canonical={canonical} title={title} description={description} />
        {/* JSON-LD for Theia IDE */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Theia IDE",
                    "url": "https://theia-ide.org/#theiaide",
                    "image": "https://theia-ide.org/static/TheiaIDE.png",
                    "description": "Theia IDE is a modern, open-source, and flexible development environment (IDE) for developers on desktop and browser, featuring advanced AI-powered capabilities with full control over AI interactions. It's the open alternative to VS Code (not a fork) and its AI features are the open alternative to Github Copilot, Cursor etc.",
                    "operatingSystem": "Linux, macOS, Windows",
                    "applicationCategory": "DeveloperApplication",
                    "applicationSubCategory": "IntegratedDevelopmentEnvironment",
                    "softwareVersion": "1.55.0",
                    "softwareRequirements": "Compatible with VS Code extensions",
                    "author": {
                        "@type": "Organization",
                        "name": "Eclipse Foundation",
                        "url": "https://www.eclipse.org/"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Eclipse Foundation",
                        "url": "https://www.eclipse.org/"
                    },
                    "releaseNotes": "https://eclipsesource.com/blogs/2024/11/07/eclipse-theia-1-54-release-news-and-noteworthy/",
                    "keywords": [
                        "open-source IDE",
                        "development environment",
                        "AI-powered IDE",
                        "AI coding",
                        "VS Code extensions",
                        "VS Code alternative",
                        "Github Copilot alternative",
                        "Cursor alternative"
                    ],
                    "license": "Eclipse Public License 2.0",
                    "featureList": [
                        "AI-powered",
                        "Open-source",
                        "Compatible with VS Code extensions",
                        "Cross-platform support",
                        "Runs in browser and desktop environments"
                    ]
                })
            }}
        />
    </>
);

export default HeadWithIDESchema;
