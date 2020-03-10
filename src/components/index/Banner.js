import React from 'react'

import styled from '@emotion/styled'
import { breakpoints } from '../../utils/variables'
import TheiaLogoEdited from '../../resources/theia-logo-edited.svg'


const StyledBanner = styled.div`
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
`

const Banner = () => (
    <StyledBanner>
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
    </StyledBanner>
)

export default Banner