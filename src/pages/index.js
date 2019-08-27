import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../utils/variables'
import Layout from '../layouts/layout'
import Nav from '../components/Nav'
import DocImage from '../components/DocImage'
import Footer from '../components/Footer'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'
import Background from '../resources/background-image.png'
import TypeFoxLogo from '../resources/typefox.png'
import RedHatLogo from '../resources/redhat.svg'
import IBMLogo from '../resources/ibm.svg'
import GoogleLogo from '../resources/google.svg'
import ARMLogo from '../resources/arm.svg'
import EricssonLogo from '../resources/ericsson.svg'
import SAPLogo from '../resources/sap.svg'
import IconExtension from '../resources/icon-extension.svg'
import IconCloudScreen from '../resources/icon-cloud-screen.svg'
import IconOpenSource from '../resources/icon-open-source.svg'
import TheiaLogoEdited from '../resources/theia-logo-edited.svg'
import CompletionVideo from '../resources/completion.mp4'
import TermianlVideo from '../resources/terminal.mp4'
import LayoutVideo from '../resources/layout.mp4'

const Index = styled.div`

    /* ------------------------------------------ */
    /* ----- Header ----- */
    /* ------------------------------------------ */

    .header {
        position: relative;
        background-image: url(${Background});
        background-size: cover;
        background-repeat: no-repeat;
        border-bottom: 10px solid #f8f8f8;

        @media(max-width: ${breakpoints.xmd}) {
            padding-top: 15rem;
        }

        &__logo-box {
            margin-bottom: 3rem;
        }

        &__logo {
            height: 3rem;
        }

        h1 {
            margin-bottom: 3rem;
        }

        .btn {
            &:not(:last-child) {
                margin-right: 3rem;
            }
        }

        &__github-details {
            display: flex;
            justify-content: flex-end;
            margin: 5rem 0 0;
        }

        iframe {
            height: 2.5rem;
            width: 11rem;
        }

        &__screenshot {

        }

        .heading-tertiary {
            padding-bottom: 40px;
        }
    }

    /* ------------------------------------------ */
    /* ----- Contributors ----- */
    /* ------------------------------------------ */

    .contributors {
        padding-bottom: 5rem;

        &__images {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 1rem;

            @media(max-width: 50rem) {
                text-align: center;
            }
        }

        &__image {
            height: 100%;
            max-width: 17rem;
            object-fit: contain;

            &-container {
                height: 4rem;

                @media(max-width: 50rem) {
                    width: 40%;
                    margin-bottom: 4rem;
                }
            }

            &--ericsson {
                transform: scale(1.3);
            }

            &--ibm {
                transform: scale(.8);
            }

            &--arm {
                transform: scale(.6);
            }

            &--sap {
                @media(min-width: ${breakpoints.md}) {
                    transform: translateX(2.5rem);
                }
            }
        }
    }

    /* ------------------------------------------ */
    /* ----- Features ----- */
    /* ------------------------------------------ */

    .features {
        padding: 12rem 0;
    }

    .feature {
        flex: 3.33%;

        &__container {
            display: flex;

            @media(max-width: ${breakpoints.md}) {
                flex-direction: column;
            }
        }

        &:not(:last-child) {
                margin-right: 8rem;

            @media(max-width: ${breakpoints.md}) {
                margin: 0 0 4rem 0;
            }
        }

        & > div {
            text-align: center;
        }

        h3 {
            margin: 2rem 0 4rem;
        }

        & > p {
            margin: 0 auto;
            margin-bottom: 1rem;
            max-width: 45rem;
        }

        img {
            height: 10rem;
        }
    }

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
            transform: translateX(-18rem) translateY(-0rem);
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
            width: 50%;

            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
            }
        }

        &__video {
            width: 100%;
        }

        p {
            margin-top: 3rem;
        }
    }

`

export default () => {
    return (
        <Layout canonical='https://theia-ide.org/'>
            <Index>

                {/* ***** Header ***** */}

                <header className='header' role="banner">
                    <div className="row">
                        <Nav />
                        <div className="header__text-box">
                            <div className="header__logo-box">
                                <img className="header__logo" src={TheiaLogoDark} alt="theia logo" />
                            </div>
                            <h1 className="heading-primary">
                                Cloud & Desktop IDE
                            </h1>
                            <h2 className="heading-tertiary" style={{fontSize: '2.2rem'}}>
                                Eclipse Theia is an extensible platform to develop multi-language Cloud & Desktop IDEs with state-of-the-art web technologies.
                            </h2>
                            <a className="btn" href="https://github.com/theia-ide/theia" target="_blank"  rel="noopener noreferrer">View on GitHub</a>
                            <a className="btn" href="https://gitpod.io#https://github.com/theia-ide/theia" target="_blank"  rel="noopener noreferrer">Try in Gitpod</a>
                        </div>
                        <div className="header__github-details">
                            <iframe title="Github Star Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=theia-ide&repo=theia&type=star&count=true" frameBorder={0} scrolling={0} />
                            <iframe title="Github Fork Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=theia-ide&repo=theia&type=fork&count=true" frameBorder={0} scrolling={0} />
                        </div>
                    </div>

                    <DocImage name="theia-screenshot.png" alt="Theia IDE Screenshot" />

                    <div className="row">

                        {/* ***** Contributors ***** */}

                        <section className="contributors">
                            <h3 className="heading-tertiary">Contributors & Adopters</h3>
                            <div className="contributors__images">
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://typefox.io">
                                        <img className="contributors__image" src={TypeFoxLogo} alt="Typefox Logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://www.redhat.com">
                                        <img className="contributors__image" src={RedHatLogo} alt="Redhat Logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://www.ibm.com">
                                        <img className="contributors__image contributors__image--ibm" src={IBMLogo} alt="IBM logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://google.com">
                                        <img className="contributors__image contributors__image--google" src={GoogleLogo} alt="Google logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://www.arm.com">
                                        <img className="contributors__image contributors__image--arm" src={ARMLogo} alt="ARM logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://www.ericsson.com">
                                        <img className="contributors__image contributors__image--ericsson" src={EricssonLogo} alt="Ericsson logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank"  rel="noopener noreferrer" href="https://www.sap.com/">
                                        <img className="contributors__image contributors__image--sap" src={SAPLogo} alt="Sap logo" />
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </header>

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
                            <h3 className="heading-tertiary">Theia vs. VS Code</h3>
                            <p>We belief <strong>VS Code is an excellent product</strong>. That is why Theia embraces many of the design decisions and even directly supports VS Code extensions.</p>
                            <div style={{width: '100%', margin: '2rem 0', maxWidth: 'auto'}}>The most significant differences are:
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
                                    <p>Built on the <a href="https://microsoft.github.io/language-server-protocol/" target="_blank"  rel="noopener noreferrer">Language Server Protocol</a>,
                            Theia benefits from a growing ecosystem of <e>over 60 available language servers</e>, delivering intelligent editing support
                            for all major programming languages.</p>
                                </div>
                                <div className="promo__media">
                                    <video autoPlay loop muted playsInline className="promo__video">
                                        <source src={CompletionVideo} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                            <div className="promo">
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
                            which provides a solid foundation for dragable dock layouts.</p>
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
