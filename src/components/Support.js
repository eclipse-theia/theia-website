/********************************************************************************
 * Copyright (C) 2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import Nav from './Nav'
import React from 'react'
import { breakpoints } from '../utils/variables'
import styled from '@emotion/styled'
import EclipseSourceLogo from '../resources/eclipse-source.svg'
import TypeFoxLogo from '../resources/typefox.png'
import Background from '../resources/background-image.png'

const StyledSupport = styled.div`
.header {
    position: relative;
    background-image: url(${Background});
    background-size: cover;
    padding-bottom: 3rem;
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
    .btn {
        max-width: 20rem;
        @media(max-width: 385px) {
            &:not(:last-child) {
                margin-right: 0;
            }
        }
        @media(max-width: 800px) {
            &:not(:last-child) {
                margin-right: 2rem;
            }
        }
    }
    &__buttons {
        display:flex;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
        padding: 3rem 10vw;
        @media(max-width: 800px){
            padding: 3rem 0;
        }
        
    }
}
h1 {
    margin-bottom: 1rem;
    font-size: 3.4rem;
}
.support {
    padding: 3rem 0;
}

.support__container {
    display: flex;

    @media(max-width: ${breakpoints.md}) {
        flex-direction: column;
    }
}
.reverse {
    flex-direction: row-reverse;
    @media(max-width: ${breakpoints.md}) {
        flex-direction: column-reverse;
    }
}
.supporter {
    flex: 1;
    margin: 2rem 0;

    & > div {
        text-align: center;
    }

    h3 {
        margin-top: 2rem;
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

const supporters = [
    {
        img: EclipseSourceLogo,
        title: 'EclipseSource',
        link: 'https://eclipsesource.com',
        support: 'https://eclipsesource.com/technology/eclipse-theia/',
        training: 'https://eclipsesource.com/technology/eclipse-theia/#training'
    },
    {
        img: TypeFoxLogo,
        title: 'TypeFox',
        link: 'https://typefox.io',
        support: 'https://www.typefox.io/theia/',
        training: 'https://www.typefox.io/trainings/'
    }
]

const Support = () => (
    <StyledSupport>
        <header className='header' role="banner">
            <div className="row">
                <Nav shouldRenderLogo={true} />
                <div className="header__text-box">
                    <h1 className="heading-primary">
                    Professional Support
                    </h1>
                    <h2 style={{ fontSize: '2.2rem' }}>
                    The following contributing companies provide professional support and training for Eclipse Theia:
                    </h2>
                </div>
            </div>
        </header>
        <section className="support row" id="support">
            <div className={`support__container ${Math.random() < 0.5 && 'reverse'}`}>
                {
                    supporters.map(
                        ({title, link, img, training, support},i) => {
                            return(
                            <div key={`${i}_${title}`} className="supporter">
                                <div>
                                    <a href={link}><img src={img} alt={`${title} Logo`} /></a>
                                    <h3 className="heading-tertiary"><a href={support}>Support</a></h3>
                                    <h3 className="heading-tertiary"><a href={training}>Training</a></h3>
                                </div>
                            </div>)
                        }
                    )
                }
            </div>
        </section>
    </StyledSupport>
)

export default Support
