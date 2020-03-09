import React from 'react'

import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../utils/variables'
import Layout from '../layouts/layout'
import Footer from '../components/Footer'
import IconExtension from '../resources/icon-extension.svg'
import IconCloudScreen from '../resources/icon-cloud-screen.svg'
import IconOpenSource from '../resources/icon-open-source.svg'
import TheiaLogoEdited from '../resources/theia-logo-edited.svg'
import CompletionVideo from '../resources/completion.mp4'
import TermianlVideo from '../resources/terminal.mp4'
import LayoutVideo from '../resources/layout.mp4'
import Header from '../components/Header'

const Index = styled.div`

    /* ------------------------------------------ */
    /* ----- Banner ----- */
    /* ------------------------------------------ */

    .banner {
        margin-top: 5rem;
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
            margin-top: 5rem;
        }

        p {
            margin-bottom: 2rem;
        }

        li {
            margin-left: 2rem;
        }

        strong {
            font-weight: 500;
        }

        img {
            display: block;
            height: 26rem;
            transform: translateX(-18rem) translateY(4rem);
        }

        div {
            width: 50%;
            max-width: 45rem;
            margin: 0 auto;

            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                img {
                    margin: 0 auto 5rem;
                    height: 18rem;
                    transform: none;
                }
            }
        }

        h3 {
            margin-bottom: 2rem;
            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
                margin: 0 auto;
                margin-bottom: 2rem;
                text-align: center;
            }
        }
    }

    /* ------------------------------------------ */
    /* ----- Section Promos ----- */
    /* ------------------------------------------ */

    .promos {
        margin: 15rem 0;
    }

    .promo {
        display: flex;
        border: 2px solid #ebebeb;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
            max-width: 60rem;
            margin: 0 auto;
        }

        &:not(:last-child) {
            margin-bottom: 10rem;
        }

        &__text {
            width: 50%;
            padding: 9rem 5rem;

            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
            }
        }

        &__media {
            position: relative;
            width: 50%;
            z-index: -1000;

            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
            }

            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #8c9bae;
                z-index: 1000;
                opacity: .1;
            }
        }

        &__video {
            width: 100%;
        }

        p {
            margin-top: 3rem;
        }

        &--diff {
            @media(max-width: ${breakpoints.md}) {
                flex-direction: column-reverse;
            }
        }
    }

`

export default () => {
    return (
        <Layout canonical='https://theia-ide.org/'>
            <Index>

                <Header />

                {/* ***** Main ***** */}

                <main role="main">

                    {/* ***** Section Features ***** */}

                    <section className="features" id="features">
                        <div className="row feature__container">
                            <div className="feature">
                                <div>
                                    <img src={IconCloudScreen} alt="Cloud Screen" />
                                    <h3 className="heading-tertiary">Cloud & Desktop</h3>
                                </div>
                                <p>
                                    Not sure whether you need a web or desktop version or both?
                                </p>
                                <p>
                                    With Theia you can develop one IDE and run it in browsers or native desktop application from a single source.
                                </p>
                            </div>
                            <div className="feature">
                                <div>
                                    <img src={IconOpenSource} alt="Vendor Neutral Open Source" />
                                    <h3 className="heading-tertiary">Vendor Neutral</h3>
                                </div>
                                <p>
                                    The Theia project is hosted at the Eclipse Foundation, a not-for-profit corporation, and is developed by a diverse community.
                                </p>
                                <p>
                                    Unlike other "open-source" projects, projects hosted at an Open-Source Foundation are protected against single-vendor decisions against the interest of the diverse community.
                                    Learn more <a href="https://www.eclipse.org/projects/dev_process/">here</a>.
                                </p>
                            </div>
                            <div className="feature">
                                <div>
                                    <img src={IconExtension} alt="Icon Extension" />
                                    <h3 className="heading-tertiary">Extensible</h3>
                                </div>
                                <p>
                                    Theia is designed in a modular way to allow extenders and adopters customizing and extending every aspect of it.
                                </p>
                                <p>
                                    Composing a custom IDE-like product is as easy as listing all needed
                                    extensions in a package.json file. Adding new
                                    functionality by implementing <Link to='/docs/authoring_extensions'>
                                        your own extensions</Link> is easy, too and provides all the flexibility you need.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***** Section Banner ***** */}

                    <section className="row banner">
                        <div>
                            <img src={TheiaLogoEdited} alt="Theia Logo" />
                        </div>
                        <div>
                            <h3 className="heading-tertiary">Theia versus VS Code</h3>
                            <p>We believe <strong>VS Code is an excellent product</strong>. That is why Theia embraces many of the design decisions and even directly supports VS Code extensions.</p>
                            <div style={{ width: '100%', margin: '2rem 0', maxWidth: 'auto' }}>The most significant differences are:
                                <ul>
                                    <li><strong>Theia's architecture is more modular</strong> and allows for way more customizations,</li>
                                    <li>Theia is <strong>designed from the ground to run on Desktop and Cloud</strong>, and</li>
                                    <li>Theia is developed under a <strong>vendor-neutral Open-Source Foundation</strong>.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* ***** Section Promo ***** */}

                    <section className="promos">
                        <div className="row">
                            <div className="promo">
                                <div className="promo__text">
                                    <h3 className="heading-tertiary">Supports JavaScript, Java, Python and many more</h3>
                                    <p>Built on the <a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noopener noreferrer">Language Server Protocol</a>,
                            Theia benefits from a growing ecosystem of <e>over 60 available language servers</e>, delivering intelligent editing support
                            for all major programming languages.</p>
                                </div>
                                <div className="promo__media">
                                    <video autoPlay loop muted playsInline className="promo__video">
                                        <source src={CompletionVideo} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                            <div className="promo promo--diff">
                                <div className="promo__media">
                                    <video autoPlay loop muted playsInline className="promo__video">
                                        <source src={TermianlVideo} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="promo__text">
                                    <h3 className="heading-tertiary">Integrated Terminal</h3>
                                    <p>Theia integrates a full featured terminal, that reconnects on browser reload keeping the full history.</p>
                                </div>
                            </div>
                            <div className="promo">
                                <div className="promo__text">
                                    <h3 className="heading-tertiary">Flexible Layout</h3>
                                    <p>Theia's shell is based on <a href="https://phosphorjs.github.io/" target="blank">PhosphorJS</a>,
                            which provides a solid foundation for draggable dock layouts.</p>
                                </div>
                                <div className="promo__media">
                                    <video autoPlay loop muted playsInline className="promo__video">
                                        <source src={LayoutVideo} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <Footer background={true} />

            </Index>
        </Layout>
    )
}
