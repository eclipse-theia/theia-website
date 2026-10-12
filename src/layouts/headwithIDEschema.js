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
                    "description": "Theia IDE is an AI-native, open-source, and flexible development environment (IDE) for developers on desktop and browser. Bring your own API key or subscription and connect any LLM — cloud, self-hosted, or fully local — with no vendor lock-in and no telemetry on your code or prompts. It's the open alternative to VS Code (not a fork) and its AI features are the open alternative to Github Copilot, Cursor etc.",
                    "operatingSystem": "Linux, macOS, Windows",
                    "applicationCategory": "DeveloperApplication",
                    "applicationSubCategory": "IntegratedDevelopmentEnvironment",
                    "softwareVersion": "1.76.0",
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
                    "releaseNotes": "https://eclipsesource.com/blogs/2026/10/08/eclipse-theia-1-76-release-news-and-noteworthy/",
                    "keywords": [
                        "open-source IDE",
                        "development environment",
                        "AI-native IDE",
                        "AI-powered IDE",
                        "AI coding",
                        "VS Code extensions",
                        "VS Code alternative",
                        "Github Copilot alternative",
                        "Cursor alternative",
                        "open source Cursor alternative",
                        "bring your own API key",
                        "BYOK",
                        "no vendor lock-in",
                        "self-hosted AI coding assistant",
                        "local LLM IDE",
                        "data sovereignty"
                    ],
                    "license": "Eclipse Public License 2.0",
                    "featureList": [
                        "AI-native",
                        "Bring your own API key",
                        "Any LLM provider, including self-hosted and local models",
                        "No telemetry on code, prompts or AI usage",
                        "Model Context Protocol (MCP) support",
                        "Agent Skills",
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
