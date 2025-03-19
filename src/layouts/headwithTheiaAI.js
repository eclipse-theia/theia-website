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
          "description": "Theia AI is an open framework that empowers tool vendors to build custom, AI-native tools and IDEs.",
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
            "AI-native tools", "AI IDE", "custom AI tools", 
            "domain-specific AI", "AI integration framework", 
            "customizable AI agents", "custom AI chat interface",
            "LLM IDE integration", "custom AI experiences",
            "building AI-native tools", "how to build AI IDE", 
            "building custom AI tools", "how to build AI agents"
          ],
          "license": "Eclipse Public License 2.0",
          "featureList": [
            "Specialized AI Agents", "Interactive AI Chats",
            "Context-Aware AI Support", "Organized AI Change Suggestions",
            "Custom Editor AI Integration", "Advanced Prompt Management",
            "Model Context Protocol Support", "Flexible LLM Integration",
            "Customizable AI Components", "Complete Control Over User Experience"
          ]
        })
      }}
    />
  </>
)

export default HeadWithTheiaAI