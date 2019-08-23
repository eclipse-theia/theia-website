import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../utils/variables'
import Layout from '../layouts/layout'
import Nav from '../components/Nav'
import Screenshot from '../components/Screenshot'
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
import IconVSCode from '../resources/vscode.svg'
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
            margin-bottom: 2rem;
        }

        &__logo {
            height: 2.8rem;
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
            max-width: 9.5rem;
            max-height: 2rem;

            &:not(:last-child) {
                margin-right: 2rem;
            }
        }

        &__screenshot {

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
            margin-top: 3rem;

            @media(max-width: 50rem) {
                text-align: center;
            }
        }

        &__image {
            height: 100%;
            max-width: 17rem;
            object-fit: contain;

            &-container {
                height: 4.4rem;

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

        p {
            margin: 0 auto;
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
        margin-top: 10rem;
        display: flex;

        @media(max-width: ${breakpoints.md}) {
            flex-direction: column;
            margin-top: 5rem;
        }

        img {
            display: block;
            height: 26rem;
            transform: translateX(-18rem) translateY(-5rem);
        }

        div {
            width: 40%;
            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                img {
                    margin: 0 auto 5rem;
                    height: 18rem;
                    transform: none;
                }
            }
        }

        h2 {
            font-size: 2.6rem;
            width: 60%;
            @media(max-width: ${breakpoints.md}) {
                width: 100%;
                max-width: 60rem;
                font-size: 2rem;
                margin: 0 auto;
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

                <header className='header' role='header'>
                    <div className="row">
                        <Nav />
                        <div className="header__text-box">
                            <div className="header__logo-box">
                                <img className="header__logo" src={TheiaLogoDark} alt="theia logo" />
                            </div>
                            <h1 className="heading-primary">
                                Cloud and Desktop IDE
                            </h1>
                            <a className="btn" href="https://github.com/theia-ide/theia" target="_blank">View on GitHub</a>
                            <a className="btn" href="https://gitpod.io#https://github.com/theia-ide/theia" target="_blank">Try in Gitpod</a>
                        </div>
                        <div className="header__github-details">
                            <iframe className="header__github-button" src="https://ghbtns.com/github-btn.html?user=theia-ide&repo=theia&type=star&count=true" frameBorder={0} scrolling={0} />
                            <iframe className="header__github-button" src="https://ghbtns.com/github-btn.html?user=theia-ide&repo=theia&type=fork&count=true" frameBorder={0} scrolling={0} />
                        </div>
                    </div>

                    <Screenshot />

                    <div className="row">

                        {/* ***** Contributors ***** */}

                        <section className="contributors">
                            <h3 className="heading-tertiary">Contributors</h3>
                            <div className="contributors__images">
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://typefox.io">
                                        <img className="contributors__image" src={TypeFoxLogo} alt="Typefox Logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://www.redhat.com">
                                        <img className="contributors__image" src={RedHatLogo} alt="Redhat Logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://www.ibm.com">
                                        <img className="contributors__image contributors__image--ibm" src={IBMLogo} alt="IBM logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://google.com">
                                        <img className="contributors__image contributors__image--google" src={GoogleLogo} alt="Google logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://www.arm.com">
                                        <img className="contributors__image contributors__image--arm" src={ARMLogo} alt="ARM logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://www.ericsson.com">
                                        <img className="contributors__image contributors__image--ericsson" src={EricssonLogo} alt="Ericsson logo" />
                                    </a>
                                </div>
                                <div className="contributors__image-container">
                                    <a target="_blank" href="https://www.sap.com/">
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
                                    <h3 className="heading-tertiary">Cloud and Desktop</h3>
                                </div>
                                <p>
                                    Eclipse Theia is entirely written in TypeScript and clearly separates the
                                    UI frontend from the backend. The frontend runs in modern
                                    browsers or as a Fit
                                        <a href="http://typefox.io/theia-vs-code-in-the-cloud" target="_blank"> Desktop app using
                                        Electron</a> with either local or remote (cloud) backends.
                                    </p>
                            </div>
                            <div className="feature">
                                <div>
                                    <img src={IconExtension} alt="Icon Extension" />
                                    <h3 className="heading-tertiary">Extensible</h3>
                                </div>
                                <p>
                                    Theia applications consist of extensions.
                                        <a href="https://github.com/theia-ide/theia-apps" target="_blank"> Composing
                                        a custom IDE-like product</a> is as easy as listing all needed
                                extensions in a package.json file. Adding new
                                        functionality by implementing <Link to='/docs/authoring_extensions'>
                                        your own extensions</Link> or plug-ins is easy.
                                    </p>
                            </div>
                            <div className="feature">
                                <div>
                                    <img src={IconVSCode} alt="VS Code Logo" />
                                    <h3 className="heading-tertiary">Cloud and Desktop</h3>
                                </div>
                                <p>
                                    Theia provides the <a href="http://typefox.io/theia-vs-code-in-the-cloud" target="_blank"> VS Code experience in the browser</a>.
                                    Developers familiar with Microsoft's great editor will find many familiar features and concepts, to minimze the gap
                                    when switching between desktop and cloud environment.
                                    </p>
                            </div>
                        </div>
                    </section>

                    {/* ***** Section Banner ***** */}

                    <section className="row banner">
                        <div>
                            <img src={TheiaLogoEdited} alt="Theia Logo" />
                        </div>
                        <h2>Theia is an extensible open-source framework to develop multi-language IDEs for the cloud and desktop using state-of-the-art web technologies.</h2>
                    </section>

                    {/* ***** Section Promo ***** */}

                    <section className="promos">
                        <div className="row">
                            <div className="promo">
                                <div className="promo__text">
                                    <h3 className="heading-tertiary">Supports JavaScript, Java, Python and many more</h3>
                                    <p>Built on the <a href="https://microsoft.github.io/language-server-protocol/" target="_blank">Language Server Protocol</a>,
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
