require("prismjs/themes/prism-tomorrow.css")

// Re-scroll to anchor after all resources (images) have loaded.
// gatsby-remark-autolink-headers calculates scroll position in a
// requestAnimationFrame before images load, which causes incorrect
// positioning on image-heavy doc pages.
exports.onInitialClientRender = () => {
    const hash = window.location.hash
    if (!hash) return

    const scrollToHash = () => {
        const id = decodeURI(hash.replace('#', ''))
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView()
        }
    }

    if (document.readyState === 'complete') {
        // Resources already loaded. Use double rAF to ensure we run
        // after the autolink plugin's rAF handler which would otherwise
        // override our scroll with an incorrect position.
        requestAnimationFrame(() => requestAnimationFrame(scrollToHash))
    } else {
        // Wait for all resources (images) to load, then re-scroll.
        // The load event fires well after the plugin's rAF, so our
        // scroll will be the final one with correct positions.
        window.addEventListener('load', scrollToHash, { once: true })
    }
}
