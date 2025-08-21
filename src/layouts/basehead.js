import React from 'react';
import useSiteMetadata from '../hooks/use-site-metadata';
import AppleTouchIcon from '../resources/apple-touch-icon.png';
import Favicon from '../resources/theia-favicon.svg';
import Favicon196 from '../resources/theia-favicon-196x196.png';

const getCanonicalUrl = (canonical) => {
        if (!canonical) return null;
        // If it's already an absolute URL, use it as-is
        if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
            return canonical;
        }        
        // Otherwise, prepend the site URL
        return `https://theia-ide.org${canonical}`;
    };

const BaseHead = ({ canonical, title: customTitle, description: customDescription }) => {
    const { title: defaultTitle, description: defaultDescription } = useSiteMetadata();
    const pageTitle = customTitle || defaultTitle;
    const pageDescription = customDescription || defaultDescription;

    return (
        <>
            <html lang="en" />
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#FFFFFF" />
            {canonical && <link rel="canonical" href={getCanonicalUrl(canonical)} />}
            <link rel="apple-touch-icon" type="image/png" href={AppleTouchIcon} sizes="180x180" />
            <link rel="icon" type="image/png" href={Favicon196} sizes="196x196" />
            <link rel="icon" type="image/svg+xml" href={Favicon} sizes="any" />
            <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap" rel="stylesheet" />
        </>
    );
};

export default BaseHead;
