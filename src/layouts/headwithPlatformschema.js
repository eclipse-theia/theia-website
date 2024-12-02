import React from 'react'
import BaseHead from './basehead'

const HeadWithPlatformSchema = ({ canonical }) => (
  <>
    <BaseHead canonical={canonical} />
    {/* JSON-LD for Theia Platform */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Theia Platform",
          "url": "https://theia-ide.org/",
          "image": "https://theia-ide.org/static/TheiaPlatform.png",
          "description": "Theia Platform is an extensible open-source framework for building customizable integrated development environments (IDEs) for desktop and web.",
          "applicationCategory": "DeveloperApplication",
          "applicationSubCategory": "FrameworkApplication",
          "softwareRequirements": "Compatible with VS Code extensions",
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
            "custom IDE", "build custom IDE", "custom IDE Framework",
            "alternative VS Code", "alternative Code OSS", "build custom tool",
            "custom tool framework"
          ],
          "license": "Eclipse Public License 2.0",
          "featureList": [
            "AI-powered", "Open-source", "Build tailored IDEs and Tools",
            "Cross-platform support", "VS Code extension compatibility",
            "Desktop, browser and cloud support"
          ]
        })
      }}
    />
  </>
)

export default HeadWithPlatformSchema
