import React from 'react'
import BaseHead from './basehead'

const HeadWithTheiaAI = ({ canonical, title, description }) => (
  <>
    <BaseHead canonical={canonical} title={title} description={description} />
    {/* JSON-LD for Theia AI */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Theia AI",
          "url": "https://theia-ide.org/theia-ai/",
          "image": "https://theia-ide.org/static/TheiaPlatform.png",
          "description": "Theia AI is an open-source, vendor-neutral AI harness platform for building AI-native tools and IDEs. It provides a ready-to-use default harness, customizable agents, flexible LLM integration, and support for MCP, Agent Skills, Agent Plugins, and other emerging agent standards.",
          "applicationCategory": "DeveloperApplication",
          "applicationSubCategory": "AIFramework",
          "operatingSystem": "Linux, macOS, Windows",
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
          "keywords": [
            "AI harness", "agent harness", "open source AI harness",
            "AI harness platform", "vendor-neutral AI",
            "AI-native tools", "AI IDE", "custom AI tools",
            "domain-specific AI", "AI integration framework",
            "customizable AI agents", "custom AI chat interface",
            "LLM IDE integration", "custom AI experiences",
            "building AI-native tools", "how to build AI IDE",
            "building custom AI tools", "how to build AI agents",
            "MCP", "Model Context Protocol", "Agent Skills", "Agent Plugins"
          ],
          "license": "Eclipse Public License 2.0",
          "featureList": [
            "Ready-to-use Default Harness", "Specialized AI Agents", "Interactive AI Chats",
            "Context-Aware AI Support", "Organized AI Change Suggestions",
            "Custom Editor AI Integration", "Advanced Prompt Management",
            "Model Context Protocol Support", "Agent Skills", "Agent Plugins",
            "Flexible LLM Integration",
            "Customizable AI Components", "Complete Control Over User Experience"
          ]
        })
      }}
    />
  </>
)

export default HeadWithTheiaAI