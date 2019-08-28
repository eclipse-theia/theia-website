import React from 'react'
import { Global, css } from '@emotion/core'
import Helmet from 'react-helmet'
import useSiteMetadata from '../hooks/use-site-metadata'
import { fontSizes, colors, grid, breakpoints } from '../utils/variables'
import Favicon from '../resources/favicon.png'

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
                    font-family: 'Montserrat','Work Sans', sans-serif;
                    font-size: ${fontSizes.default};
                    color: ${colors.greyOne};
                    line-height: 1.6;
                    box-sizing: border-box;
                    overflow-x: hidden;
                }

                a {
                    text-decoration: none;
                    color: ${colors.lightBlue};
                    transition: all .2s;

                    &:hover {
                        color: ${colors.blue};
                        text-decoration: underline;
                    }
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
                    font-size: 5.5rem;
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
                    padding: 1.3rem 3rem;
                    color: inherit;
                    text-decoration: none;
                    border: 2px solid;
                    border-radius: 10rem;
                    transition: all .3s;
                    font-weight: 500;

                    &:hover,
                    &:active,
                    &--cta {
                        color: #fff;
                        background: ${colors.greyOne};
                        border-color: ${colors.greyOne};
                    }

                    &:hover,
                    &:focus {
                        transform: translateY(-3px);
                        box-shadow: 0 .8rem 1.6rem rgba(0,0,0, .2);
                    }

                    &:active {
                        transform: translateY(-1px);
                        box-shadow: 0 .4rem .8rem rgba(0,0,0, .2);
                    }

                    &--cta {
                        box-shadow: 0 .3rem .6rem rgba(0,0,0, .2);
                    }
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
                <link rel="icon" type="image/png" href={Favicon} sizes="any" />
                <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap" rel="stylesheet" />
            </Helmet>
            <>
                {children}
            </>
        </>
    )
}

export default Layout