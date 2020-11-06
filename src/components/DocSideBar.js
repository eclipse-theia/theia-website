/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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

import React from 'react'
import styled from '@emotion/styled'
import { breakpoints, colors } from '../utils/variables'
import { Link } from 'gatsby'
import Background from '../resources/background-image.png'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'
import { MENU } from '../docs/menu'

const Styled = styled.div`
    width: 30%;
    min-height: 100vh;
    min-width: 25rem;
    border-right: 10px solid #f8f8f8;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .container {
        position: relative;
        min-height: 100vh;
        min-width: 25rem;
        padding: 10rem 0;
        background-image: url(${Background}), linear-gradient(#fff, #fff);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    @media(max-width: ${breakpoints.xmd}) {
        display: none;
    }

    .logo {
        display: block;
        height: 2.8rem;
        margin: 0 auto 13rem auto;
    }

    .links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        list-style: none;
        min-width: 21rem;
        width: 50%;
        margin: 0 auto;
    }

    ul {
        list-style: none;
    }

    li {
        text-align: left;
        &:not(:last-of-type) {
            margin-bottom: .7rem;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
        transition: all .2s;

        &:hover,
        &:focus {
            color: ${colors.blue};
            padding: .2rem 0 .4rem;
            border-bottom: 1px dashed #9dc7d9;
        }
    }

    .caption {
        font-family: 'Anonymous Pro', sans-serif;
        font-weight: bold;
        text-transform: uppercase;

        &:not(:first-of-type) {
            margin-top: 3rem;
        }
    }

    .active {
        color: ${colors.blue};
        padding: .2rem 0 .4rem;
        border-bottom: 1px dashed #9dc7d9;
    }
`

const DocSideBar = () => {
    return (
        <Styled>
            <div className="container">
                <Link to='/'><img className="logo" src={TheiaLogoDark} alt="theia logo" /></Link>
                <ul className="links">
                    {
                        MENU.map((m,i) => (
                            <li 
                                key={`${m.title}+${i}`} 
                                className={m.path ? '' : 'caption'}
                                style={ m.indented ? { marginLeft: '3rem', marginTop: '1rem', listStyle: 'circle', listStylePosition: 'inside' } : {} }

                            >
                                {
                                    m.path ? <Link 
                                    to={m.path}
                                    activeClassName="active"
                                    >
                                    {m.title}
                                </Link> : m.title
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Styled>
    )
}

export default DocSideBar