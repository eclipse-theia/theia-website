import React from 'react'

import Nav from '../components/Nav'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'
import ContributorsAndAdopters from '../components/ContributorsAndAdopters'
import DocImage from '../components/DocImage'
import Background from '../resources/background-image.png'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
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
                margin-right: 2.5rem;
            }

            @media(max-width: 385px) {
                &:not(:last-child) {
                    margin-right: 0;
                }
            }

            @media(max-width: 410px) {
                &:not(:last-child) {
                    margin-bottom: 2rem;
                }
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

        .heading-tertiary {
            padding-bottom: 40px;
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
            margin: 2rem 0 3rem;
        }

        & > p {
            margin: 0 auto;
            margin-bottom: 1rem;
            max-width: 45rem;
        }

        img {
            height: 7rem;
        }
    }

`


const Header = () => (
    <StyledHeader>
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
                    <h2 className="heading-tertiary" style={{ fontSize: '2.2rem' }}>
                        Eclipse Theia is an extensible platform to develop multi-language Cloud & Desktop IDEs with state-of-the-art web technologies.
                </h2>
                    <a className="btn" href="https://github.com/eclipse-theia/theia" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    <a className="btn btn--cta" href="https://gitpod.io/#https://github.com/eclipse-theia/theia" target="_blank" rel="noopener">Try in Gitpod &nbsp;&nbsp;&rarr;</a>
                </div>
                <div className="header__github-details">
                    <iframe title="Github Star Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=star&count=true" frameBorder={0} scrolling={0} />
                    <iframe title="Github Fork Count" className="header__github-button" src="https://ghbtns.com/github-btn.html?user=eclipse-theia&repo=theia&type=fork&count=true" frameBorder={0} scrolling={0} />
                </div>
            </div>

            <div className="row">
                <DocImage name="theia-screenshot.jpg" alt="Theia IDE Screenshot" shadow={true} />
            </div>

            <ContributorsAndAdopters />

        </header>
    </StyledHeader>
)

export default Header