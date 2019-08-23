import React from 'react'
import { Global, css } from '@emotion/core'
import Helmet from 'react-helmet'
import useSiteMetadata from '../hooks/use-site-metadata'
import { fontSizes, colors, grid, breakpoints } from '../utils/variables'
import Favicon from '../resources/favicon.ico'

const Layout = ({ children, canonical }) => {
    const { title, description } = useSiteMetadata()
    return (
        <>
            <Global styles={css`
                /* --------------------------------------------- */
                /* ----- Basic Setup ----- */
                /* --------------------------------------------- */

                *,
                *::before,
                *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: inherit;
                }

                html {
                    font-size: 62.5%;

                    @media(max-width: ${breakpoints.md}) {
                        font-size: 58.5%;
                    }
                }

                body {
                    font-family: 'Open sans', sans-serif;
                    font-size: ${fontSizes.default};
                    color: ${colors.greyOne};
                    line-height: 1.5;
                    box-sizing: border-box;
                    overflow-x: hidden;
                }

                a {
                    text-decoration: none;
                    color: #6692d4;
                }

                a,
                button {
                    cursor: pointer;
                }

                button,
                input {
                    font-family: inherit;
                }

                /* --------------------------------------------- */
                /* ----- Headlines and Paragraphs ----- */
                /* --------------------------------------------- */

                h1,
                h2,
                h3,
                h4 {
                    font-family: 'Anonymous Pro', monospace;
                    font-weight: 100;
                }

                .heading-primary {
                    font-size: 6rem;
                }

                .heading-tertiary {
                    font-size: 2.5rem;
                }

                /* --------------------------------------------- */
                /* ----- Layout Helpers ----- */
                /* --------------------------------------------- */

                .row {
                    max-width: ${grid.maxWidth};
                    width: 80%;
                    margin: 0 auto;

                    @media (max-width: ${breakpoints.md}) {
                        width: 95%;
                    }
                }

                /* --------------------------------------------- */
                /* ----- Buttons ----- */
                /* --------------------------------------------- */

                .btn {
                    display: inline-block;
                    padding: .8rem 1.6rem;
                    color: inherit;
                    text-decoration: none;
                    border: 2px solid;
                    border-radius: 3px;
                }
            `} />
            <Helmet>
                <html lang='en' />
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#FFFFFF" />
                {
                    canonical ? <link rel="canonical" href={canonical} /> : null
                }
	            <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href={Favicon} />
            </Helmet>
            <>
                {children}
            </>
        </>
    )
}

export default Layout